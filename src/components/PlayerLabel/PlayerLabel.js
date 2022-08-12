import s from "./PlayerLabel.module.css"


function playerLabel({name, content}) {
  return (
    <div className={s.statusContainer}>
      <span
        className={name === content ? s.name1 : s.name2}>{name}</span>
    </div>
  )
}

export default playerLabel;