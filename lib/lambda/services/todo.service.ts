import { decodeTime, encodeTime, ulid } from '../shared/ulid';

import { Temporal } from '@js-temporal/polyfill';
import { Filters } from '../types/todo';

import todos from './todo.data';
import { convertTenBitTimestampToZonedDateTime } from '../shared/time';

export interface Todo {
  id: string,
  title: string,
  description: string,
  createdDate: Temporal.ZonedDateTime,
  lastModifiedDate: Temporal.ZonedDateTime,
  done: boolean,
}

const toTodo = ({ id, title, description, done, lastModified }: {
  id: string,
  title: string,
  description: string,
  done: boolean,
  lastModified: string
}) => {
  const createdDate = convertTenBitTimestampToZonedDateTime(id);
  const lastModifiedDate = convertTenBitTimestampToZonedDateTime(lastModified)

  return { id, title, description, done, lastModifiedDate, createdDate };
};

const fetchTodos = async () => todos.map(toTodo);

export const getTodos = async (filters?: Partial<Filters>): Promise<Todo[]> => new Promise((resolve) => setTimeout(async () => {
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
      
      result = result.filter((todo) => (
        matchCreatedDateStart(todo) && 
        matchCreatedDateEnd(todo) && 
        matchLastModifiedDateStart(todo) && 
        matchLastModifiedDateEnd(todo) && 
        matchStatus(todo)
      ));
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

export const createTodo = async (title: string, props: Partial<Todo> = { }) => {
  const { description = '', done = false } = props;

  const now = Temporal.Now.instant().epochSeconds;
  const id = ulid(now);
  const lastModified = encodeTime(now);

  const data = { 
    id, 
    title,
    description,
    done,
    lastModified
  };

  todos.push(data);
  return toTodo(data);
}