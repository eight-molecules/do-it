import { Temporal } from '@js-temporal/polyfill';

export interface TodoFilters {
  createdDateStart: Temporal.ZonedDateTime,
  createdDateEnd: Temporal.ZonedDateTime,
  lastModifiedDateStart: Temporal.ZonedDateTime, 
  lastModifiedDateEnd: Temporal.ZonedDateTime, 
  done: boolean 
}