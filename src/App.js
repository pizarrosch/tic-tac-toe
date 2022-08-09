import Cell from "./components/Cell/Cell";
import s from "./App.module.css"
import {useState} from "react";
import MoveStatus from "./components/moveStatus/moveStatus";

function App() {
  const [firstScore, setFirstScore] = useState(0);
  const [secondScore, setSecondScore] = useState(0);
  const [moveStatus, setMoveStatus] = useState(1);
  const [name1, setName1] = useState('Player 1');
  const [name2, setName2] = useState('Player 2');

  const [matrix, setMatrix] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ]);

  function handleCellClick(cellIndex) {
    if(moveStatus === 1) {
      setMatrix([...matrix.map((item, i) => {
        console.log(cellIndex)
        if (i === cellIndex) {
          return 'cross';
        }
        return item;
      })])
    } else {
      setMatrix([...matrix.map((item) => item === null ? 'circle' : null)])
    }
  }

  function startOver() {
    setName1('Timur');
    setName2('Zaur');
  }



  return (
    <div className={s.App}>
      <div className={s.namesAndScore}>
        <MoveStatus
          name={name1}
          status={moveStatus}
          setStatus={setMoveStatus}
        />
        <span>{firstScore}</span>
        <span>{secondScore}</span>
        <MoveStatus
          name={name2}
          status={moveStatus}
        />
      </div>
      <div className={s.root}>
        {matrix.map((symbol, i) => (
          <Cell
            content={symbol}
            index={i}
            onClick={() => handleCellClick(i)}
          />
        ))}
      </div>
      <button className={s.button} onClick={startOver}>Start over</button>
    </div>
  );
}

export default App;
