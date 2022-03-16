import { useHistory } from "react-router-dom"

import style from "./GlobalWeights.module.scss"


export const GlobalWeights = () => {

  return(
    <div className={style.phase_container}>
      <p>Глобальные веса альтернатив</p>
      <Menu

      />
    </div>
  )
}

const Menu = () => {

  const history = useHistory()

  function save() {
    alert('Результаты сохранены!')
    history.push('/researches')
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
