import { StyledButton } from './styled';
import React from 'react';

type ButtonProps = {
  label: string;
  id?: string;
  disabled?: boolean;
  onClickHandler?: (event: any) => void;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  id,
  disabled,
  onClickHandler,
}) => {
  return (
    <StyledButton id={id} disabled={disabled} onClick={onClickHandler}>
      {label}
    </StyledButton>
  );
};
