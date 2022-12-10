import React from 'react';
import { StyledCardWrap, StyledCardImg } from './styled';

type CardProps = {
  isSelected: boolean;
  enemy?: boolean;
  src?: string;
  onClickHandler?: (event: any) => void;
};

export const Card: React.FC<CardProps> = ({
  isSelected,
  enemy,
  src,
  onClickHandler,
}) => {
  return (
    <StyledCardWrap onClick={onClickHandler} isSelected={isSelected}>
      {src ? (
        <StyledCardImg src={src} enemy={enemy} />
      ) : (
        <StyledCardImg
          enemy={enemy}
          src={
            'https://i.pinimg.com/236x/62/72/c7/6272c70b7708ca03f50284a9720c98a3.jpg'
          }
        />
      )}
    </StyledCardWrap>
  );
};
