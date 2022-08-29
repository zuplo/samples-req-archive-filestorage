import { expect } from "chai";
import { fetch } from "undici";

const apiUrl = process.env.API_URL

describe('Array',  () => {
  describe('#indexOf()', async () => {
    it('should return -1 when the value is not present', async () => {
      const response = await fetch(`${apiUrl}/hello-world`)
      const result = await response.text();
      expect(result).equal("What zup?")
    });
  });
});