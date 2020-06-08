import { atom, selector } from 'recoil';

import sortBy from 'lodash/sortBy';

export const todoList = atom({
  key: 'todoList',
  default: [],
});

export const lastIndex = atom({
  key: 'lastIndex',
  default: 0,
});

export const sortedTodoList = selector({
  key: 'sortedTodoList',
  get: ({ get }) => sortBy(get(todoList), ['key']),
});
