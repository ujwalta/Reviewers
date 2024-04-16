/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import Boom from '@hapi/boom'
import prisma from '../libs/prisma'
import { z } from 'zod'
import { createRestaurantDtoBody } from '../validators/create-restaurant.validator'

export const createRestaurant = async (body: z.infer<typeof createRestaurantDtoBody>) => {
  const { address, description, name } = body


  let createdRestro: any;
  // ts-ignore
  await prisma.$transaction(async (tx) => {
    createdRestro = await tx.restaurant.create({
      data: {
        address,
        description,
        name,
      },
    })
    // API design pattern issues
    // await Promise.all(contactNumbers.map(contact => {
    //   return tx.contact.create({
    //     data: {
    //       restaurantId: createdRestro.id,
    //       number: contact
    //     }
    //   })
    // }))

  })
  return createdRestro;


}

export const getAll = async () => {
  return await prisma.restaurant.findMany({
    include: {
      contacts: true,
      reviews: true,
    }
  })
}

export const findrestaurantById = async (id: Number) => {
  try {
    return await prisma.restaurant.findUniqueOrThrow({
      where: { id: Number(id) },
    })
  } catch (err: any) {
    if (err.code === 'P2025') {
      throw Boom.notFound('restaurant not found')
    } else {
      throw err
    }
  }
}

export const updateRestaurantById = async (id: number, restaurant: any) => {
  const { address, description, name } = restaurant
  try {
    return await prisma.restaurant.update({
      where: { id: Number(id) },
      data: {
        address,
        description,
        name,
      },
    })
  } catch (err: any) {
    if (err.code === 'P2025') {
      throw Boom.notFound('restaurant not found')
    } else {
      throw err
    }
  }
}

export const deleteById = async (id: Number) => {
  try {
    return await prisma.restaurant.delete({
      where: {
        id: Number(id),
      },
    })
  } catch (err: any) {
    if (err.code === 'P2025') {
      throw Boom.notFound('restaurant not found')
    } else {
      throw err
    }
  }
}