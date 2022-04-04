import { useState, useEffect } from "react"
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
    constructor(alternatives, weight) {
      this.alternatives = alternatives
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < alternatives.length; i++) {
    defaultWeights[i] = new Weight(alternatives[i], globalWeights[i])
  }
  
  const DEFAULT_WEIGHTS = defaultWeights
  const SORTED_WEIGHTS = weightsSorting([...defaultWeights])

  const [displayingWeights, setDisplayingWeights] = useState(SORTED_WEIGHTS)
  const [isWeightsSorted, setIsWeightsSorted] = useState(true)

  const displayingWeightsSetter = (arr) => {
    setDisplayingWeights(arr)
  }

  const isWeightsSortedSetter = (condition) => {
    setIsWeightsSorted(condition)
  }

  return(
    <div className={style.phase_container}>
      <GlobalWeightsTable
        displayingWeights={displayingWeights}
        displayingWeightsSetter={displayingWeightsSetter}
        isWeightsSorted={isWeightsSorted}
        isWeightsSortedSetter={isWeightsSortedSetter}
        defaultWeights={DEFAULT_WEIGHTS}
        sortedWeights={SORTED_WEIGHTS}
      />
      <Menu
        goToPhase={goToPhase}
      />
    </div>
  )
}

const GlobalWeightsTable = ({
  displayingWeights,
  displayingWeightsSetter,
  isWeightsSorted,
  isWeightsSortedSetter,
  defaultWeights,
  sortedWeights,
}) => {

  const alternativesSortingHandler = () => {
    const sortButton = document.getElementById('globalsSortButtonIcon')
    if (!isWeightsSorted) {
      displayingWeightsSetter(sortedWeights)
      isWeightsSortedSetter(true)
      sortButton.textContent = 'low_priority'
    } else {
      displayingWeightsSetter(defaultWeights)
      isWeightsSortedSetter(false)
      sortButton.textContent = 'swap_vert'
    }
  }

  return(
    <table className={style.global_weights_table}>
      <colgroup>
        <col className={style.first} />
      </colgroup>
      <thead>
        <tr>
          <th className={style.heading} colSpan={3}>
            <div className={style.button}>
              <span className="btn waves-effect waves-light"
                onClick={alternativesSortingHandler}
              >
                <i className="material-icons" id="globalsSortButtonIcon">low_priority</i>
              </span>
            </div>
            Глобальные веса альтернатив
          </th>
        </tr>
        <tr>
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
            <td title={displayingWeights[i].alternatives}>
              <div className={style.container}>
                {displayingWeights[i].alternatives}
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
