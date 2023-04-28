import { Environment, EnvironmentService } from '@core/environment';
import { SheetService } from './sheet.service';
import { createMock } from '@golevelup/ts-jest';

describe('SheetService', () => {
  let underTest: SheetService;
  let environmentService: EnvironmentService;

  let spreadsheetAppMock: typeof SpreadsheetApp;
  let spreadsheetMock: ReturnType<(typeof spreadsheetAppMock)['openById']>;

  const originalService = global.SpreadsheetApp;

  beforeEach(() => {
    spreadsheetMock = createMock<typeof spreadsheetMock>();
    spreadsheetAppMock = createMock<typeof spreadsheetAppMock>({
      openById: () => spreadsheetMock,
    });

    global.SpreadsheetApp = spreadsheetAppMock;
  });

  beforeEach(() => {
    environmentService = createMock<EnvironmentService>();

    underTest = new SheetService(environmentService);
  });

  const environment = {
    MONTH_EXPENDITURES_SHEET_NAME: 'month_expenditures_sheet_name',
    SPREADSHEET_ID: 'spreadsheet_id',
    PROJECTION_EXPENDITURES_SHEET_NAME: 'projection_expenditures_sheet_name',
  } as Readonly<Environment>;

  beforeEach(() => {
    jest
      .spyOn(environmentService, 'get')
      .mockImplementation((key) => environment[key]);
  });

  afterEach(() => {
    global.SpreadsheetApp = originalService;

    jest.restoreAllMocks();
  });

  describe('when getting the spreadsheet', () => {
    it('should open the spreadsheet by id', () => {
      const spreadsheetAppSpy = jest.spyOn(spreadsheetAppMock, 'openById');

      expect(spreadsheetAppSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getMonthExpendituresSheet', () => {
    it('should get the sheet by name', () => {
      const expected = { foo: 'bar' };

      jest
        .spyOn(spreadsheetMock, 'getSheetByName')
        .mockReturnValueOnce(expected as any);

      const actual = underTest.getMonthExpendituresSheet();

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the sheet is not found', () => {
      jest.spyOn(spreadsheetMock, 'getSheetByName').mockReturnValueOnce(null);

      expect(() =>
        underTest.getMonthExpendituresSheet(),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sheet month_expenditures_sheet_name not found"`,
      );
    });
  });

  describe('getProjectionExpendituresSheet', () => {
    it('should get the sheet by name', () => {
      const expected = { foo: 'bar' };

      jest
        .spyOn(spreadsheetMock, 'getSheetByName')
        .mockReturnValueOnce(expected as any);

      const actual = underTest.getProjectionExpendituresSheet();

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the sheet is not found', () => {
      jest.spyOn(spreadsheetMock, 'getSheetByName').mockReturnValueOnce(null);

      expect(() =>
        underTest.getProjectionExpendituresSheet(),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Sheet projection_expenditures_sheet_name not found"`,
      );
    });
  });

  describe('getHeadersPosition', () => {
    describe('when all headers are found', () => {
      it('should return the headers positions', () => {
        const headers = ['foo', 'bar', 'baz', 'qux', 'quux'];

        const actual = underTest.getHeadersPosition(headers, [
          'foo',
          'baz',
          'qux',
        ]);

        expect(actual).toMatchInlineSnapshot(`
          {
            "baz": 2,
            "foo": 0,
            "qux": 3,
          }
        `);
      });
    });

    describe('when a header is not found', () => {
      it('should throw an error', () => {
        const headers = ['foo', 'bar', 'baz'];

        expect(() =>
          underTest.getHeadersPosition(headers, ['foo', 'qux']),
        ).toThrowErrorMatchingInlineSnapshot(`"Header qux not found"`);
      });
    });
  });
});
