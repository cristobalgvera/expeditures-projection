export class DateUtils {
  static addMonths(date: Date | string, months: number) {
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth() + months);

    return dateCopy;
  }
}
