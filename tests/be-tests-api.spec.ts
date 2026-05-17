import { existingApiTestUsers } from "../data/be-api-users";
import { responseTime } from "../data/response-data";
import { expect, test } from "../helpers/fixtures";

test.describe('API Tests for Reqres.in @apiTests @allTests', () => {
    test('GET- List Users @getUsers', async ({ apiClient, variables }) => {
        await test.step('Send GET request to list users endpoint', async () => {
            variables.response = await apiClient.getUsers();
            variables.responseBody = await variables.response.json();
        });

        await test.step('Verify response status', async () => {
            expect.soft(variables.response.status()).toBe(200);
        });

        await test.step('Assert received data in Response', async () => {
            expect.soft(variables.responseBody.total).toBe(12);
            expect.soft(variables.responseBody.data[0].last_name).toBe(existingApiTestUsers.id1.last_name);
            expect.soft(variables.responseBody.data[1].last_name).toBe(existingApiTestUsers.id2.last_name);
        });

        await test.step('Verify count users in data with total', async () => {
            expect.soft(variables.responseBody.data.length).not.toBe(variables.responseBody.total);
        });

        await test.step('Assert data types present in response', async () => {
            await apiClient.assertDataTypes(variables.responseBody);
        });
    });

    test('POST- Create User @createUser', async ({ apiClient, variables }) => {
        const start = Date.now();

        await test.step('Send POST request to create user endpoint', async () => {
            variables.response = await apiClient.createUser();
            variables.responseBody = await variables.response.json();
        });

        const end = Date.now();

        await test.step('Verify response status', async () => {
            expect.soft(variables.response.status()).toBe(201);
            console.log(variables.responseBody.data);
        });

        await test.step('Verify ID and timestamp of createdAt', async () => {
            expect.soft(variables.responseBody.id).toBeDefined();
            expect.soft(typeof variables.responseBody.id).toBe('string');

            expect.soft(variables.responseBody.createdAt).toBeDefined();
            expect.soft(typeof variables.responseBody.createdAt).toBe('string');
        });

        await test.step('Assert response time', async () => {
            expect.soft(end - start).toBeLessThan(parseInt(responseTime));
        });

        await test.step('Assert response schema', async () => {
            await apiClient.assertResponseSchema(variables.responseBody);
        });
    });
});