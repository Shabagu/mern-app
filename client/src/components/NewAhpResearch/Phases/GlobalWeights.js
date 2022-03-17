import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useMessage } from "../../../hooks/message.hook"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./GlobalWeights.module.scss"


export const GlobalWeights = ({
  goToPhase,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  return(
    <div className={style.phase_container}>
      <p>Глобальные веса альтернатив</p>
        <Menu
          goToPhase={goToPhase}
        />
    </div>
  )
}

const Menu = ({
  goToPhase,
}) => {

  const history = useHistory()
  const message = useMessage()

  const save = () => {
    message('Результаты сохранены!')
    history.push('/researches')
  }

  const goToGroupsWeights = () => {
    goToPhase(5)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToGroupsWeights}>
          Другие веса
        </button>
        <button className="btn" onClick={save}>
          Сохранить
        </button>
      </div>
    </div>
  )
}
