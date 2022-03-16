import { useEffect } from "react"
import { useMessage } from "../../../hooks/message.hook"
import { DEFAULT_BUTTON_COLOR } from "../../../pages/ahp/NewResearchPage"

import style from "./AlternativesWeights.module.scss"


export const AlternativesWeights = ({

  // nextPhase,
  // previousPhase,
  goToPhase,
  phaseDone,
  // phasesDone,
}) => {

  useEffect(() => {
    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR
  }, [])

  return(
    <div className={style.phase_container}>
      <p>Весовые столбцы альтернатив по критериям</p>
      <Menu
        // nextPhase={nextPhase}
        // previousPhase={previousPhase}
        goToPhase={goToPhase}
        phaseDone={phaseDone}
        // phasesDone={previousPhase}
      />
    </div>
  )
}

const Menu = ({
  // nextPhase,
  // previousPhase,
  goToPhase,
  phaseDone,
  // phasesDone,
}) => {

  const message = useMessage()

  // const continueHandler = () => {
  //   if (phasesDone <= 4) {
  //     phaseDone(1)
  //   }
  //   nextPhase(1)
  // }

  const goToAlternativesRating = () => {
    goToPhase(3)
  }

  const goToGlobalAlternatives = () => {
    phaseDone(6)
    goToPhase(6)
    message('Исследование завершено!')
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToAlternativesRating}>
          &nbsp;&lt;&lt;&lt;&nbsp;&nbsp;Назад
        </button>
        <button className="btn" onClick={goToGlobalAlternatives}>
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
