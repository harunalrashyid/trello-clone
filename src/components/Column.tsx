import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { useItemDrag } from '../utils/useItemDrag';
import { useAppState } from '../state/AppStateContext';
import { addTask, moveList } from '../state/actions';
import { isHidden } from '../utils/isHidden';
import { ColumnContainer, ColumnTitle } from '../styles';

import { AddNewItem } from './AddNewItem';
import { Card } from './Card';

type ColumnProps = {
  id: string
  text: string,
  isPreview?: boolean
}

export const Column = ({ id, text, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover() {
      if (!draggedItem) {
        return
      }

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return
        }

        dispatch(moveList(draggedItem.id, id))
      }
    }
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, text });
  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
      isPreview={isPreview}
    >
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