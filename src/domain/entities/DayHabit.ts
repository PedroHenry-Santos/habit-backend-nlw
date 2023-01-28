import { randomUUID } from 'node:crypto';

import { Replace } from '../../lib/helpers';
import { Day } from './Day';
import { Habit } from './Habit';

export interface IDayHabitProps {
  habit: Habit;
  day: Day;
}

export class DayHabit {
  private _id: string
  private props: IDayHabitProps

  constructor(props: Replace<IDayHabitProps, {}>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props;
  }

  public get id() {
    return this._id
  }

  public get dayId() {
    return this.props.day.id
  }

  public get habitId() {
    return this.props.habit.id
  }
}