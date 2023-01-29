import { FastifyInstance } from "fastify"

import { CreateHabit, GetHabitOfTheDay, GetHabitSummaryDay, ToggleHabit } from "../../domain/use-cases"
import { ValidationSchemas } from "./validations"
import { prisma, PrismaHabitRepository } from "../database/prisma"
import { HabitController } from "../../application/controllers"

export async function appRoutes(app: FastifyInstance) {
  const repository = new PrismaHabitRepository(prisma)
  const createHabit = new CreateHabit(repository)
  const getHabitOfTheDay = new GetHabitOfTheDay(repository)
  const toggleHabit = new ToggleHabit(repository)
  const getHabitSummaryDay = new GetHabitSummaryDay(repository)
  const habitController = new HabitController(
    createHabit,
    getHabitOfTheDay,
    toggleHabit,
    getHabitSummaryDay
  )
  const validateSchemas = new ValidationSchemas()

  app.post(
    '/habits',
    { preHandler: validateSchemas.createHabitBody },
    (req, reply) => habitController.create(req, reply))
  app.get(
    '/habits/day',
    { preHandler: validateSchemas.getHabitADayQuery },
    (req) => habitController.getHabitsOfTheDay(req))
  app.get(
    '/habits/summary',
    () => habitController.getHabitsSummary())
  app.patch(
    '/habits/:id/toggle',
    { preHandler: validateSchemas.toggleDayHabitParams },
    (req) => habitController.toggleDayHabit(req))
}