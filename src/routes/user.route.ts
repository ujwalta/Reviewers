/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Router } from 'express'
import { validate } from '../utils/validate'
import { createUserDto } from '../validators/create-user.validators'
import * as UserController from '../controllers/user.controller'
import { authenticateRefreshToken } from '../middlewares/authentication.middleware'
const router = Router()

router.get('/', UserController.find)

router.post('/login', UserController.login)
router.post('/refresh', authenticateRefreshToken, UserController.refresh)


router.post(`/signup`, validate(createUserDto), UserController.signup)

// $prisma.transaction
// prisma.restro.create
// prisma.contacts.create
// transaction end 1
export default router