import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";

beforeEach(() => {
	jest.resetModules();
});

describe("Test the version path", () => {
	test("It should return a 200 response", async () => {
		const response = await request(app).get("/status");
		expect(response.statusCode).toBe(200);
	});
});

describe("Test default security headers", () => {
	test("It should remove the X-Powered-By header", async () => {
		const response = await request(app).get("/status");
		const {headers} = response;
		expect(headers["x-powered-by"]).toBeUndefined();
	});
	test("It should set the X-Content-Type-Options to nosniff", async () => {
		const response = await request(app).get("/status");
		const {headers} = response;
		expect(headers["x-content-type-options"]).toBe("nosniff");
	});
});
