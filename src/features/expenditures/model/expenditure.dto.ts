export type Expenditure = {
  detail: string;
  category: string;
  monthlyPay: number;
  monthlyDebtPay: number;
  monthlyFeePay: number;
  numberOfInstallments: number;
  firstInstallmentDate: Date;
};
