import { decodeTime, ulid } from 'ulid';

import { Temporal } from '@js-temporal/polyfill';
import { TodoFilters } from '../types/todo';

export interface Todo {
  id: string,
  title: string,
  description: string,
  date: Temporal.ZonedDateTime,
  done: boolean,
}

const toTodos = ({ id, title, description, done }: any) => ({ 
  id, title, description, done,
  date: Temporal.Instant.fromEpochSeconds(decodeTime(id)).toZonedDateTimeISO('America/New_York'),
});

const fetchTodos = async () => (await import('./todos')).default.map(toTodos);


export const getTodos = async (filters?: Partial<TodoFilters>): Promise<Todo[]> => new Promise((resolve) => setTimeout(async () => {
  let result: Todo[] = await fetchTodos();

  if (filters) {
    const { startDate, endDate, done } = filters ?? { };
    const useStartDate = startDate instanceof Temporal.ZonedDateTime; 
    const useEndDate = endDate instanceof Temporal.ZonedDateTime;
    const useDone = typeof done === 'boolean';

    if (useStartDate || useEndDate || useDone) {
      const matchStartDate = (todo: Todo) => !useStartDate || Temporal.ZonedDateTime.compare(todo.date, startDate!) > -1;
      const matchEndDate = (todo: Todo) => !useStartDate || Temporal.ZonedDateTime.compare(todo.date, endDate!) < 1;
      const matchStatus = (todo: Todo) => !useDone || todo.done === done;
      
      result = result.filter((todo) => matchStartDate(todo) && matchEndDate(todo) && matchStatus(todo));
    }
  }

  resolve(result);
}, 1000 * Math.random()));

export const getTodo = (id: string) => new Promise<Todo | undefined>((resolve) => {
  setTimeout(async () => {
    const todos = (await fetchTodos());

    resolve(todos.find((todo) => todo.id === id));
  }, 1000 * Math.random()); 
});