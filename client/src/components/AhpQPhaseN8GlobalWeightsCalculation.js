import { useHistory } from "react-router-dom"
import style from "./AhpQPhases.module.scss"


export const AhpQPhaseN8GlobalWeightsCalculation = ({

  }) => {

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
    history.push('/ahpinfo')
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
