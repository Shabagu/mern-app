import { useEffect } from "react"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./GroupsWeights.module.scss"


export const GroupsWeights = ({
  
  goToPhase,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

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
