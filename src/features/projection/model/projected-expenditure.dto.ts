import { Expenditure } from '@features/expenditures';

export type ProjectedExpenditureDto = Pick<
  Expenditure,
  'detail' | 'category' | 'monthlyPay' | 'monthlyFeePay' | 'monthlyDebtPay'
> & {
  paymentDate: Date;
};
