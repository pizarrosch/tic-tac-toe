import s from "./Cells.module.css"

function ticTacToe({
  content,
  onAddCross,
  onAddCircle
  }) {
  return (
    <>
      <div className={s.div} onClick={onAddCross}><span>{content}</span></div>
    </>
  )
}

export default ticTacToe;