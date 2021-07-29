import "../../src/setup";
import "../jestNamespace";

import {init} from "../../src/app";
import supertest from "supertest";
import app from "../../src/app";
import { getConnection } from "typeorm";
import toMatchSchema from "../schemas/toMatchSchema";
import {degreesArr} from "../schemas/degrees";

beforeAll(async()=>{
  await init();
});
afterAll(async()=>{
  await getConnection().close();
});
expect.extend({ toMatchSchema });
const agent = supertest(app);

describe("GET /degrees", () => {
  it("should answer with text \"OK!\" and status 200", async () => {
    const response = await agent.get("/degrees");
    expect(response.status).toBe(200);
  });

  it("should answer an array of degrees", async () => {
    const response = await agent.get("/degrees");
    expect(response.body).toMatchSchema(degreesArr);
  });

});
