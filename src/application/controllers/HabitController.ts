import { CreateHabit, GetHabitOfTheDay } from "../../domain/use-cases";
import { IGenericRequest, IGenericResponse } from "../interfaces";

export class HabitController {
  constructor(
    private readonly createHabit: CreateHabit,
    private readonly getHabitOfTheDay: GetHabitOfTheDay
  ) {}

  async create(request: IGenericRequest, response: IGenericResponse) {
    const { title, weekDays } = request.body
    await this.createHabit.execute({ title, weekDays })
    response.status(201)
  }

  async getHabitsOfTheDay (request: IGenericRequest) {
    const { date } = request.query
    return this.getHabitOfTheDay.execute({ date })
  }
}