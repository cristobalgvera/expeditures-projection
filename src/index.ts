import { EnvironmentService } from '@core/environment';
import { SheetService } from '@core/sheet';
import { ExpendituresService } from '@features/expenditures/expenditures.service';
import { ProjectionService } from '@features/projection/projection.service';

// @ts-ignore
function projectExpenditures(): void {
  const environmentService = new EnvironmentService();
  const sheetService = new SheetService(environmentService);

  const expendituresService = new ExpendituresService(sheetService);
  const projectionService = new ProjectionService(
    sheetService,
    expendituresService,
  );

  projectionService.projectExpenditures();
}

// @ts-ignore
function onOpen(): void {
  const ui = SpreadsheetApp.getUi();

  const installmentsMenu = ui
    .createMenu('Gastos en cuotas')
    .addItem('Proyectar gastos en cuotas', 'projectExpenditures');

  ui.createMenu('Proyección de gastos').addSubMenu(installmentsMenu).addToUi();
}
