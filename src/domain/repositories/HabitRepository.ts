import { Habit } from "../entities";

export abstract class HabitRepository {
  abstract create(habit: Habit): Promise<void>;
}