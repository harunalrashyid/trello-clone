import { useAppState } from '../state/AppStateContext';
import { addTask } from '../state/actions';
import { ColumnContainer, ColumnTitle } from '../styles';

import { AddNewItem } from './AddNewItem';
import { Card } from './Card';

type ColumnProps = {
  id: string
  text: string,
}

export const Column = ({ id, text }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map(task => (
        <Card
          id={task.id}
          key={task.id}
          text={task.text}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
}