import { Temporal } from '@js-temporal/polyfill';

import { handlerFactory, queryStringExtractorFactory } from '../../shared/handler';
import { parseBoolean, parseTemporal } from '../../shared/parse';
import { response } from '../../shared/response';

import { Filters } from '../../types/todo';

import { getTodos } from '../../services/todo.service';

const extractQueryStringParameters = queryStringExtractorFactory((queryStringParameters: {
  createdDate?: string,
  lastModifiedDate?: string,
  done?: string,
}): { filters?: Partial<Filters> } => {
  const { createdDate, lastModifiedDate, done } = queryStringParameters;

  const [ createdDateStartString, createdDateEndString ] = createdDate?.split(':') ?? [ undefined, undefined ];
  const [ lastModifiedDateStartString, lastModifiedDateEndString ] = lastModifiedDate?.split(':') ?? [ undefined, undefined ];

  const createdDateStart = parseTemporal(createdDateStartString);
  const createdDateEnd = parseTemporal(createdDateEndString);

  const lastModifiedDateStart = parseTemporal(lastModifiedDateStartString);
  const lastModifiedDateEnd = parseTemporal(lastModifiedDateEndString);

  const hasFilters = createdDateStart || createdDateEnd || lastModifiedDateStart || lastModifiedDateEnd || typeof done === 'string';  
  const filters = hasFilters ? { 
    createdDateStart,
    createdDateEnd,
    lastModifiedDateStart,
    lastModifiedDateEnd,
    done: parseBoolean(done),
  } as Partial<Filters> : {
    createdDateStart,
    createdDateEnd,
    lastModifiedDateStart: Temporal.Now.zonedDateTimeISO().subtract({ months: 1 }),
    lastModifiedDateEnd: Temporal.Now.zonedDateTimeISO(),
    done: parseBoolean(done)
  } as Partial<Filters>;

  return { filters };
});


interface GetTodosQueryParameters {
  minify: boolean, filters?: Partial<Filters> | Error
}

export const handler = handlerFactory(async (event: any) => { 
  const { filters, minify } = extractQueryStringParameters(event) as GetTodosQueryParameters;

  if (filters instanceof Error) {
    return response(400, undefined, { minify });
  }

  const todos = await getTodos(filters);
  
  return response(200, todos, { minify });
});