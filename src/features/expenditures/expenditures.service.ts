import { ExpendituresColumnName } from './enums';
import { Expenditure } from './model';
import { SheetService } from '@core/sheet';

export class ExpendituresService {
  constructor(private readonly sheetService: SheetService) {}

  getExpenditures(): Expenditure[] {
    const monthExpendituresSheet =
      this.sheetService.getMonthExpendituresSheet();

    const [headers, ...expenditures] = monthExpendituresSheet
      .getDataRange()
      .getValues();

    const headersPositions = this.sheetService.getHeadersPosition(
      headers,
      Object.values(ExpendituresColumnName),
    );

    return expenditures.map((expenditure) => ({
      detail: expenditure[headersPositions[ExpendituresColumnName.DETAIL]],
      category: expenditure[headersPositions[ExpendituresColumnName.CATEGORY]],
      monthlyPay:
        expenditure[headersPositions[ExpendituresColumnName.MONTHLY_PAY]],
      monthlyFeePay:
        expenditure[headersPositions[ExpendituresColumnName.MONTHLY_FEE_PAY]],
      monthlyDebtPay:
        expenditure[headersPositions[ExpendituresColumnName.MONTHLY_DEBT_PAY]],
      firstInstallmentDate: new Date(
        expenditure[
          headersPositions[ExpendituresColumnName.FIRST_INSTALLMENT_DATE]
        ],
      ),
      numberOfInstallments:
        expenditure[
          headersPositions[ExpendituresColumnName.NUMBER_OF_INSTALLMENTS]
        ],
    }));
  }
}
