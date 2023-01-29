import { PrismaClient } from "@prisma/client";

import { DayHabit, Habit } from "../../../../domain/entities";
import { HabitRepository, HabitsByDateQueryData, RemoveDayHabitQueryData } from "../../../../domain/repositories";

export class PrismaHabitRepository implements HabitRepository  {
  constructor (private readonly prisma: PrismaClient) {}
  getHabitsSummary() {
    return this.prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
      (
        SELECT
          cast(count(*) as float)
        FROM day_habits DH
        WHERE DH.day_id = D.id
      ) AS completed,
      (
        SELECT
          cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H
          ON H.id = HWD.habit_id
        WHERE
          HWD.week_day = cast(strftime('%w', D.date / 1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
      ) as amount
      FROM days D
    `
  }

  async getHabitsADate({ date }: Omit<HabitsByDateQueryData, 'weekDay'>) {
    return this.prisma.day.findUnique({
      where: {
        date
      },
      include: {
        dayHabits: true
      }
    })
  }

  async getPossibleHabitsByDate({ date, weekDay }: HabitsByDateQueryData) {
    return this.prisma.habit.findMany({
      where: {
        createdAt: {
          lte: date
        },
        weekDays: {
          some: {
            weekDay
          }
        }
      }
    })
  }

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

  async createDayHabit({ day: { date }, habitId, id, dayId }: DayHabit) {
    await this.prisma.dayHabit.create({
      data: {
        id,
        habit: {
          connect: {
            id: habitId
          }
        },
        day: {
          connectOrCreate: {
            create: {
              date,
              id: dayId
            },
            where: {
              id: dayId
            }
          }
        }
      }
    })
  }

  async removeDayHabit ({ dayId, habitId }: RemoveDayHabitQueryData) {
    await this.prisma.dayHabit.delete({
      where: {
        dayId_habitId: {
          dayId,
          habitId
        }
      }
    })
  }
}