import { APIRequestContext, expect } from "@playwright/test";
import { apiKey, usersEndpoint,  } from "./constants";
import { createApiTestUser } from "../data/be-api-users";

export class ApiClients {

    constructor(private request: APIRequestContext) {}
    
    async getUsers() {
        return this.request.get(usersEndpoint, {
            headers: {
                'x-api-key': apiKey
            }
        });
    }

    async createUser() {
        return this.request.post('https://reqres.in/api/users', {
            headers: {
                'x-api-key': apiKey
            },
            data: createApiTestUser.user1
        });
    }

    async assertResponseSchema(responseBody: any) {
        expect.soft(responseBody).toHaveProperty('name');
        expect.soft(responseBody).toHaveProperty('job');
        expect.soft(responseBody).toHaveProperty('id');
        expect.soft(responseBody).toHaveProperty('createdAt');

        expect.soft(typeof responseBody.name).toBe('string');
        expect.soft(typeof responseBody.job).toBe('string');
        expect.soft(typeof responseBody.id).toBe('string');
        expect.soft(typeof responseBody.createdAt).toBe('string');
    }

    async assertDataTypes(responseBody: any) {
        responseBody.data.forEach((user: any) => {
            expect.soft(typeof user.id).toBe('number');
            expect.soft(typeof user.email).toBe('string');
            expect.soft(typeof user.first_name).toBe('string');
            expect.soft(typeof user.last_name).toBe('string');                   
            expect.soft(typeof user.avatar).toBe('string');}
        );

        expect.soft(typeof responseBody.support.url).toBe('string');
        expect.soft(typeof responseBody.support.text).toBe('string');
    }
}