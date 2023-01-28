import { Habit } from "../entities";
import { HabitRepository } from "../repositories";

interface ICreateHabitRequest {
  title: string;
  weekDays: number[]
}

interface ICreateHabitResponse {
  habit: Habit;
}

export class CreateHabit {
  constructor (private readonly repository: HabitRepository) {}

  async execute(request: ICreateHabitRequest): Promise<ICreateHabitResponse> {
    const { title, weekDays } = request

    const habit = new Habit({ title })
    habit.addWeekDays(weekDays)

    await this.repository.create(habit)

    return { habit }
  }
}