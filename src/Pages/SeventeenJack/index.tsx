import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Components/common/Button';
import { Card } from '../../Components/common/Card';
import { Neon } from '../../Components/common/Neon';
import {
  StyledButtonWrap,
  StyledCardWrap,
  StyledContainer,
  StyledEnemyCardWrap,
  StyledResultWrap,
  StyledSingleUnitCards,
} from './styled';

export const SeventeenJack = () => {
  const [isStarted, setIsStart] = React.useState<boolean>(false);

  const [deckId, setDeckId] = React.useState<string | undefined>();
  const deckIdRef = React.useRef<string>();

  const [leftCardSrc, setLeftCardSrc] = React.useState<string | undefined>();
  const [rightCardSrc, setRightCardSrc] = React.useState<string | undefined>();

  const [currentValue, setCurrentValue] = React.useState<number>();
  const [currentEnemyValue, setCurrentEnemeyValue] = React.useState<number>();

  const [isleftSelected, setIsLeftSelected] = React.useState<boolean>(false);
  const [isRightSelected, setIsRightSelected] = React.useState<boolean>(false);

  const [firstSrc, setFirstSrc] = React.useState<string | undefined>();
  const [secondSrc, setSecondSrc] = React.useState<string | undefined>();
  const [thirdSrc, setThirdSrc] = React.useState<string | undefined>();
  const [fourthSrc, setFourthSrc] = React.useState<string | undefined>();

  const [result, setResult] = React.useState<string>();
  const [played, setPlayed] = React.useState<boolean>(false);

  React.useEffect(() => {
    // 画面生成時
    callApi();
  }, []);

  React.useEffect(() => {
    // カードが変更された時の際算出
    if (!leftCardSrc || !rightCardSrc) {
      return;
    }
    if (
      (leftCardSrc?.substr(38, 1) === 'A' &&
        numberTranslator(rightCardSrc) === 7) ||
      (rightCardSrc?.substr(38, 1) === 'A' &&
        numberTranslator(leftCardSrc) === 7)
    ) {
      setCurrentValue(17);
      return;
    }
    setCurrentValue(
      numberTranslator(leftCardSrc) + numberTranslator(rightCardSrc)
    );
  }, [leftCardSrc, rightCardSrc]);

  const numberTranslator = (src: string) => {
    const number = src.substr(38, 1);
    switch (number) {
      case 'K':
      case 'Q':
      case 'J':
        return 10;
      case 'A':
        return 1;
      default:
        return Number(number);
    }
  };

  const callApi = async () => {
    if (played === true) return;
    setPlayed(true);
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then((res) => {
        const respose = res.json();
        respose.then((res) => {
          setDeckId(res.deck_id);
        });
      })
      .catch((e) => {
        console.error(e);
        alert('サーバーで予期せぬエラーが発生しました');
      });
  };

  React.useEffect(() => {
    deckIdRef.current = deckId;
  }, [deckId]);

  enum Side {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
  }

  const drowCard = async (number: number, side?: Side) => {
    fetch(
      `https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=${number}`
    )
      .then((res) => {
        const respose = res.json();
        respose
          .then((res) => {
            switch (side) {
              case Side.LEFT:
                setLeftCardSrc(res.cards[0].image);
                break;
              case Side.RIGHT:
                setRightCardSrc(res.cards[0].image);
                break;
              default:
                setLeftCardSrc(res.cards[0].image);
                setRightCardSrc(res.cards[1].image);
                break;
            }
          })
          .finally(() => {
            setIsLeftSelected(false);
            setIsRightSelected(false);
            setIsStart(true);
          });
      })
      .catch((e) => {
        console.error(e);
        alert('サーバーエラーが発生しました。');
      });
  };

  const changeCards = () => {
    if (isleftSelected && isRightSelected) {
      drowCard(2);
      return;
    }
    if (isleftSelected) {
      drowCard(1, Side.LEFT);
      return;
    }
    if (isRightSelected) {
      drowCard(1, Side.RIGHT);
      return;
    }
  };

  const openCards = async () => {
    fetch(
      `https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=4`
    )
      .then((res) => {
        const respose = res.json();
        respose.then((res) => {
          setFirstSrc(res.cards[0].image);
          setSecondSrc(res.cards[1].image);
          setThirdSrc(res.cards[2].image);
          setFourthSrc(res.cards[3].image);

          calculateEnemyValue(
            numberTranslator(res.cards[0].image) +
              numberTranslator(res.cards[1].image),
            numberTranslator(res.cards[2].image) +
              numberTranslator(res.cards[3].image)
          );
        });
      })
      .catch((e) => {
        console.error(e);
        alert('予期せぬエラーが発生しました');
      });
  };

  React.useEffect(() => {
    if (!currentEnemyValue || !currentValue) return;
    if (currentValue > 17) {
      setResult('you lose');
    } else if (currentEnemyValue > 17) {
      setResult('you win');
    } else if (currentEnemyValue === 17) {
      setResult('you lose');
    } else if (currentValue === 17) {
      setResult('you win');
    } else if (currentEnemyValue === currentValue) {
      setResult('drow');
    } else if (currentEnemyValue < currentValue) {
      setResult('you win');
    } else setResult('you lose');
  }, [currentEnemyValue]);

  const calculateEnemyValue = (one: number, two: number) => {
    if (one === 17) {
      setCurrentEnemeyValue(one);
    } else if (two === 17) {
      setCurrentEnemeyValue(two);
    } else if (one > 17) {
      setCurrentEnemeyValue(two);
    } else if (two > 17) {
      setCurrentEnemeyValue(one);
    } else if (one < two) {
      setCurrentEnemeyValue(two);
    } else setCurrentEnemeyValue(one);
    return;
  };

  const refrash = () => {
    setLeftCardSrc(undefined);
    setRightCardSrc(undefined);
    setCurrentValue(undefined);
    setCurrentEnemeyValue(undefined);
    setIsLeftSelected(false);
    setIsRightSelected(false);
    setFirstSrc(undefined);
    setSecondSrc(undefined);
    setThirdSrc(undefined);
    setFourthSrc(undefined);
    setResult(undefined);
    setIsStart(false);
  };

  return (
    <div className="App" id="app">
      <StyledContainer>
        <Neon label={'SEVENTEEN JACK'} />
        {isStarted && (
          <StyledEnemyCardWrap>
            <StyledSingleUnitCards>
              <Card isSelected={false} enemy src={firstSrc} />
              <Card isSelected={false} enemy src={secondSrc} />
            </StyledSingleUnitCards>
            <StyledSingleUnitCards>
              <Card isSelected={false} enemy src={thirdSrc} />
              <Card isSelected={false} enemy src={fourthSrc} />
            </StyledSingleUnitCards>
          </StyledEnemyCardWrap>
        )}
        {!isStarted ? (
          <StyledButtonWrap>
            <Button label={'play'} onClickHandler={() => drowCard(2)} />
            <Link to={`/`} className="right-content">
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
                id="changeButton"
                label={'CHANGE'}
                disabled={!isRightSelected && !isleftSelected}
                onClickHandler={changeCards}
              />
              <Button
                id="openButton"
                disabled={isRightSelected || isleftSelected}
                onClickHandler={openCards}
                label={'OPEN'}
              />
            </StyledButtonWrap>
          )
        )}
      </StyledContainer>
    </div>
  );
};

export default SeventeenJack;
