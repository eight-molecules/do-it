import { Temporal } from "@js-temporal/polyfill";
import { getTodos } from "../../services/todo.service";
import { handlerFactory } from "../../shared/handler";
import { response } from "../../shared/response";

import { TodoFilters } from "../../types/todo";

const parseDate = (obj: any) => {
  try { 
    return Temporal.ZonedDateTime.from(obj);
  } catch (error) {
    return undefined;
  }
};

const parseBoolean = (str: string) => {
  if (typeof str !== 'string') {
    return undefined;
  }

  const formattedString = str.toLowerCase();
  if (formattedString !== 'true' && formattedString !== 'false') {
    return undefined;
  }
  
  return formattedString === 'true';
};

const extractQueryStringParameters = (queryStringParameters: {
    startDate?: string,
    endDate?: string,
    done: string,
    minify: string
  }): {
    filters?: Partial<TodoFilters>,
    minify?: boolean
  } => {
  const { startDate, endDate, done, minify } = queryStringParameters;

  const startDateTime = parseDate(startDate) ?? Temporal.Now.zonedDateTimeISO().subtract({ months: 1 });
  const endDateTime = parseDate(endDate) ?? Temporal.Now.zonedDateTimeISO().add({ months: 1 });

  const hasFilters = startDateTime || endDateTime || typeof done === 'string';  
  const filters = hasFilters ? { 
    startDate: startDateTime , 
    endDate: endDateTime, 
    done: parseBoolean(done),
  } as Partial<TodoFilters> : undefined;

  return { 
    filters,
    minify: parseBoolean(minify),
  };
}

export const handler = handlerFactory(async (event: any) => { 
  const { filters, minify } = extractQueryStringParameters({ ...event.queryStringParameters });
  const todos = await getTodos(filters);
  
  return response(200, todos, { minify });
});