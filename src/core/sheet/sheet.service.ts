import { EnvironmentService } from '@core/environment';

export class SheetService {
  private readonly expendituresSpreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(private readonly environmentService: EnvironmentService) {
    this.expendituresSpreadsheet = SpreadsheetApp.openById(
      environmentService.get('SPREADSHEET_ID'),
    );
  }

  getMonthExpendituresSheet() {
    const sheet = this.expendituresSpreadsheet.getSheetByName(
      this.environmentService.get('MONTH_EXPENDITURES_SHEET_NAME'),
    );

    if (!sheet)
      throw new Error(
        `Sheet ${this.environmentService.get(
          'MONTH_EXPENDITURES_SHEET_NAME',
        )} not found`,
      );

    return sheet;
  }

  getProjectionExpendituresSheet() {
    const sheet = this.expendituresSpreadsheet.getSheetByName(
      this.environmentService.get('PROJECTION_EXPENDITURES_SHEET_NAME'),
    );

    if (!sheet)
      throw new Error(
        `Sheet ${this.environmentService.get(
          'PROJECTION_EXPENDITURES_SHEET_NAME',
        )} not found`,
      );

    return sheet;
  }

  getHeadersPosition<T extends string>(
    headers: unknown[],
    requiredHeaders: T[],
  ) {
    return requiredHeaders.reduce((positions, requiredHeader) => {
      const headerPosition = headers.indexOf(requiredHeader);

      if (headerPosition === -1)
        throw new Error(`Header ${requiredHeader} not found`);

      return {
        ...positions,
        [requiredHeader]: headerPosition,
      };
    }, {} as Record<T, number>);
  }
}
