import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export type RequestArchivePolicyOptions = {
	blobContainerPath: string;
	blobCreateSas: string;
}

export default async function (request: ZuploRequest, context: ZuploContext, options: RequestArchivePolicyOptions) {
	// because we will read the body, we need to 
	// create a clone of this request first, otherwise
	// there may be two attempts to read the body
	// causing a runtime error
	const clone = request.clone();
	const body = await clone.text();

	// let's generate a unique blob name based on the date and requestId
	const blobName = `${Date.now()}-${context.requestId}.req.txt`;

	const url = `${options.blobContainerPath}/${blobName}?${options.blobCreateSas}`;

	const result = await fetch(url, {
		method: "PUT",
		body: body,
		headers: {
			"x-ms-blob-type": "BlockBlob",
		}
	});

	if (result.status > 201) {
		const err = {
			message: `Error archiving file`,
			status: result.status,
			body: await result.text()
		}
		context.log.error(err);
	}

	// continue
	return request;
}