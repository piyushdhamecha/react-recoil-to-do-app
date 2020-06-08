import React from 'react';
import { RecoilRoot } from 'recoil';

import ToDoContainer from './ToDoContainer';
import { GlobalStyle } from './GlobalStyle';

export default function App() {
  return (
    <RecoilRoot>
      <ToDoContainer />
      <GlobalStyle />
    </RecoilRoot>
  );
}
