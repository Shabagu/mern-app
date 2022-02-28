import { useHistory } from "react-router-dom"

import {
  resetHandler,
  randomGenerationHandler,
  criteriaSumCalculation,


} from './../../pages/AhpQCriteriaComparisonPage'

import style from './../../style/AhpSidebar.module.scss'

export const AhpSidebar = () => {

  const history = useHistory()

  // Функция перевыбора критериев и альтернатив
  const reselectionHandler = async () => {
    history.push('/ahp/query/selection')
  }

  const normalizationhandler = async () => {
    history.push('/ahp/query/criterianormalization')
  }

  return(
    <div className={style.sidebar}>
      <div className={style.top}>
        <button className="btn"
          onClick={reselectionHandler}>Перевыбор</button>
        <button className="btn"
          onClick={resetHandler}>Сброс</button>
        <button className="btn"
          onClick={randomGenerationHandler}>Случ. значения</button>
      </div>
      <div className={style.bottom}>
        <button className="btn calculation"
          onClick={criteriaSumCalculation}>Посчитать суммы</button>
        <button className="btn normalization disabled"
          onClick={normalizationhandler}>Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;</button>
      </div>
    </div>
  )
}
