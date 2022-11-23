import { StyledButton } from './styled';
import React from 'react';

type ButtonProps = {
  label: string;
  id?: string;
  disabled?: boolean;
  onClickHandler?: (event: any) => void;
  rightContent: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  id,
  disabled,
  rightContent,
  onClickHandler,
}) => {
  return (
    <StyledButton
      id={id}
      disabled={disabled}
      rightContent={rightContent}
      onClick={onClickHandler}
    >
      {label}
    </StyledButton>
  );
};
