import { DayHabit, Habit } from "../entities";

export interface HabitsByDateQueryData {
  date: Date; 
  weekDay: number;
}

export interface RemoveDayHabitQueryData {
  habitId: string; 
  dayId: string;
}

export abstract class HabitRepository {
  abstract create(habit: Habit): Promise<void>;
  abstract getPossibleHabitsByDate(queryData: HabitsByDateQueryData): any;
  abstract getHabitsADate(queryData: Omit<HabitsByDateQueryData, 'weekDay'>): any;
  abstract createDayHabit(dayHabit: DayHabit): Promise<void>;
  abstract removeDayHabit(queryData: RemoveDayHabitQueryData): Promise<void>;
}