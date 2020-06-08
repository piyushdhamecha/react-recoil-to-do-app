import { atom, selector } from 'recoil';

import orderBy from 'lodash/orderBy';

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
  get: ({ get }) => orderBy(get(todoList), ['checked', 'key'], ['asc', 'desc']),
});
