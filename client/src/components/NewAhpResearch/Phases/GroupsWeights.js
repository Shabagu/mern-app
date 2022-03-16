import { useEffect } from "react"
import { DEFAULT_BUTTON_COLOR } from "../../../pages/ahp/NewResearchPage"

import style from "./GroupsWeights.module.scss"


export const GroupsWeights = ({
  
  goToPhase,
}) => {

  useEffect(() => {
    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR
  }, [])

  return(
    <div className={style.phase_container}>
      <p>Определение глобальных весов альтернатив</p>
      <Menu
        goToPhase={goToPhase}
      />
    </div>
  )
}

const Menu = ({
  goToPhase,
}) => {

  const goToGlobalWeights = () => {
    goToPhase(6)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToGlobalWeights} style={{marginBottom: '40px'}}>
          Глобальные веса
        </button>
      </div>
    </div>
  )
}
