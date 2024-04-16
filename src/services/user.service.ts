/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import prisma from '../libs/prisma'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// user: any
export async function login(body: any) {
    const { email, password } = body
    const user = await prisma.user.findFirstOrThrow({ where: { email } })

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        // Password does not match
        // If you want to throw a http error, you can. This is throw internal server error
        throw Error('Password not correct')
    }

    // Generate a token
    const accessToken = jwt.sign(
        { userId: user.id, isAdmin: user.isadmin },
        process.env.ACCESS_TOKEN_KEY as string,
        {
            expiresIn: '1d',
        }
    )

    const refreshToken = jwt.sign(
        { userId: user.id, isAdmin: user.isadmin },
        process.env.REFRESH_TOKEN_KEY as string,
        {
            expiresIn: '7d',
        }
    )


    // Return the accessToken to the client
    return { success: true, accessToken, refreshToken }
}


export async function refresh(userId: number) {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } })


    // Generate a token
    const accessToken = jwt.sign(
        { userId: user.id, isAdmin: user.isadmin },
        process.env.ACCESS_TOKEN_KEY as string,
        {
            expiresIn: '5m',
        }
    )


    // Return the accessToken to the client
    return { success: true, accessToken }
}
// Refresh token - long lived token
// Access token - short lived token expires in 5 minutes