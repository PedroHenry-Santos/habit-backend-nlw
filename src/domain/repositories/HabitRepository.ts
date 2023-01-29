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
  abstract getPossibleHabitsByDate(queryData: HabitsByDateQueryData): Promise<any>;
  abstract getHabitsADate(queryData: Omit<HabitsByDateQueryData, 'weekDay'>): Promise<any>;
  abstract createDayHabit(dayHabit: DayHabit): Promise<void>;
  abstract removeDayHabit(queryData: RemoveDayHabitQueryData): Promise<void>;
  abstract getHabitsSummary (): Promise<any>
}