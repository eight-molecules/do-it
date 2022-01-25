import { Temporal } from "@js-temporal/polyfill";
import { getTodos } from "../../services/todo.service";
import { response } from "../../shared/response";

import { TodoFilters } from "../../types/todo";

const isZonedDateTime = (obj: any) => obj instanceof Temporal.ZonedDateTime;
const parseBoolean = (str: string) => {
  if (typeof str !== 'string') {
    return undefined;
  }

  const formattedString = str.toLowerCase();
  if (formattedString !== 'true' && formattedString !== 'false') {
    return undefined;
  }
  
  return Boolean(formattedString);
};

const extractQueryParameters = ({ 
  startDate, 
  endDate, 
  done, 
  minify }: {
    startDate?: string,
    endDate?: string,
    done: string,
    minify: string
  }): {
    filters?: Partial<TodoFilters>,
    minify?: boolean
  } => {
  const hasFilters = isZonedDateTime(startDate) && isZonedDateTime(endDate) && typeof done === 'string';  
  const filters = hasFilters ? { 
    startDate: Temporal.ZonedDateTime.from(startDate ?? Temporal.Now.zonedDateTimeISO().subtract({ months: 1 })), 
    endDate: Temporal.ZonedDateTime.from(endDate ?? Temporal.Now.zonedDateTimeISO().add({ months: 1 })), 
    done: parseBoolean(done),
  } as Partial<TodoFilters> : undefined;

  return { 
    filters,
    minify: parseBoolean(minify),
  };
}

const sideEffects = (...funcs: Function[]) => {
  for (const fn of funcs) {
    fn();
  }
}

export const handler = async (event: any, context: any) => {  
  context.callbackWaitsForEmptyEventLoop = true;
  
  try {
    sideEffects(
      () => console.log(event),
      async () => console.log('async')
    );

    const { filters, minify } = extractQueryParameters({ ...event.queryStringParameters });
    const todos = await getTodos(filters);
    
    return response(200, todos, { minify });
  } catch (e) {
    console.error(e);
    return response(500);
  }
}