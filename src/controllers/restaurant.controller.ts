/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { NextFunction, Request, Response } from 'express'
import * as todoService from '../services/restaurant.service'
import HttpStatus from 'http-status-codes'

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await todoService.createRestaurant(req.body)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const findByID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await todoService.findrestaurantById(Number(req.params.id))
        res.json(data)
    } catch (err) {
        next(err)
    }
}

export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await todoService.getAll()
        res.json(data)
    } catch (err) {
        next(err)
    }
}
export const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const loggedInUserId = (req as any).user.userId;

        const post = await todoService.updateRestaurantById(Number(id), req.body)

        res.status(HttpStatus.CREATED).json(post)
    } catch (e) {
        next(e)
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        // @TODO: Handle errors
        const post = await todoService.deleteById(Number(id))
        res.status(HttpStatus.NO_CONTENT).json(post)

    } catch (e) {
        next(e)
    }
}