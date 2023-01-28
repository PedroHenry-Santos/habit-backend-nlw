import { CreateHabit } from "../../domain/use-cases";
import { IGenericRequest, IGenericResponse } from "../interfaces";

export class HabitController {
  constructor(
    private readonly createHabit: CreateHabit
  ) {}

  async create(request: IGenericRequest, response: IGenericResponse) {
    const { title, weekDays } = request.body
    await this.createHabit.execute({ title, weekDays })
    response.status(201)
  }
}