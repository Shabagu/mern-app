import style from "./AhpQState.module.scss"


export const AhpQState = ({ phase }) => {

  return(
    <div className={style.panel}>

      <div>Этап: {phase}</div>
    </div>
  )
}
