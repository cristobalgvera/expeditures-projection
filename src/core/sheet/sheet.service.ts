import { EnvironmentService } from '@core/environment';

export class SheetService {
  private readonly expendituresSpreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(private readonly environmentService: EnvironmentService) {
    this.expendituresSpreadsheet = SpreadsheetApp.openById(
      this.environmentService.get('SPREADSHEET_ID'),
    );
  }

  getMonthExpendituresSheet() {
    return this.getSheetByName(
      this.environmentService.get('MONTH_EXPENDITURES_SHEET_NAME'),
    );
  }

  getProjectionExpendituresSheet() {
    return this.getSheetByName(
      this.environmentService.get('PROJECTION_EXPENDITURES_SHEET_NAME'),
    );
  }

  private getSheetByName(name: string) {
    const sheet = this.expendituresSpreadsheet.getSheetByName(name);

    if (!sheet) throw new Error(`Sheet ${name} not found`);

    return sheet;
  }

  getHeadersPosition<const T extends string>(
    headers: unknown[],
    requiredHeaders: T[],
  ) {
    return requiredHeaders.reduce((positions, requiredHeader) => {
      const headerPosition = headers.indexOf(requiredHeader);

      if (headerPosition === -1)
        throw new Error(`Header ${requiredHeader} not found`);

      return { ...positions, [requiredHeader]: headerPosition };
    }, {} as Record<T, number>);
  }
}
