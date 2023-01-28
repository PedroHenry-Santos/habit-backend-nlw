import { DateUtil } from "../../lib/helpers/date-util";
import { DayHabit } from "../entities";
import { HabitRepository } from "../repositories";

export interface IGetHabitOfTheDayRequest {
  date: Date,
}

interface IGetHabitOfTheDayResponse {
  possibleHabits: any;
  completedHabits: any
}

export class GetHabitOfTheDay {
  constructor (private readonly repository: HabitRepository) {}

  async execute(request: IGetHabitOfTheDayRequest): Promise<IGetHabitOfTheDayResponse> {
    const { date } = request

    const weekDay = DateUtil.getDayNumber(date)
    console.log({ date, weekDay })
    const possibleHabits =  await this.repository.getPossibleHabitsByDate({ date, weekDay })
    const day = await this.repository.getHabitsADate({ date })
    console.log(possibleHabits, day)
    const completedHabits = day?.dayHabits.map(({ habitId }: DayHabit) => ({ habitId })) ?? []

    return { possibleHabits, completedHabits }
  }
}