import { randomUUID } from 'node:crypto';

import { Replace } from '../../lib/helpers/replace';
import { Habit } from './Habit';

export interface IHabitWeekDayProps {
  habit: Habit;
  weekDay: number;
}

export class HabitWeekDay {
  private _id: string
  private props: IHabitWeekDayProps

  constructor(props:  Replace<IHabitWeekDayProps, {}>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props;
  }

  public get id() {
    return this._id
  }

  public get habitId() {
    return this.props.habit.id
  }

  public get weekDay() {
    return this.props.weekDay
  }
}