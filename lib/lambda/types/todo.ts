import { Temporal } from '@js-temporal/polyfill';

export interface Filters {
  createdDateStart: Temporal.ZonedDateTime,
  createdDateEnd: Temporal.ZonedDateTime,
  lastModifiedDateStart: Temporal.ZonedDateTime, 
  lastModifiedDateEnd: Temporal.ZonedDateTime, 
  done: boolean 
}

