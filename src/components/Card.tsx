import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { moveTask } from '../state/actions';
import { useAppState } from '../state/AppStateContext';
import { useItemDrag } from '../utils/useItemDrag';
import { isHidden } from '../utils/isHidden';

import { CardContainer } from '../styles';

type CardProps = {
  id: string
  text: string
  columnId: string
  isPreview?: boolean
}

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: 'CARD',
    id,
    text,
    columnId
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover() {
      if (!draggedItem) {
        return
      }

      if (draggedItem.type !== 'CARD') {
        return
      }

      if (draggedItem.id === id) {
        return
      }

      dispatch(
        moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
      )
    }
  })

  drag(drop(ref))

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
}
