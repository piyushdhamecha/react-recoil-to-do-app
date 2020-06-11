import { atom, atomFamily, selector } from 'recoil';

export const todoList = atomFamily({
  key: 'todoList',
  default: [],
});

export const lastIndex = atom({
  key: 'lastIndex',
  default: 0,
});

export const filteredTodoList = selector({
  key: 'sortedTodoList',
  get: ({ get }) => {
    const filteredList = [];
    const tempLastIndex = get(lastIndex);

    for (let index = 0; index < tempLastIndex; index += 1) {
      const item = get(todoList(index));

      if (item && !item.isDeleted) {
        filteredList.push(item);
      }
    }

    return filteredList;
  },
});
