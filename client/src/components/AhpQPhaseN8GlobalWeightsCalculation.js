import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { DEFAULT_BUTTON_COLOR, HOT_CHANGES_BUTTON_COLOR, HOT_CHANGES_HANDLER } from "../pages/AhpPage"


import style from "./StyleAhpQPhases.module.scss"


export const AhpQPhaseN8GlobalWeightsCalculation = ({

  }) => {

  useEffect(() => {
    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR
  }, [DEFAULT_BUTTON_COLOR])

  return(
    <div className={style.phase_container}>
      <p>Глобальные веса альтернатив</p>
      <Menu

      />
    </div>
  )
}

const Menu = ({


  }) => {

  const history = useHistory()

  function save() {
    alert('Результаты сохранены!')
    history.push('/myqueries')
  }

  return(
    <div className={style.panel}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn"
          onClick={save}
        >
          Сохранить
        </button>
      </div>
    </div>
  )
}
