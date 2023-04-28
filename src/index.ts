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
