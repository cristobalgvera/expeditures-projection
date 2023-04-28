/*
 * This file should contain any environment variables
 * that are explicitly required, e.g. variable that
 * you can't set a default value for using nullish
 * operator (??).
 *
 * Example:
 * process.env.SOME_REQUIRED_ENV_VAR = 'some custom value'
 *
 * By doing this, we can produce an error when launching the service
 * if the variable is not set, and avoid that error when testing it.
 */

process.env.SPREADSHEET_ID = 'spreadsheet_id';
process.env.MONTH_EXPENDITURES_SHEET_NAME = 'sheet_name_1';
process.env.PROJECTION_EXPENDITURES_SHEET_NAME = 'sheet_name_2';
