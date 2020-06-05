import React from 'react';
import { RecoilRoot } from 'recoil';

import ToDoContainer from './ToDoContainer';

export default function App() {
  return (
    <RecoilRoot>
      <ToDoContainer />
    </RecoilRoot>
  );
}
