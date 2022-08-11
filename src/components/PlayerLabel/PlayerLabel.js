import s from "./PlayerLabel.module.css"


function playerLabel({name}) {
  return (
    <div className={s.statusContainer}>
      <span
        className={name === 'Player 1' ? s.name1 : s.name2}>{name}</span>
    </div>
  )
}

export default playerLabel;