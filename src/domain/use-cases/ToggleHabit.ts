import { DateUtil } from "../../lib/helpers/date-util";
import { Day, DayHabit, Habit } from "../entities";
import { HabitRepository } from "../repositories";

export interface IToggleHabitRequest {
  id: string,
}

export class ToggleHabit {
  constructor (private readonly repository: HabitRepository) {}

  async execute(request: IToggleHabitRequest): Promise<void> {
    const { id } = request
    const today = DateUtil.getClearDateTime()

    const day = await this.repository.getHabitsADate({ date: today })
    if (
      day &&
      day?.dayHabits?.length > 0 &&
      day?.dayHabits?.some(({ habitId }: DayHabit) => habitId === id)
    ) {
      const dayHabit = (day.dayHabits as DayHabit[]).filter(({ habitId }) => habitId === id)[0]
      console.log(dayHabit)
      return this.repository.removeDayHabit(dayHabit)
    }

    const dayHabit =  new DayHabit({
      day: new Day({ date: today }, day.id),
      habit: new Habit({ title: 'any' }, id)
    })
    
    return this.repository.createDayHabit(dayHabit)
  }
}