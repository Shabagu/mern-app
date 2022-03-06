import style from "./AhpQState.module.scss"


export const AhpQState = ({ phase, criteria, alternatives }) => {

  return(
    <div className={style.panel}>

      <div>Этап: {phase}</div>
      <div>Критерии: {criteria}</div>
      <div>Альтернативы: {alternatives}</div>
    </div>
  )
}
