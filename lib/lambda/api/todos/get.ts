import { Temporal } from "@js-temporal/polyfill";
import { getTodos } from "../../services/todo.service";
import { response } from "../../shared/response";

import { TodoFilters } from "../../types/todo";

const extractFilters = ({ startDate, endDate, status }: any) => {
  if (!startDate && !endDate && !status) {
    return undefined;
  }
  
  return { 
    startDate: Temporal.Instant.from(startDate), 
    endDate: Temporal.Instant.from(endDate), 
    done: ((status) => Boolean(status === 'true' || status === 'false'))(status.toLowerCase())
  } as TodoFilters;
}

const sideEffects = async (event: any) => {
  console.log(event);
};

export const handler = async (event: any) => {  
  try {
    sideEffects(event);

    const filters = extractFilters({ ...event.queryStringParameters });
    const todos = await getTodos(filters);
    
    return response(200, todos);
  } catch (e) {
    console.error(e);
    return response(500);
  }
}