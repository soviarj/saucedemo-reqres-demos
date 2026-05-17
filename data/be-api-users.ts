export const existingApiTestUsers = {
    id1: {
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg'
    },
    id2: {
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg'
    },
} as const;

export const createApiTestUser = {
    user1: {
            name: 'morpheus',
            job: 'leader'
            }
} as const; 