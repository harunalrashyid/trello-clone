import React from 'react';

import { useAppState } from './state/AppStateContext';
import { addList } from './state/actions';
import { AppContainer } from './styles';

import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';

export const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      {lists.map(list => (
        <Column
          id={list.id}
          key={list.id}
          text={list.text}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch(addList(text))}
      />
    </AppContainer>
  );
}
