import { useState } from "react"
import { HintPopup } from "./HintPopup"

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
    'Веса критериев и альтернатив',
    'Глобальные веса альтернатив',
  ]

  const [popupActive, setPopupActive] = useState(false)

  const popup = () => {
    setPopupActive(true)
  }

  const nextPhaseHandler = () => {
    nextPhase(1)
  }
  const previousPhaseHandler = () => {
    previousPhase(1)
  }

  return(
    <div className={style.title_box}>
      <div>
        <span
          className="waves-effect waves-light btn"
          onClick={previousPhaseHandler}
          disabled={phase <= 0}
          title={PHASE_TITLES[phase - 1]}
        >
          <i className="material-icons">navigate_before</i>
        </span>
      </div>
      <div className={style.title_subbox}>
        <div>
          <h4 className={style.title}>{PHASE_TITLES[phase]}</h4>
        </div>
        <div className={style.help}>
          <span
            className="waves-effect waves-light btn"
            onClick={popup}
            title="Помощь"
          >
            <i className="material-icons">help_outline</i>
          </span>
        </div>
      </div>
      <div>
        <span
          className="waves-effect waves-light btn NEXT_PHASE_TITLE_BUTTON"
          onClick={nextPhaseHandler}
          disabled={phase >= 6 || phasesDone <= phase}
          title={PHASE_TITLES[phase + 1]}
        >
          <i className="material-icons">navigate_next</i>
        </span>
      </div>
      <HintPopup
        phase={phase}
        active={popupActive}
        setActive={setPopupActive}
      />
    </div>
  )
}
