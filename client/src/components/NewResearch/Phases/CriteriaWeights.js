import { useState, useEffect } from "react"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./CriteriaWeights.module.scss"


export const CriteriaWeights = ({
  criteria,
  criteriaNormMTX,
  criteriaWeights,

  goToPhase,
  phaseDone,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  class Weight {
    constructor(criteria, weight) {
      this.criteria = criteria
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < criteria.length; i++) {
    defaultWeights[i] = new Weight(criteria[i], criteriaWeights[i])
  }
  
  const DEFAULT_WEIGHTS = defaultWeights
  const SORTED_WEIGHTS = criteriaSorting([...defaultWeights])

  const [displayingWeights, setDisplayingWeights] = useState(DEFAULT_WEIGHTS)
  const [isWeightsSorted, setIsWeightsSorted] = useState(false)

  const displayingWeightsSetter = (arr) => {
    setDisplayingWeights(arr)
  }

  const isWeightsSortedSetter = (condition) => {
    setIsWeightsSorted(condition)
  }

  return(
    <div className={style.phase_container}>
      <div className={style.tables_container}>

        <NormalizationTable
          criteria={criteria}
          criteriaNormMTX={criteriaNormMTX}
        />
        <WeightsTable
          displayingWeights={displayingWeights}
          displayingWeightsSetter={displayingWeightsSetter}
          isWeightsSorted={isWeightsSorted}
          isWeightsSortedSetter={isWeightsSortedSetter}
          defaultWeights={DEFAULT_WEIGHTS}
          sortedWeights={SORTED_WEIGHTS}
        />

      </div>

      <Menu
        goToPhase={goToPhase}
        phaseDone={phaseDone}
      />
    </div>
  )
}

const NormalizationTable = ({ criteria, criteriaNormMTX }) => {
  return(
    <table className={style.criteria_normalization_table}>
      <thead>
        <tr>
          <th className={style.heading} colSpan={criteria.length + 1}>
            Нормированная матрица
          </th>
        </tr>
        <tr>
          <th className={style.initial}></th>
          {[...Array(criteria.length)].map((x, i) =>
            <th key={i} title={criteria[i]}>
              {criteria[i]}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {[...Array(criteria.length)].map((x, i) =>
          <NormalizationCellRow
            key={i}
            i={i}
            criteria={criteria}
            criteriaNormMTX={criteriaNormMTX}
          />
        )}
      </tbody>
    </table>
  )
}

const NormalizationCellRow = ({ criteria, i, criteriaNormMTX }) => {
  return(
    <tr>
      <th title={criteria[i]}>
        {criteria[i]}
      </th>
      {[...Array(criteria.length)].map((x, j) => {
        if (i < criteria.length) return (
          <NormalizationCell
            key={j}
            row={i}
            col={j}
            criteriaNormMTX={criteriaNormMTX}
          />
        )
        else return(null)
      })}
    </tr>
  )
}

const NormalizationCell = ({ row, col, criteriaNormMTX }) => {
  return(
    <td>
      <span>
        {valAdduction(criteriaNormMTX[row][col])}
      </span>
    </td>
  )
}



const WeightsTable = ({
  displayingWeights,
  displayingWeightsSetter,
  isWeightsSorted,
  isWeightsSortedSetter,
  defaultWeights,
  sortedWeights,
}) => {

  const criteriaSortingHandler = () => {
    const sortButton = document.getElementById('criteriaSortButtonIcon')
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
    <table className={style.criteria_weights_table}>
      <colgroup>
        <col className={style.first} />
      </colgroup>
      <thead>
        <tr>
          <th className={style.heading} colSpan={3}>
            <div className={style.button}>
              <span className="btn waves-effect waves-light"
                onClick={criteriaSortingHandler}
              >
                <i className="material-icons" id="criteriaSortButtonIcon">swap_vert</i>
              </span>
            </div>
            Весовой столбец критериев
          </th>
        </tr>
        <tr>
          <th className={style.subheading}>
            Критерий
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
            <td title={displayingWeights[i].criteria}>
              <div className={style.container}>
                {displayingWeights[i].criteria}
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
  phaseDone,
}) => {

  const goToCriteriaRating = () => {
    goToPhase(1)
  }

  const goToAlternativesRating = () => {
    phaseDone(3)
    goToPhase(3)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToCriteriaRating}>
          Назад
          <i className="material-icons right">fast_rewind</i>
        </button>
        <button className="btn" onClick={goToAlternativesRating}>
          Продолжить
          <i className="material-icons right">fast_forward</i>
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
const criteriaSorting = (weights) => {
  weights.sort((a, b) => {
    if (a.weight > b.weight) return -1
    if (a.weight < b.weight) return 1
    return 0
  })
  return weights
}
