import { Temporal } from '@js-temporal/polyfill';

export interface TodoFilters { 
  startDate: Temporal.Instant, 
  endDate: Temporal.Instant, 
  done: boolean 
};