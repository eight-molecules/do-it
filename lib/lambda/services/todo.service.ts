import { ulid } from 'ulid';

import { Temporal } from '@js-temporal/polyfill';
import { TodoFilters } from '../types/todo';

export interface Todo {
  id: string,
  title: string,
  description: string,
  date: Temporal.ZonedDateTime,
  done: boolean,
};

const todos: Todo[] = [
  {
    id: ulid(),
    title: 'Create Api',
    description: 'Create an api to serve this data.',
    date: Temporal.Now.instant().toZonedDateTimeISO('America/New_York'),
    done: true,
  },
  {
    id: ulid(),
    title: 'Update a done status',
    description: 'Create a way to persist updates to complete the Create Api item.',
    date: Temporal.Now.instant().toZonedDateTimeISO('America/New_York').add({ days: 1 }),
    done: false,
  },
  {
    id: ulid(),
    title: 'Create App',
    description: 'Create a react app to display this data',
    date: Temporal.Now.instant().toZonedDateTimeISO('America/New_York').subtract({ days: 1 }),
    done: false,
  }
]


export const getTodos = async (filters?: Partial<TodoFilters>): Promise<Todo[]> => new Promise((resolve) => setTimeout(() => {
  let result: Todo[] = [ ...todos ];
  
  if (filters) {
    const { startDate, endDate, done } = filters ?? { };
    const useStartDate = startDate instanceof Temporal.ZonedDateTime; 
    const useEndDate = endDate instanceof Temporal.ZonedDateTime;
    const useDone = typeof done === 'boolean';

    if (useStartDate || useEndDate || useDone) {
      const matchStartDate = (todo: Todo) => !useStartDate || Temporal.ZonedDateTime.compare(todo.date, startDate!) > -1;
      const matchEndDate = (todo: Todo) => !useStartDate || Temporal.ZonedDateTime.compare(todo.date, endDate!) < 1;
      const matchStatus = (todo: Todo) => !useDone || todo.done === done;
      
      result = todos.filter((todo) => {
        return matchStartDate(todo) && matchEndDate(todo) && matchStatus(todo);
      });
    }
  }

  resolve(result);
}, 1000 * Math.random()));