import * as dayjs from 'dayjs';

export interface TodoFilters { 
  startDate: dayjs.Dayjs, 
  endDate: dayjs.Dayjs, 
  status: boolean 
};