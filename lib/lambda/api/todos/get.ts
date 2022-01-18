import dayjs = require("dayjs");
import { getTodos } from "../../services/todo.service";
import { response } from "../../shared/response";

import { TodoFilters } from "../../types/todo";

const extractFilters = ({ startDate, endDate, status }: any) => !startDate && !endDate && !status ? undefined : ({ 
  startDate: dayjs(startDate), 
  endDate: dayjs(endDate), 
  status: ((status) => {
    const transformedStatus = status?.toLowerCase();
    return transformedStatus === 'true' || transformedStatus === 'false';
  })(status)
} as TodoFilters);

const sideEffects = (event: any) => {
  console.log(event);
};

export const handler = async (event: any) => {
  sideEffects(event);
  
  try {
    const filters = extractFilters(event.queryParameters);
    const todos = await getTodos(filters);
    return response(200, todos);
  } catch (e) {
    console.error(e);
    return response(500);
  }
}