import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  // Use the built in logging infrastructure available
  // on the request object for extra logging magic
  // when testing your API
  context.log.info(`Hello from inside your Zup`);

  // Zuplo wants to make it easy to build great APIs
  // You can return an instance of Response or, if
  // you return another primitive, we'll do our best
  // to convert it to JSON for you
  return "What zup?";
}
