import { atom, atomFamily, selector } from 'recoil';

import orderBy from 'lodash/orderBy';

export const todoListItem = atom({
  key: 'todoListItem',
  default: (key) => ({ key }),
});

export const todoList = atomFamily({
  key: 'todoList',
  default: [],
});

export const lastIndex = atom({
  key: 'lastIndex',
  default: 0,
});

export const sortedTodoList = selector({
  key: 'sortedTodoList',
  get: ({ get }) => {
    const sortedList = [];
    const tempLastIndex = get(lastIndex);

    for (let index = 0; index < tempLastIndex; index += 1) {
      const item = get(todoList(index));
      debugger;
      if (item) {
        sortedList.push(item);
      }
    }
    console.log({ sortedList });
    return orderBy(sortedList, ['checked', 'key'], ['asc', 'desc']);
  },
});
