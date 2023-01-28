import { PrismaClient } from "@prisma/client";

import { Habit } from "../../../../domain/entities";
import { HabitRepository } from "../../../../domain/repositories";

export class PrismaHabitRepository implements HabitRepository  {
  constructor (private readonly prisma: PrismaClient) {}

  async create({ id, title, createdAt, weekDays}: Habit): Promise<void> {
    await this.prisma.habit.create({
      data: {
        id,
        title,
        createdAt,
        weekDays: {
          create: weekDays.map(({ id, weekDay }) => ({
            id,
            weekDay
          }))
        }
      }
    })
  }
}