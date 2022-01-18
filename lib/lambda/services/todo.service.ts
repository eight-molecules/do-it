import * as dayjs from 'dayjs';
import { TodoFilters } from '../types/todo';

export interface Todo {
  id: string,
  title: string,
  description: string,
  date: dayjs.Dayjs,
  done: boolean,
};

const todos = [
  {
    id: 1,
    title: 'Create Api',
    description: 'Create an api to serve this data.',
    date: dayjs().add(-1),
    done: false,
  },
  {
    id: 2,
    title: 'Update a done status',
    description: 'Create a way to persist updates to complete the Create Api item.',
    date: dayjs().add(-1),
    done: false,
  },
  {
    id: 3,
    title: 'Create App',
    description: 'Create a react app to display this data',
    date: dayjs().add(-1),
    done: false,
  }
]


export const getTodos = async (filters?: Partial<TodoFilters>) => new Promise((resolve) => setTimeout(() => {
  if (!filters) {
    resolve([ ...todos ]);
  }

  const { startDate, endDate, status } = filters ?? { };
  resolve(todos.filter((todo) => (
    typeof startDate === undefined || todo.date >= dayjs(startDate) && 
    typeof endDate === undefined || todo.date <= dayjs(endDate) && 
    typeof status === undefined || todo.done === status
    )
  ));
}, 1000 * Math.random()));