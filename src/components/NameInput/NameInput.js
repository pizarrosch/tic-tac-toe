import s from './NameInput.module.css'


function NameInput({
   onFirstInputChange,
   onSecondInputChange,
   content1,
   content2,
   onKeyDown,
   handleButtonClick
 }) {

  return (
    <div>
      <div className={s.root}>
        <input
          className={s.input}
          placeholder='Type your name'
          onChange={onFirstInputChange}
          value={content1}
        />
          <input
            className={s.input}
            placeholder='Type your name and press Enter'
            onChange={onSecondInputChange}
            value={content2}
            onKeyDown={onKeyDown}
          />
        <button
          className={s.button}
          onClick={handleButtonClick}
        >Register!</button>
      </div>

    </div>
  )
}

export default NameInput;