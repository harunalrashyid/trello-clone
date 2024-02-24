import { useState } from 'react';
import { NewItemFormContainer, NewItemButton, NewItemInput } from '../styles';
import { useFocus } from '../utils/useFocus';

type NewItemFormProps = {
  onAdd(text: string): void
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput
        onChange={e => setText(e.target.value)}
        ref={inputRef}
        value={text}
      />
      <NewItemButton onClick={() => onAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  );
}
