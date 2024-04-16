/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod'

export const createUserDtoBody = z.object({
    name: z.string({
        required_error: 'name is required',
    }),
    email: z
        .string({
            required_error: 'email is required',
        })
        .email('It is an email'),
    password: z.string({
        required_error: 'password is required',
    }),
    address: z.string({
        required_error: 'address is required',
    }),
    isAdmin: z.boolean().optional().default(false)
})

export const createUserDto = z.object({
    body: createUserDtoBody
})


// isAdmin: z.boolean().optional().default(false)
// 