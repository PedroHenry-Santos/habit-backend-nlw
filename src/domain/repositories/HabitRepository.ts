import { Habit } from "../entities";

export interface HabitsByDateQueryData {
  date: Date; 
  weekDay: number;
}

export abstract class HabitRepository {
  abstract create(habit: Habit): Promise<void>;
  abstract getPossibleHabitsByDate(queryData: HabitsByDateQueryData): any;
  abstract getHabitsADate(queryData: Omit<HabitsByDateQueryData, 'weekDay'>): any;
}