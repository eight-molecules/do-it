import { Temporal } from '@js-temporal/polyfill';

import { handlerFactory, queryStringExtractorFactory } from '../../shared/handler';
import { parseBoolean, parseTemporal } from '../../shared/parse';
import { response } from '../../shared/response';

import { TodoFilters } from '../../types/todo';

import { getTodos } from '../../services/todo.service';

const extractQueryStringParameters = queryStringExtractorFactory((queryStringParameters: {
  startDate?: string,
  endDate?: string,
  done?: string,
}): { filters?: Partial<TodoFilters> } => {
  const { startDate, endDate, done } = queryStringParameters;

  const startDateTime = parseTemporal(startDate) ?? Temporal.Now.zonedDateTimeISO().subtract({ months: 1 });
  const endDateTime = parseTemporal(endDate) ?? Temporal.Now.zonedDateTimeISO().add({ months: 1 });

  const hasFilters = startDateTime || endDateTime || typeof done === 'string';  
  const filters = hasFilters ? { 
    startDate: startDateTime , 
    endDate: endDateTime, 
    done: parseBoolean(done),
  } as Partial<TodoFilters> : undefined;

  return { filters };
});


interface GetTodosQueryParameters {
  minify: boolean, filters?: Partial<TodoFilters>
}

export const handler = handlerFactory(async (event: any) => { 
  const { filters, minify } = extractQueryStringParameters(event) as GetTodosQueryParameters;
  const todos = await getTodos(filters);
  
  return response(200, todos, { minify });
});