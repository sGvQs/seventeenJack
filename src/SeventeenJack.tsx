import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SventeenJack.css';

function SeventeenJack() {
  let [deckId, idValue] = useState('');
  let [leftCard, left] = useState('');
  let [leftNum, leftValue] = useState('');
  let [rightCard, right] = useState('');
  let [rightNum, rightValue] = useState('');
  let [isStarted, displayStart] = useState(true);
  let [setGame, displayGame] = useState(false);
  let [isLeftSelected, leftSelected] = useState(false);
  let [isRightSelected, rightSelected] = useState(false);
  let [myScore, scoreValue] = useState(0);
  let [CPU1, CPU1Value] = useState(0);
  let [CPU2, CPU2Value] = useState(0);
  let [enemyScore, enemyValue] = useState(0);
  let [result, resultValue] = useState('');
  let [showResult, displayResult] = useState(false);
  const [played, calledPlayed] = useState(false);
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    let CPU1 = Math.floor(Math.random() * (20 - 8) + 8);
    CPU1Value(CPU1);
    let CPU2 = Math.floor(Math.random() * (20 - 8) + 8);
    CPU2Value(CPU2);
  }, []);

  async function callApi() {
    if (played === true) {
      return;
    }
    calledPlayed(true);
    const res = await fetch(
      'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    if (res.status === 200) {
      const useRes = await res.json();
      let id = await useRes.deck_id;
      deckId = await id;
      await idValue(id);
      await drowCard(2, '');
      return displayStart(false);
    } else {
      const app = document.getElementById('app');
      while (app?.firstChild) {
        app?.removeChild(app?.firstChild);
      }
      const img = document.createElement('img');
      img.style.width = '100vw';
      img.style.height = '100vh';
      img.style.display = 'block';
      img.src = `https://http.cat/${res.status}.jpg`;
      app?.appendChild(img);
    }
  }

  async function drowCard(number: number, side: string) {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${number}`
    );
    const useRes = await res.json();

    let leftNumber = '';
    let rightNumber = '';

    let leftImg = await document.createElement('img');
    let rightImg = await document.createElement('img');

    let leftObject = document.getElementById('leftObject');
    let rightObject = document.getElementById('rightObject');

    if (number === 2) {
      // leftCard
      leftCard = await useRes.cards[0].image;
      leftNumber = await useRes.cards[0].value;

      await leftValue(leftNumber);

      leftImg.src = await `${leftCard}`;
      await leftObject?.appendChild(leftImg);

      // RightCard
      rightCard = await useRes.cards[1].image;
      rightNumber = await useRes.cards[1].value;

      await rightValue(rightNumber);

      rightImg.src = await `${rightCard}`;
      await rightObject?.appendChild(rightImg);

      return displayGame(true);
    }

    if (side === 'left') {
      leftCard = await useRes.cards[0].image;
      leftNumber = await useRes.cards[0].value;

      await leftValue(leftNumber);

      leftImg.src = await `${leftCard}`;
      await leftObject?.appendChild(leftImg);
    }

    if (side === 'right') {
      rightCard = await useRes.cards[0].image;
      rightNumber = await useRes.cards[0].value;

      await rightValue(rightNumber);

      rightImg.src = await `${rightCard}`;
      await rightObject?.appendChild(rightImg);
    }
  }

  function changeLeft() {
    if (setGame === false) {
      return;
    }
    if (count === 2) {
      return;
    }
    return leftSelected(!isLeftSelected);
  }

  const changeButton = document.getElementById('changeButton');
  const openButton = document.getElementById('openButton');

  // when left card selected
  useEffect(() => {
    const leftCard = document.getElementById('leftObject');

    // watching the leftCard selected
    if (isLeftSelected === true) {
      leftCard?.classList.add('selected');
    } else {
      leftCard?.classList.remove('selected');
    }

    // style of change-button
    // disabled change-button
    if (isLeftSelected === false && isRightSelected === false) {
      changeButton?.classList.add('enabled');
      openButton?.classList.remove('enabled');
      setDisable(true);
    } else {
      changeButton?.classList.remove('enabled');
      openButton?.classList.add('enabled');
      setDisable(false);
    }
  }, [isLeftSelected]);

  function changeRight() {
    if (setGame === false) {
      return;
    }
    if (count === 2) {
      return;
    }
    return rightSelected(!isRightSelected);
  }

  // when right card selected
  useEffect(() => {
    const rightCard = document.getElementById('rightObject');

    // watching the rightCard selected
    if (isRightSelected === true) {
      rightCard?.classList.add('selected');
    } else {
      rightCard?.classList.remove('selected');
    }

    // style of change-button
    // disabled change-button
    if (isLeftSelected === false && isRightSelected === false) {
      changeButton?.classList.add('enabled');
      openButton?.classList.remove('enabled');
      setDisable(true);
    } else {
      changeButton?.classList.remove('enabled');
      openButton?.classList.add('enabled');
      setDisable(false);
    }
  }, [isRightSelected]);

  function changeCards() {
    let leftObject = document.getElementById('leftObject');
    let rightObject = document.getElementById('rightObject');

    if (isLeftSelected === true && isRightSelected === true) {
      leftObject?.firstElementChild?.remove();
      rightObject?.firstElementChild?.remove();
      changeLeft();
      changeRight();
      drowCard(2, '');
    } else if (isLeftSelected === true) {
      changeLeft();
      leftObject?.firstElementChild?.remove();
      drowCard(1, 'left');
    } else if (isRightSelected === true) {
      changeRight();
      rightObject?.firstElementChild?.remove();
      drowCard(1, 'right');
    }

    setCount(count + 1);
  }

  function open() {
    let firstCard = 0;
    let secondCard = 0;
    let score = 0;

    firstCard = Number(leftNum);
    secondCard = Number(rightNum);

    let items = ['JACK', 'KING', 'QUEEN'];

    if (items.some((item) => item === leftNum || item === rightNum) === true) {
      items.forEach((item) => {
        if (leftNum === item) {
          firstCard = 10;
        }
        if (rightNum === item) {
          secondCard = 10;
        }
      });
    }

    if (leftNum === 'ACE') {
      firstCard = 1;
    }

    if (rightNum === 'ACE') {
      secondCard = 1;
    }

    score = firstCard + secondCard;

    //特殊ルール

    if (leftNum === 'JACK' && rightNum === '6') {
      score = 17;
    }

    if (leftNum === '6' && rightNum === 'JACK') {
      score = 17;
    }

    if (leftNum === 'ACE' && rightNum === '7') {
      score = 17;
    }

    if (leftNum === '7' && rightNum === 'ACE') {
      score = 17;
    }

    myScore = score;

    let CPUScore = 0;

    if (CPU2 > 17 && CPU1 > 17 && myScore < 18) {
      resultValue('win');
    } else if (CPU2 === CPU1) {
      CPUScore = CPU2;
    } else if (CPU2 > 17) {
      CPUScore = CPU1;
    } else if (CPU1 > 17) {
      CPUScore = CPU2;
    } else if (CPU1 < CPU2) {
      CPUScore = CPU2;
    } else if (CPU2 < CPU1) {
      CPUScore = CPU1;
    }

    enemyScore = CPUScore;

    if (myScore > 17 && CPUScore < 18) {
      resultValue('you lose');
    } else if (myScore < CPUScore && CPUScore < 18) {
      resultValue('you lose');
    } else if (myScore === CPUScore) {
      resultValue('drow');
    } else if (myScore > 17 && CPUScore > 17) {
      resultValue('drow');
    } else {
      resultValue('you win');
    }

    setTimeout(() => {
      showCard();
    }, 2000);

    return displayGame(false);
  }

  const showCard = () => {
    let firstCard = document.getElementById('1');
    let secondCard = document.getElementById('2');
    let thirdCard = document.getElementById('3');
    let fourthCard = document.getElementById('4');

    let firstNum = 0;
    if (CPU1 === 8) {
      firstNum = 1;
    } else if (CPU1 < 12) {
      firstNum = Math.floor(Math.random() * (10 - 1) + 1);
    } else if (CPU1 < 18) {
      firstNum = Math.floor(Math.random() * (10 - 7) + 7);
    } else {
      firstNum = 10;
    }
    let secoundNum = CPU1 - firstNum + 1;

    let thirdNum = 0;
    if (CPU2 === 8) {
      thirdNum = 1;
    } else if (CPU2 < 12) {
      thirdNum = Math.floor(Math.random() * (10 - 1) + 1);
    } else if (CPU2 < 18) {
      thirdNum = Math.floor(Math.random() * (10 - 7) + 7);
    } else {
      thirdNum = 10;
    }
    let fourthNum = CPU2 - thirdNum + 1;

    if (firstNum === 10) {
      firstNum = RandArray(['J', 'K', 'Q', '0']);
    }

    if (firstNum === 1) {
      firstNum = RandArray(['A']);
    }

    if (secoundNum > 9) {
      secoundNum = RandArray(['J', 'K', 'Q', '0']);
    }

    if (secoundNum === 1) {
      secoundNum = RandArray(['A']);
    }

    if (thirdNum > 9) {
      thirdNum = RandArray(['J', 'K', 'Q', '0']);
    }

    if (thirdNum === 1) {
      thirdNum = RandArray(['A']);
    }

    if (fourthNum > 9) {
      fourthNum = RandArray(['J', 'K', 'Q', '0']);
    }

    if (fourthNum === 1) {
      fourthNum = RandArray(['A']);
    }

    let CPU1First = firstNum + RandArray(['S', 'D', 'C', 'H']);
    let CPU1Second = secoundNum + RandArray(['S', 'D', 'C', 'H']);
    let CPU2First = thirdNum + RandArray(['S', 'D', 'C', 'H']);
    let CPU2Second = fourthNum + RandArray(['S', 'D', 'C', 'H']);

    setTimeout(() => {
      firstCard?.setAttribute(
        'src',
        `https://deckofcardsapi.com/static/img/${CPU1First}.png`
      );
    }, 500);

    setTimeout(() => {
      secondCard?.setAttribute(
        'src',
        `https://deckofcardsapi.com/static/img/${CPU1Second}.png`
      );
    }, 1000);

    setTimeout(() => {
      thirdCard?.setAttribute(
        'src',
        `https://deckofcardsapi.com/static/img/${CPU2First}.png`
      );
    }, 2500);

    setTimeout(() => {
      fourthCard?.setAttribute(
        'src',
        `https://deckofcardsapi.com/static/img/${CPU2Second}.png`
      );
    }, 3000);

    setTimeout(() => {
      displayResult(true);
    }, 4500);
  };

  function RandArray(array: string | any[]) {
    var rand = (Math.random() * array.length) | 0;
    var rValue = array[rand];
    return rValue;
  }

  const refresh = () => {
    idValue('');
    left('');
    leftValue('');
    right('');
    rightValue('');
    displayStart(true);
    displayGame(false);
    displayResult(false);
    setCount(0);
    setDisable(true);
    calledPlayed(false);
    let leftObject = document.getElementById('leftObject');
    let rightObject = document.getElementById('rightObject');
    leftObject?.firstElementChild?.remove();
    rightObject?.firstElementChild?.remove();
  };

  return (
    <div className="App" id="app">
      <div className="container">
        <div className="neon">SEVENTEEN JACK</div>
      </div>
      {!isStarted && (
        <div className="enemy-card-wrap">
          <div className="side-enemy">
            <img
              id="1"
              src="https://i.pinimg.com/236x/62/72/c7/6272c70b7708ca03f50284a9720c98a3.jpg"
              className="enemy-card-left"
            />
            <img
              id="2"
              src="https://i.pinimg.com/236x/62/72/c7/6272c70b7708ca03f50284a9720c98a3.jpg"
              className="enemy-card-right"
            />
          </div>
          <div className="side-enemy">
            <img
              id="3"
              src="https://i.pinimg.com/236x/62/72/c7/6272c70b7708ca03f50284a9720c98a3.jpg"
              className="enemy-card-left"
            />
            <img
              id="4"
              src="https://i.pinimg.com/236x/62/72/c7/6272c70b7708ca03f50284a9720c98a3.jpg"
              className="enemy-card-right"
            />
          </div>
        </div>
      )}
      <div className="card-wrap">
        {isStarted && (
          <>
            <button className="button" onClick={callApi}>
              PLAY
            </button>
            <Link to={`/`} className="right-content">
              <button className="button">HOME</button>
            </Link>
          </>
        )}
        <div className="card-left" id="leftObject" onClick={changeLeft}></div>
        <div
          className="card-right right-content"
          id="rightObject"
          onClick={changeRight}
        ></div>
      </div>
      <div>
        {showResult && <div className="neon">{result}</div>}
        {showResult && (
          <button className="button" onClick={refresh}>
            BACK TO TITLE
          </button>
        )}
      </div>
      <div className="button-warp">
        {setGame && (
          <button
            id="changeButton"
            className="enabled button left"
            disabled={disable}
            onClick={changeCards}
          >
            CHANGE
          </button>
        )}
        {setGame && (
          <button
            id="openButton"
            className="button right-content"
            disabled={!disable}
            onClick={open}
          >
            OPEN
          </button>
        )}
      </div>
    </div>
  );
}

export default SeventeenJack;
