import { Environment } from './environment.type';

/**
 * Environment variables usage approach
 *
 * ---
 *
 * You can use an EnvironmentService in order to
 * avoid repeat the `process.env` pattern.
 *
 * You are free to implement this in any way you
 * want, but this is a good starting point.
 *
 * I recommend you to make extensive usage of
 * generics when implementing a single environment
 * variable getter method. Like so:
 *
 * ```typescript
 * get<Key extends keyof Environment>(key: Key): Environment[Key] {
 *   // Implementation...
 * }
 * ```
 */
export class EnvironmentService {
  get<Key extends keyof Environment>(key: Key): Environment[Key] {
    const environment: Environment = {
      SPREADSHEET_ID: String(process.env.SPREADSHEET_ID),
      MONTH_EXPENDITURES_SHEET_NAME: String(
        process.env.MONTH_EXPENDITURES_SHEET_NAME,
      ),
      PROJECTION_EXPENDITURES_SHEET_NAME: String(
        process.env.PROJECTION_EXPENDITURES_SHEET_NAME,
      ),
    };

    return environment[key];
  }
}
