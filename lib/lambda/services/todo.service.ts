import { ulid } from 'ulid';

import { Temporal } from '@js-temporal/polyfill';
import { TodoFilters } from '../types/todo';

export interface Todo {
  id: string,
  title: string,
  description: string,
  date: Temporal.Instant,
  done: boolean,
};

const todos: Todo[] = [
  {
    id: ulid(),
    title: 'Create Api',
    description: 'Create an api to serve this data.',
    date: Temporal.Now.instant(),
    done: false,
  },
  {
    id: ulid(),
    title: 'Update a done status',
    description: 'Create a way to persist updates to complete the Create Api item.',
    date: Temporal.Now.instant().add({ hours: 24 }),
    done: false,
  },
  {
    id: ulid(),
    title: 'Create App',
    description: 'Create a react app to display this data',
    date: Temporal.Now.instant().subtract({ hours: 24 }),
    done: false,
  }
]


export const getTodos = async (filters?: Partial<TodoFilters>): Promise<Todo[]> => new Promise((resolve) => setTimeout(() => {
  if (!filters) {
    resolve([ ...todos ]);
  }

  const { startDate = Temporal.Now.instant().subtract({ hours: 24 * 90 }), endDate = Temporal.Now.instant(), done } = filters ?? { };
  const useStartDate = startDate instanceof Temporal.Instant; 
  const useEndDate = endDate instanceof Temporal.Instant;
  const useDone = typeof done === 'boolean';

  if (!useStartDate && !useEndDate && !useDone) {
    resolve([]);
  }

  resolve(todos.filter((todo) => {
    const matchStartDate = !useStartDate || Temporal.Instant.compare(todo.date, startDate) > -1;
    const matchEndDate = !useEndDate || Temporal.Instant.compare(todo.date, endDate) <= 1;
    const matchStatus = !useDone || todo.done === done;

    return matchStartDate && matchEndDate && matchStatus;
  }));
}, 1000 * Math.random()));