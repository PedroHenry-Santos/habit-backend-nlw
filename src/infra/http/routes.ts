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
    habitController.create.bind(habitController))
  app.get(
    '/habits/day',
    { preHandler: validateSchemas.getHabitADayQuery },
    habitController.getHabitsOfTheDay.bind(habitController))
  app.get(
    '/habits/summary',
    habitController.getHabitsSummary.bind(habitController))
  app.patch(
    '/habits/:id/toggle',
    { preHandler: validateSchemas.toggleDayHabitParams },
    habitController.toggleDayHabit.bind(habitController))
}