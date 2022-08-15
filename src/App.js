import Cell from "./components/Cell/Cell";
import s from "./App.module.css"
import {useEffect, useState} from "react";
import PlayerLabel from "./components/PlayerLabel/PlayerLabel";
import NameInput from "./components/NameInput/NameInput";
import cx from 'classnames';

const winCombinations = {
  0: [1, 2, 3],
  1: [4, 5, 6],
  2: [7, 8, 9],
  3: [1, 4 ,7],
  4: [2, 5, 8],
  5: [3, 6, 9],
  6: [1, 5, 9],
  7: [3, 5, 7]
}

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
  const [winCells, setWinCells] = useState([]);

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


  console.log(winCells)

  function checkGameOver() {
    // Refactor this to use the winning combinations variable
    const result = [
      checkLine(1, 2, 3),
      checkLine(4, 5, 6),
      checkLine(7, 8, 9),
      checkLine(1, 4, 7),
      checkLine(2, 5, 8),
      checkLine(3, 6, 9),
      checkLine(1, 5, 9),
      checkLine(3, 5, 7)
    ];

    const index = result.findIndex((item) => item === true);

    if (result.includes(true)) {

      setGameOver(true);
      setWinCells(winCombinations[index]);

      if (moveStatus === `${name2} plays`) {
        setFirstScore(firstScore + 1)
      } else if (moveStatus === `${name1} plays`) {
        setSecondScore(secondScore + 1)
      }
    } else if (!matrix.includes(null) && !result.includes(true)) {
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

  function startOver() {
    setMatrix([
      null, null, null,
      null, null, null,
      null, null, null
    ]);
    setGameOver(false);
    setDraw(false);
    setMoveStatus(`${name1} plays`);
    setWinCells([]);
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
              onClick={() => handleCellClick(i)}
              isWinning={winCells.includes(i+1)}
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
