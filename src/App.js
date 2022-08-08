import Cells from "./components/Cells/Cells";
import s from "./App.module.css"
import {useState} from "react";
import Cross from "./components/images/close.png"
import Circle from "./components/images/rec.png"
import MoveStatus from "./components/moveStatus/moveStatus";

function App() {
  const [firstScore, setFirstScore] = useState(0);
  const [secondScore, setSecondScore] = useState(0);
  const [cell, setCell] = useState(null);
  const [moveStatus, setMoveStatus] = useState(null);
  const [name1, setName1] = useState('Player 1');
  const [name2, setName2] = useState('Player 2');

  function addCross() {
    setCell(<img
        src={Cross}
        alt="Cross"
      />);
  }

  function addCircle() {
    setCell(<img
      src={Circle}
      alt="Circle"
    />);
  }

  function startOver() {
    setName1('Timur');
    setName2('Zaur');
    setMoveStatus('Your move');
  }

  return (
    <div className={s.App}>
      <div className={s.namesAndScore}>
        <MoveStatus
          name={name1}
          status={moveStatus}
        />
        <span>{firstScore}</span>
        <span>{secondScore}</span>
        <MoveStatus
          name={name2}
          status={moveStatus}
        />
      </div>
      <div className={s.root}>
       <Cells
        content={cell}
        onAddCross={addCross}
       />
       <Cells
       />
       <Cells/>
       <Cells/>
       <Cells/>
       <Cells/>
       <Cells/>
       <Cells/>
       <Cells/>
      </div>
      <button className={s.button} onClick={startOver}>Start over</button>
    </div>
  );
}

export default App;
