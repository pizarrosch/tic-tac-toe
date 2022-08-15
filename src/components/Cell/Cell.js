import s from "./Cell.module.css"
import circleImg from '../../images/circle.svg';
import crossImg from '../../images/cross.png';
import cx from 'classnames';

function Cell({content, onClick, isWinning}) {
    return (
        <div
            className={cx(
                s.div,
                isWinning && s.cellCheckedCross
            )}
            onClick={onClick}
        >
            {content && <img
                src={content === 'circle' ? circleImg : crossImg}
                alt='symbol'
                className={content === 'circle' ? s.circle : s.image}
            />}
        </div>
    )
}


export default Cell;