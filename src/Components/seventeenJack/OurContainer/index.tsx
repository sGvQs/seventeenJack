import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { Neon } from '../../common/Neon';
import {
  StyledButtonWrap,
  StyledCardWrap,
  StyledResultWrap,
  StyledSingleUnitCards,
} from './styled';

type OurContainerProps = {
  isStarted: boolean;
  result?: string;
  gameStatus: number;
  isleftSelected: boolean;
  isRightSelected: boolean;
  leftCardSrc?: string;
  rightCardSrc?: string;
  drowCard: (number: number) => void;
  setIsLeftSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRightSelected: React.Dispatch<React.SetStateAction<boolean>>;
  refrash: () => void;
  changeCards: () => void;
  openCards: () => void;
};

export const OurContainer: React.FC<OurContainerProps> = ({
  isStarted,
  result,
  isleftSelected,
  isRightSelected,
  leftCardSrc,
  rightCardSrc,
  gameStatus,
  refrash,
  changeCards,
  openCards,
  drowCard,
  setIsLeftSelected,
  setIsRightSelected,
}) => {
  return (
    <>
      {!isStarted ? (
        <StyledButtonWrap>
          <Button label={'PLAY'} onClickHandler={() => drowCard(2)} />
          <Link to={`/`}>
            <Button label={'HOME'} />
          </Link>
        </StyledButtonWrap>
      ) : (
        <StyledCardWrap>
          <StyledSingleUnitCards>
            <Card
              isSelected={isleftSelected}
              onClickHandler={() => setIsLeftSelected((current) => !current)}
              src={leftCardSrc}
              enemy={false}
            />
            <Card
              isSelected={isRightSelected}
              onClickHandler={() => setIsRightSelected((current) => !current)}
              src={rightCardSrc}
              enemy={false}
            />
          </StyledSingleUnitCards>
        </StyledCardWrap>
      )}
      {result ? (
        <StyledResultWrap>
          <Neon label={result} />
          <Button label={'BACK TO TITLE'} onClickHandler={refrash} />
        </StyledResultWrap>
      ) : (
        isStarted && (
          <StyledButtonWrap>
            <Button
              label={'CHANGE'}
              disabled={(!isRightSelected && !isleftSelected) || gameStatus > 2}
              onClickHandler={changeCards}
            />
            <Button
              disabled={isRightSelected || isleftSelected}
              onClickHandler={openCards}
              label={'OPEN'}
            />
          </StyledButtonWrap>
        )
      )}
    </>
  );
};
