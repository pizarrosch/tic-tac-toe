import s from "./Cell.module.css"
import circleImg from '../../images/circle.png';
import crossImg from '../../images/cross.png';

function Cell({content, index, onClick}) {
  return (
    <div className={s.div} onClick={onClick}>
      {content && <img
        src={content === 'circle' ? circleImg : crossImg}
        alt='symbol'
      />}
    </div>
  )
}

export default Cell;