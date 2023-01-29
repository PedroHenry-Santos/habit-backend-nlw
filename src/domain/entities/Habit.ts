import { randomUUID } from 'node:crypto';

import { Replace } from '../../lib/helpers';
import { DateUtil } from '../../lib/helpers/date-util';
import { DayHabit } from './DayHabit';
import { HabitWeekDay } from './HabitWeekDays';

export interface IHabitProps {
  title: string;
  createdAt: Date;
  dayHabits: DayHabit[];
  weekDays: HabitWeekDay[]
}

export class Habit {
  private _id: string
  private props: IHabitProps

  constructor(
      props: Replace<IHabitProps, { 
        dayHabits?: DayHabit[],
        weekDays?: HabitWeekDay[],
        createdAt?: Date 
      }>,
      id?: string
    ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      dayHabits: [],
      weekDays: [],
      createdAt: props.createdAt ?? DateUtil.getClearDateTime(),
    };
  }

  public get id() {
    return this._id
  }

  public get title() {
    return this.props.title
  }

  public get dayHabits() {
    return this.props.dayHabits
  }

  public get weekDays() {
    return this.props.weekDays
  }

  public get createdAt() {
    return this.props.createdAt
  }

  addWeekDays (weekDays: number[]) {
    for (const weekDay of weekDays) {
      const newWeekDay = new HabitWeekDay({
        habit: this,
        weekDay
      })
      this.props.weekDays.push(newWeekDay)
    }
  }
}