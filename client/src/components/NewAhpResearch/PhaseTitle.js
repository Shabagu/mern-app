

import style from "./PhaseTitle.module.scss"


export const PhaseTitle = ({
  phase,
  phasesDone,
  nextPhase,
  previousPhase
}) => {

  const PHASE_TITLES = [
    'Выбор критериев и альтернатив',
    'Попарное сравнение критериев',
    'Весовой столбец критериев по цели',
    'Попарное сравнение альтернатив по критериям',
    'Весовые столбцы альтернатив по критериям',
    'Расчитанные веса',
    'Глобальные веса альтернатив',
  ]

  const nextPhaseHandler = () => {
    nextPhase()
  }
  const previousPhaseHandler = () => {
    previousPhase()
  }

  return(
    <div className={style.title_box}>
      <div>
        <span
          className="waves-effect waves-light btn"
          onClick={previousPhaseHandler}
          disabled={phase <= 0}
        >
          <i className="material-icons">navigate_before</i>
        </span>
      </div>
      <div>
        <h4 className={style.title}>{PHASE_TITLES[phase]}</h4>
      </div>
      <div>
        <span
          className="waves-effect waves-light btn NEXT_PHASE_TITLE_BUTTON"
          onClick={nextPhaseHandler}
          disabled={phase >= 8 || phasesDone <= phase}
        >
          <i className="material-icons">navigate_next</i>
        </span>
      </div>
    </div>
  )
}
