import { HabitRepository } from "../repositories";

export class GetHabitSummaryDay {
  constructor (private readonly repository: HabitRepository) {}

  async execute(): Promise<any> {
    return this.repository.getHabitsSummary()
  }
}