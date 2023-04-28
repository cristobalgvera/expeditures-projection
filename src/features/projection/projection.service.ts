import { DateUtils } from '@core/utils';
import { ExpendituresService } from '@features/expenditures';
import { ProjectedExpenditureDto } from './model';
import { SheetService } from '@core/sheet';
import { ProjectedExpendituresColumnName } from './enums';

export class ProjectionService {
  constructor(
    private readonly sheetService: SheetService,
    private readonly expendituresService: ExpendituresService,
  ) {}

  projectExpenditures() {
    const projectionExpendituresSheet =
      this.sheetService.getProjectionExpendituresSheet();

    const projectedExpenditures = this.expendituresService
      .getExpenditures()
      .flatMap((expenditure) =>
        Array(expenditure.numberOfInstallments)
          .fill(undefined)
          .map<ProjectedExpenditureDto>((_, installment) => ({
            ...expenditure,
            paymentDate: DateUtils.addMonths(
              expenditure.firstInstallmentDate,
              installment,
            ),
          })),
      );

    const [headers] = projectionExpendituresSheet
      .getRange(1, 1, 1, projectionExpendituresSheet.getLastColumn())
      .getValues();

    const headersPositions = this.sheetService.getHeadersPosition(
      headers,
      Object.values(ProjectedExpendituresColumnName),
    );

    projectionExpendituresSheet.clearContents();

    const projectedExpendituresRows = [[...headers]].concat(
      projectedExpenditures.map((expenditure) => {
        const projectedExpenditureRow = Array(headers.length).fill(undefined);

        projectedExpenditureRow[
          headersPositions[ProjectedExpendituresColumnName.DETAIL]
        ] = expenditure.detail;

        projectedExpenditureRow[
          headersPositions[ProjectedExpendituresColumnName.CATEGORY]
        ] = expenditure.category;

        projectedExpenditureRow[
          headersPositions[ProjectedExpendituresColumnName.MONTHLY_PAY]
        ] = expenditure.monthlyPay;

        projectedExpenditureRow[
          headersPositions[ProjectedExpendituresColumnName.MONTHLY_FEE_PAY]
        ] = expenditure.monthlyFeePay;

        projectedExpenditureRow[
          headersPositions[ProjectedExpendituresColumnName.MONTHLY_DEBT_PAY]
        ] = expenditure.monthlyDebtPay;

        projectedExpenditureRow[
          headersPositions[ProjectedExpendituresColumnName.PAYMENT_DATE]
        ] = expenditure.paymentDate;

        return projectedExpenditureRow;
      }),
    );

    projectionExpendituresSheet
      .getRange(1, 1, projectedExpendituresRows.length, headers.length)
      .setValues(projectedExpendituresRows);

    return projectedExpenditures;
  }
}
