import { Router } from 'express'

import * as reviewsController from '../controllers/reviews.controller'
import { validate } from '../utils/validate'
import { createRestaurantDto } from '../validators/create-restaurant.validator'
import { authenticateToken, isAdmin } from '../middlewares/authentication.middleware'
import { createReviewDto } from '../validators/create-review.validators'

const router = Router({ mergeParams: true })

// router.get('/', authenticateToken, reviewsController.findAll)
router.post(`/`, validate(createReviewDto), authenticateToken, reviewsController.create)

// router.delete(`/:id`, authenticateToken, isAdmin, reviewsController.deleteById)
// router.patch(`/:id`, authenticateToken, isAdmin, reviewsController.updateByID)

// router.get(`/:id`, authenticateToken, isAdmin, reviewsController.findByID)

export default router