import React from 'react';
import { Neon } from '../../Components/common/Neon';
import { EnemyContainer } from '../../Components/seventeenJack/EnemyContainer';
import { OurContainer } from '../../Components/seventeenJack/OurContainer';
import { useSeventeentJackStates } from './hooks';
import { StyledContainer } from './styled';

export const SeventeenJack = () => {
  const {
    firstSrc,
    secondSrc,
    isStarted,
    thirdSrc,
    isRightSelected,
    isleftSelected,
    fourthSrc,
    played,
    currentEnemyValue,
    currentValue,
    result,
    deckId,
    rightCardSrc,
    deckIdRef,
    leftCardSrc,
    gameStatus,
    setGameStatus,
    setDeckId,
    setLeftCardSrc,
    setResult,
    setRightCardSrc,
    setPlayed,
    setCurrentValue,
    setFourthSrc,
    setCurrentEnemeyValue,
    setIsStart,
    setIsLeftSelected,
    setThirdSrc,
    setIsRightSelected,
    setSecondSrc,
    setFirstSrc,
  } = useSeventeentJackStates();

  React.useEffect(() => {
    // 画面生成時
    if (played === true) return;
    setPlayed(false);
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
    setGameStatus((current) => current + 1);
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
    setTimeout(() => {
      calculateFinalResult();
    }, 2000);
  }, [currentEnemyValue]);

  const calculateFinalResult = () => {
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
  };

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
    setGameStatus(0);
  };

  return (
    <div className="App" id="app">
      <StyledContainer>
        <Neon label={'SEVENTEEN JACK'} />
        {isStarted && (
          <EnemyContainer
            firstSrc={firstSrc}
            secondSrc={secondSrc}
            thirdSrc={thirdSrc}
            fourthSrc={fourthSrc}
          />
        )}
        <OurContainer
          isStarted={isStarted}
          result={result}
          isleftSelected={isleftSelected}
          isRightSelected={isRightSelected}
          leftCardSrc={leftCardSrc}
          rightCardSrc={rightCardSrc}
          refrash={refrash}
          changeCards={changeCards}
          openCards={openCards}
          drowCard={drowCard}
          setIsLeftSelected={setIsLeftSelected}
          setIsRightSelected={setIsRightSelected}
          gameStatus={gameStatus}
        />
      </StyledContainer>
    </div>
  );
};
