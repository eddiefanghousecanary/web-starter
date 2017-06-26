import React from 'react';
import { Button } from 'react-toolbox/lib/button';

export type AddOrderButtonProps = {
  onClick: () => void
}

const AddOrderButton = ({onClick} : AddOrderButtonProps) => {
  return (
    <div>
      <Button raised primary onClick={onClick} label='New Order' />
    </div>
  );
};

export default AddOrderButton;
