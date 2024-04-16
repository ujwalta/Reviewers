/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Extract the token from the request headers
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Missing authentication token' })
    }


    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string)
        // Attach the decoded token to the request object
        // @ts-ignore
        req.user = decodedToken

        next() // Proceed to the next middleware or route handler
    } catch (error) {
        return res
            .status(403)
            .json({ success: false, message: 'Invalid authentication token' })
    }
}

export function authenticateRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.cookies, 'testing heheh')
    // Extract the token from the request headers
    const token =
        req.cookies.refreshToken && req.cookies.refreshToken.split(' ')[1]

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Missing authentication token' })
    }


    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_KEY as string)
        // Attach the decoded token to the request object
        // @ts-ignore
        req.user = decodedToken

        next() // Proceed to the next middleware or route handler
    } catch (error) {
        return res
            .status(403)
            .json({ success: false, message: 'Invalid authentication token' })
    }
}


export function isAdmin(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { user }: { user: any } = req
    if (user && user.isAdmin) {
        next() // Proceed to the next middleware or route handler
    } else {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized: User is not an admin',
        })
    }
}