import { Temporal } from '@js-temporal/polyfill';

export interface TodoFilters { 
  startDate: Temporal.ZonedDateTime, 
  endDate: Temporal.ZonedDateTime, 
  done: boolean 
}