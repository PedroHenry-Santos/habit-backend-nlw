import { FastifyInstance, FastifyRequest } from "fastify"

import { CreateHabit } from "../../domain/use-cases"
import { ValidationSchemas } from "./validations"
import { prisma, PrismaHabitRepository } from "../database/prisma"
import { HabitController } from "../../application/controllers"

export async function appRoutes(app: FastifyInstance) {
  const repository = new PrismaHabitRepository(prisma)
  const createHabit = new CreateHabit(repository)
  const habitController = new HabitController(createHabit)
  const validateSchemas = new ValidationSchemas()

  app.post(
    '/habits',
    { preHandler: validateSchemas.createHabitBody },
    (req, reply) => habitController.create(req, reply))
}