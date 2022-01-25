import { Temporal } from "@js-temporal/polyfill";
import { getTodos } from "../../services/todo.service";
import { response } from "../../shared/response";

import { TodoFilters } from "../../types/todo";

const isZonedDateTime = (obj: any) => obj instanceof Temporal.ZonedDateTime;

const extractQueryParameters = ({ startDate = Temporal.Now.zonedDateTimeISO(), endDate = Temporal.Now.zonedDateTimeISO(), done, minify }: any) => {
  const hasFilters = isZonedDateTime(startDate) && isZonedDateTime(endDate) && typeof done !== 'boolean';  
  const filters = hasFilters ? { 
    startDate: Temporal.ZonedDateTime.from(startDate), 
    endDate: Temporal.ZonedDateTime.from(endDate), 
    done: Boolean(done.toLowerCase() === 'true' || done.toLowerCase() === 'false'),
  } as TodoFilters : undefined;

  return { 
    filters,
    minify,
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