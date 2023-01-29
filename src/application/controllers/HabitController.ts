import { CreateHabit, GetHabitOfTheDay, GetHabitSummaryDay, ToggleHabit } from "../../domain/use-cases";
import { IGenericRequest, IGenericResponse } from "../interfaces";

export class HabitController {
  constructor(
    private readonly createHabit: CreateHabit,
    private readonly getHabitOfTheDay: GetHabitOfTheDay,
    private readonly toggleHabit: ToggleHabit,
    private readonly getHabitSummaryDay: GetHabitSummaryDay
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
  
  async getHabitsSummary() {
    return this.getHabitSummaryDay.execute()
  }

  async toggleDayHabit (request: IGenericRequest) {
    const { id } = request.params
    return this.toggleHabit.execute({ id })
  }
}