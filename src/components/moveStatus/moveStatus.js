import s from "./moveStatus.module.css"


function moveStatus({name, status}) {
  return (
    <div className={s.statusContainer}>
      <span className={s.names}>{name}</span>
      <span className={s.status}>{status}</span>
    </div>
  )
}

export default moveStatus;