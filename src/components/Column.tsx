import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { useItemDrag } from '../utils/useItemDrag';
import { useAppState } from '../state/AppStateContext';
import { addTask, moveList, moveTask, setDraggedItem } from '../state/actions';
import { isHidden } from '../utils/isHidden';
import { ColumnContainer, ColumnTitle } from '../styles';
import { DragItem } from '../types/DragItem';

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
    accept: ['COLUMN', 'CARD'],
    hover(item: DragItem) {
      if (!draggedItem) {
        return
      }

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return
        }

        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id) {
          return
        }

        if (tasks.length) {
          return
        }

        dispatch(
          moveTask(draggedItem.id, null, draggedItem.columnId, id)
        )
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
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
          columnId={id}
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