import { useEffect } from "react"
import { DEFAULT_BUTTON_COLOR, HOT_CHANGES_BUTTON_COLOR, HOT_CHANGES_HANDLER } from "../pages/AhpPage"


import style from "./StyleAhpQPhases.module.scss"


export const AhpQPhaseN4AlternativesRating = ({

    nextPhase,
    phaseDone,
    phasesDone,
  }) => {

  useEffect(() => {
    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR
  }, [DEFAULT_BUTTON_COLOR])

  const nextPhaseHandler = () => {
    nextPhase()
  }

  return(
    <div className={style.phase_container}>
      <p>Попарное сравнение альтернатив по критериям</p>
      <Menu
        nextPhase={nextPhaseHandler}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const Menu = ({

    nextPhase,
    phasesDone,
    phaseDone,
  }) => {

  const continueHandler = () => {

    if (phasesDone <= 4) {
      phaseDone()
    }

    nextPhase()
  }

  return(
    <div className={style.panel}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn"
          onClick={continueHandler}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
