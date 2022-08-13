import Cell from "./components/Cell/Cell";
import s from "./App.module.css"
import {useEffect, useState} from "react";
import PlayerLabel from "./components/PlayerLabel/PlayerLabel";
import NameInput from "./components/NameInput/NameInput";

function App() {
  const [firstScore, setFirstScore] = useState(0);
  const [secondScore, setSecondScore] = useState(0);
  const [name1, setName1] = useState(null);
  const [name2, setName2] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [moveStatus, setMoveStatus] = useState(null);
  const [draw, setDraw] = useState(false);
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');

  const [matrix, setMatrix] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ]);

  function onFirstInputChange(e) {
    setFirstInput(e.target.value);
  }

  function onSecondInputChange(e) {
    setSecondInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (firstInput === '' || secondInput === '') return;
      setName1(firstInput)
      setName2(secondInput)
    }
  }

  useEffect(() => {
    setMoveStatus(`${name1} plays`)
  }, [name1, name2])

  function handleButtonClick() {
    if (firstInput === '' || secondInput === '') return;
    setName1(firstInput)
    setName2(secondInput)
    setMoveStatus(`${name1} plays`)
  }

  function handleCellClick(cellIndex) {
    if (matrix[cellIndex] || gameOver) {
      return
    }

    if (moveStatus === `${name1} plays`) {
      setMatrix([...matrix.map((item, i) => {
        if (i === cellIndex) {
          return 'cross';
        }
        return item;
      })])
      setMoveStatus(`${name2} plays`)
    } else {
      setMatrix([...matrix.map((item, i) => {
        if (i === cellIndex) {
          return 'circle';
        }
        return item;
      })])
      setMoveStatus(`${name1} plays`)
    }
  }

  useEffect(() => {
    checkGameOver();
  }, [matrix])

  function checkGameOver() {
    if (
      checkLine(1, 2, 3) ||
      checkLine(4, 5, 6) ||
      checkLine(7, 8, 9) ||
      checkLine(1, 4, 7) ||
      checkLine(2, 5, 8) ||
      checkLine(3, 6, 9) ||
      checkLine(1, 5, 9) ||
      checkLine(3, 5, 7)
    ) {
      setGameOver(true);
      if (moveStatus === `${name2} plays`) {
        setFirstScore(firstScore + 1)
      } else if (moveStatus === `${name1} plays`) {
        setSecondScore(secondScore + 1)
      }
    } else if (checkDrawLine(1, 2, 3) &&
          checkDrawLine(4, 5, 6) &&
          checkDrawLine(7, 8, 9) &&
          checkDrawLine(1, 4, 7) &&
          checkDrawLine(2, 5, 8) &&
          checkDrawLine(3, 6, 9) &&
          checkDrawLine(1, 5, 9) &&
          checkDrawLine(3, 5, 7)) {
      setDraw(true);
    }
  }

  function checkLine(x, y, z) {
    // Ignore empty cells
    if (!matrix[x - 1] || !matrix[y - 1] || !matrix[z - 1]) {
      return false;
    }
    return matrix[x - 1] === matrix[y - 1] && matrix[y - 1] === matrix[z - 1];
  }

  function checkDrawLine(x, y, z) {
    if (!matrix[x - 1] || !matrix[y - 1] || !matrix[z - 1]) {
      return false;
    }
    return matrix[x - 1] !== matrix[y - 1] || matrix[y - 1] !== matrix[z - 1];
  }

  function startOver() {
    setMatrix([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
    setGameOver(false);
    setDraw(false);
    setMoveStatus(`${name1} plays`);
  }


  return (
    !name1 || !name2 ?
      <div>
        <NameInput
          onFirstInputChange={onFirstInputChange}
          onSecondInputChange={onSecondInputChange}
          onKeyDown={handleKeyDown}
          content1={firstInput}
          content2={secondInput}
          handleButtonClick={handleButtonClick}
        />
      </div> :
      <div className={s.App}>
        <div className={s.namesAndScore}>
          <PlayerLabel
            name={name1}
            content={firstInput}
            moveStatus={moveStatus}
          />
          <span>{firstScore}</span>
          <span>{secondScore}</span>
          <PlayerLabel
            name={name2}
            moveStatus={moveStatus}
          />
        </div>
        <span className={moveStatus === `${name1} plays` ? s.statusP1 : s.statusP2}>{moveStatus}</span>
        <div className={s.root}>
          {matrix.map((symbol, i) => (
            <Cell
              content={symbol}
              index={i}
              onClick={() => handleCellClick(i)}
            />
          ))}
        </div>
        {gameOver && <div className={s.footer}>
          <span>Congrats {moveStatus === `${name2} plays` ? name1 : name2}, you won the game!</span>
          <button className={s.button} onClick={startOver}>Start over</button>
        </div>}
        {draw && <div className={s.footer}>
          <span>This is a draw, try your luck again!</span>
          <button className={s.button} onClick={startOver}>Start over</button>
        </div>}
      </div>
  );
}

export default App;
