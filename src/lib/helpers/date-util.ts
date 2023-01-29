import dayjs from "dayjs";

export class DateUtil {
  static getClearDateTime(date?: Date) {
    return dayjs(date).startOf('day').toDate()
  }

  static getDayNumber(date: Date) {
    return dayjs(date).get('day')
  }
}