import { DateUtils } from './date.util';

describe('DateUtils', () => {
  describe('addMonths', () => {
    it.each([
      { date: '2021-01-01', months: 1, expected: '2021-02-01' },
      { date: '2021-01-01', months: 3, expected: '2021-04-01' },
      { date: '2021-01-01', months: 0, expected: '2021-01-01' },
      { date: '2021-01-01', months: -2, expected: '2020-11-01' },
      { date: new Date('2021-01-01'), months: 1, expected: '2021-02-01' },
      { date: new Date('2021-01-01'), months: 3, expected: '2021-04-01' },
      { date: new Date('2021-01-01'), months: 0, expected: '2021-01-01' },
      { date: new Date('2021-01-01'), months: -2, expected: '2020-11-01' },
    ])(
      'should add $months months to $date resulting in $expected',
      ({ date, months, expected }) => {
        const result = DateUtils.addMonths(date, months);

        expect(result).toEqual(new Date(expected));
      },
    );
  });
});
