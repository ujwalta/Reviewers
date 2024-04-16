/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from 'zod'

export const createReviewDtoBody = z.object({
  comment: z
    .string({
      required_error: 'comment is required',
    }),
  rating: z.enum(['1', '2', '3', '4', '5']),
})

export const createReviewDto = z.object({
  body: createReviewDtoBody
})


// isAdmin: z.boolean().optional().default(false)
// 