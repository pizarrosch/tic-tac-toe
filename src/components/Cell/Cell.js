import s from "./Cell.module.css"
import circleImg from '../../images/circle.svg';
import crossImg from '../../images/cross.png';

function Cell({content, onClick}) {
  return (
    <div className={s.div} onClick={onClick}>
      {content && <img
        src={content === 'circle' ? circleImg : crossImg}
        alt='symbol'
        className={content === 'circle' ? s.circle : s.image}
      />}
    </div>
  )
}

export default Cell;