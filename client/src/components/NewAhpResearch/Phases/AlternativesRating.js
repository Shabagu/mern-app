import { useEffect } from "react"
import { useMessage } from "../../../hooks/message.hook" 
import { DEFAULT_BUTTON_COLOR } from "../../../pages/ahp/NewResearchPage"

import style from "./AlternativesRating.module.scss"


export const AlternativesRating = ({

  // previousPhase,
  // nextPhase,
  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  useEffect(() => {
    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR
  }, [])

  return(
    <div className={style.phase_container}>
      <p>Попарное сравнение альтернатив по критериям</p>
      <Menu
        // nextPhase={nextPhase}
        // previousPhase={previousPhaseHandler}
        goToPhase={goToPhase}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const Menu = ({
  // nextPhase,
  // previousPhase,
  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  const message = useMessage()



  const goToCriteriaRating = () => {
    goToPhase(1)
  }

  const goToGlobalAlternatives = () => {
    // globalStateSetter()

    phaseDone(6)
    goToPhase(6)
    message('Исследование завершено!')
  }

  const goToAlternativesWeights = () => {
    // globalStateSetter()

    if (phasesDone < 4) {
      phaseDone(4)
    }
    goToPhase(4)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToCriteriaRating}>
          &nbsp;&lt;&lt;&lt;&nbsp;&nbsp;Назад
        </button>
        <button className="btn" onClick={goToAlternativesWeights}>
          Веса альт.&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
        <button className="btn"
          onClick={goToGlobalAlternatives}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
