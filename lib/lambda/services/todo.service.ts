import { decodeTime, encodeTime, ulid } from '../shared/ulid';

import { Temporal } from '@js-temporal/polyfill';
import { TodoFilters } from '../types/todo';

export interface Todo {
  id: string,
  title: string,
  description: string,
  createdDate: Temporal.ZonedDateTime,
  lastModifiedDate: Temporal.ZonedDateTime,
  done: boolean,
}

const toTodos = ({ id, title, description, done, lastModified }: any) => {
  const createdDate = Temporal.Instant.fromEpochSeconds(decodeTime(id)).toZonedDateTimeISO('America/New_York');
  const lastModifiedDate = Temporal.Instant.fromEpochSeconds(decodeTime(`${lastModified}0000000000000000`)).toZonedDateTimeISO('America/New_York')

  return { id, title, description, done, lastModifiedDate, createdDate };
};

const fetchTodos = async () => (await import('./todos')).default.map(toTodos);

export const getTodos = async (filters?: Partial<TodoFilters>): Promise<Todo[]> => new Promise((resolve) => setTimeout(async () => {
  let result: Todo[] = await fetchTodos();

  if (filters) {
    const { createdDateStart, createdDateEnd, lastModifiedDateStart, lastModifiedDateEnd, done } = filters ?? { };
    const useCreatedDateStart = createdDateStart instanceof Temporal.ZonedDateTime; 
    const useCreatedDateEnd = createdDateEnd instanceof Temporal.ZonedDateTime;
    const useLastModifiedDateStart = lastModifiedDateStart instanceof Temporal.ZonedDateTime; 
    const useLastModifiedDateEnd = lastModifiedDateEnd instanceof Temporal.ZonedDateTime;
    const useDone = typeof done === 'boolean';

    if (useCreatedDateStart || useCreatedDateEnd || useLastModifiedDateStart || useLastModifiedDateEnd || useDone) {
      const matchCreatedDateStart = (todo: Todo) => !useCreatedDateStart || Temporal.ZonedDateTime.compare(todo.createdDate, createdDateStart!) > -1;
      const matchCreatedDateEnd = (todo: Todo) => !useCreatedDateEnd || Temporal.ZonedDateTime.compare(todo.createdDate, createdDateEnd!) < 1;
      const matchLastModifiedDateStart = (todo: Todo) => !useLastModifiedDateStart || Temporal.ZonedDateTime.compare(todo.createdDate, lastModifiedDateStart!) > -1;
      const matchLastModifiedDateEnd = (todo: Todo) => !useLastModifiedDateEnd || Temporal.ZonedDateTime.compare(todo.createdDate, lastModifiedDateEnd!) < 1;
      const matchStatus = (todo: Todo) => !useDone || todo.done === done;
      
      result = result.filter((todo) => matchCreatedDateStart(todo) && matchCreatedDateEnd(todo) && matchLastModifiedDateStart(todo) && matchLastModifiedDateEnd(todo) && matchStatus(todo));
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