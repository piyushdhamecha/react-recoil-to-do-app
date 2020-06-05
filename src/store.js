import { atom } from 'recoil'

const textState = atom({
  key: 'todoList',
  default: [],
});
