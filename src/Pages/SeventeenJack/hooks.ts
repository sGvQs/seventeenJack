import React from 'react';

export const useSeventeentJackStates = () => {
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
  return {
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
  };
};

export const useCallApi = () => {
  const { setDeckId } = useSeventeentJackStates();
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
