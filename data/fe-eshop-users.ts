export const users = {
    standard: {
        username: 'standard_user',
        password: process.env.PASSWORD,
        firstName: 'John',
        lastName: 'Standard',
        zipCode: '12345',
    },
    lockedOut: {
        username: 'locked_out_user',
        password: process.env.PASSWORD,
        firstName: 'Ben',
        lastName: 'Locked',
        zipCode: '12345',
    },
    problem: {
        username: 'problem_user',
        password: process.env.PASSWORD,
        firstName: 'Alice', 
        lastName: 'Problem',
        zipCode: '12345',
    },
    performance: {
        username: 'performance_glitch_user',
        password: process.env.PASSWORD,
        firstName: 'Eve',
        lastName: 'Performance',
        zipCode: '12345',
    },
    error: {
        username: 'error_user',
        password: process.env.PASSWORD,
        firstName: 'Charlie',
        lastName: 'Error',
        zipCode: '12345',
    },
    visual: {
        username: 'visual_user',
        password: process.env.PASSWORD,
        firstName: 'Dave',
        lastName: 'Visual',
        zipCode: '12345',
    },
} as const;