import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useMessage } from "../../../hooks/message.hook"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./GlobalWeights.module.scss"


export const GlobalWeights = ({
  alternatives,
  globalWeights,

  goToPhase,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  class Weight {
    constructor(alternative, weight) {
      this.alternative = alternative
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < alternatives.length; i++) {
    defaultWeights[i] = new Weight(alternatives[i], globalWeights[i])
  }
  
  const sortedGlobalWeights = weightsSorting([...defaultWeights])


  return(
    <div className={style.phase_container}>
      <div className={style.tables_container}>
        <GlobalWeightsTable
          displayingWeights={sortedGlobalWeights}
        />
        <GlobalWeightsChart
          weights={sortedGlobalWeights}
        />
      </div>
      <Menu
        goToPhase={goToPhase}
      />
    </div>
  )
}

const GlobalWeightsTable = ({
  displayingWeights,
}) => {

  return(
    <table className={style.global_weights_table}>
      <colgroup>
        <col className={style.first} />
        <col className={style.second} />
      </colgroup>
      <thead>
        <tr>
          <th className={style.heading} colSpan={4}>
            Глобальные веса альтернатив
          </th>
        </tr>
        <tr>
          <th className={style.subheading}>
            Ранг
          </th>
          <th className={style.subheading}>
            Альтернатива
          </th>
          <th className={style.subheading}>
            Вес (в долях)
          </th>
          <th className={style.subheading}>
            Вес (в %)
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(displayingWeights.length)].map((x, i) =>
          <tr key={i}>
            <td className={style.top_alternative_cell}>
              {i === 0 && <i className="material-icons" id={style.top_alternative}>whatshot</i>}
              {i + 1}
            </td>
            <td title={displayingWeights[i].alternative}>
              <div className={style.container}>
                {displayingWeights[i].alternative}
              </div>
            </td>
            <td>{valAdduction(displayingWeights[i].weight)}</td>
            <td>{percentsDisplay(displayingWeights[i].weight)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const GlobalWeightsChart = ({
  weights,
}) => {
  return(
    <div className={style.global_weights_chart}>
      <p>График</p>
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

// Приведение значений 
const valAdduction = (value) => {
  value = value.toFixed(3)
  value = value * 1
  return(value)
}

// Отображние весов в процентах
const percentsDisplay = (value) => {
  value = value * 100
  value = value.toFixed(1)
  value = value * 1
  value = `${value}%`
  return (value)
}

// Сортировка критериев по значимости
const weightsSorting = (weights) => {
  weights.sort((a, b) => {
    if (a.weight > b.weight) return -1
    if (a.weight < b.weight) return 1
    return 0
  })
  return weights
}
