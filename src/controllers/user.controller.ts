import { NextFunction, Request, Response } from 'express'
import prisma from '../libs/prisma'
import bcrypt from 'bcrypt'

import * as UserService from '../services/user.service'
import Boom from '@hapi/boom'
export const find = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.userId
    const { accessToken } = await UserService.refresh(userId)

    res.json(accessToken)
  } catch (error) {
    next(error)
  }
}



export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = await UserService.login(req.body)
    res.cookie('refreshToken', `Bearer ${refreshToken}`,
      { httpOnly: true });

    res.json(accessToken)
  } catch (error) {
    next(error)
  }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, address, isAdmin } = req.body
  let result;
  try {
    result = await prisma.user.create({
      data: {
        name,
        email,
        isadmin: isAdmin,
        password: await bcrypt.hash(password as string, 10),
      },
    })
  } catch (err: any) {
    if (err.code === 'P2002') {
      next(Boom.conflict('email has to be unique'))
      return;
    }
  }
  res.json(result)
}


// CRUD /profile/todos
// CRUD /todos