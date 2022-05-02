import { useState, useEffect } from "react"
import { useMessage } from "../../../hooks/message.hook"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./AlternativesWeights.module.scss"


export const AlternativesWeights = ({
  criteria,
  alternatives,
  alternativesNormMTX,
  alternativesWeights,

  goToPhase,
  phaseDone,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  class Weight {
    constructor(alternatives, weight) {
      this.alternatives = alternatives
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let cr = 0; cr < criteria.length; cr++) {
    defaultWeights[cr] = []
    for (let i = 0; i < alternatives.length; i++) {
      defaultWeights[cr][i] = new Weight(alternatives[i], alternativesWeights[cr][i])
    }
  }

  let sortedWeights = []
  for (let cr = 0; cr < criteria.length; cr++) {
    sortedWeights[cr] = alternativesSorting([...defaultWeights[cr]])
  }

  const DEFAULT_WEIGHTS = defaultWeights
  const SORTED_WEIGHTS = sortedWeights

  const [displayingWeights, setDisplayingWeights] = useState(DEFAULT_WEIGHTS)
  const [isWeightsSorted, setIsWeightsSorted] = useState(false)

  const displayingWeightsSetter = (arr) => {
    setDisplayingWeights(arr)
  }

  const isWeightsSortedSetter = (condition) => {
    setIsWeightsSorted(condition)
  }

  const [currentCriterion, setCurrentCriterion] = useState(0)

  const currentCriterionSetter = (criterion) => {
    setCurrentCriterion(criterion)
  }

  return(
    <div className={style.phase_container}>
      <div className={style.tables_container}>
        <NormalizationTable
          currentCriterion={currentCriterion}
          alternatives={alternatives}
          alternativesNormMTX={alternativesNormMTX}
        />
        <WeightsTable
          cc={currentCriterion}
          displayingWeights={displayingWeights}
          displayingWeightsSetter={displayingWeightsSetter}
          isWeightsSorted={isWeightsSorted}
          isWeightsSortedSetter={isWeightsSortedSetter}
          defaultWeights={DEFAULT_WEIGHTS}
          sortedWeights={SORTED_WEIGHTS}
        />
      </div>
      <Menu
        criteria={criteria}
        currentCriterion={currentCriterion}
        currentCriterionSetter={currentCriterionSetter}

        goToPhase={goToPhase}
        phaseDone={phaseDone}
      />
    </div>
  )
}

const NormalizationTable = ({ currentCriterion, alternatives, alternativesNormMTX }) => {
  return(
    <table className={style.alternatives_normalization_table}>
    <thead>
      <tr>
        <th className={style.heading} colSpan={alternatives.length + 1}>
          Нормированная матрица
        </th>
      </tr>
      <tr>
        <th className={style.initial}></th>
        {[...Array(alternatives.length)].map((x, i) =>
          <th key={i} title={alternatives[i]}>
            {alternatives[i]}
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      {[...Array(alternatives.length)].map((x, i) =>
        <NormalizationCellRow
          key={i}
          i={i}
          currentCriterion={currentCriterion}
          alternatives={alternatives}
          alternativesNormMTX={alternativesNormMTX}
        />
      )}
    </tbody>
  </table>
  )
}

const NormalizationCellRow = ({ currentCriterion, alternatives, i, alternativesNormMTX }) => {
  return(
    <tr>
      <th title={alternatives[i]}>
        {alternatives[i]}
      </th>
      {[...Array(alternatives.length)].map((x, j) => {
        if (i < alternatives.length) return (
          <NormalizationCell
            key={j}
            cc={currentCriterion}
            row={i}
            col={j}
            alternativesNormMTX={alternativesNormMTX}
          />
        )
        else return(null)
      })}
    </tr>
  )
}

const NormalizationCell = ({ cc, row, col, alternativesNormMTX }) => {
  return(
    <td>
      <span>
        {valAdduction(alternativesNormMTX[cc][row][col])}
      </span>
    </td>
  )
}



const WeightsTable = ({
  cc,
  displayingWeights,
  displayingWeightsSetter,
  isWeightsSorted,
  isWeightsSortedSetter,
  defaultWeights,
  sortedWeights,
}) => {

  const alternativesSortingHandler = () => {
    const sortButton = document.getElementById('AlternativesSortButtonIcon')
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
    <table className={style.alternatives_weights_table}>
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
                <i className="material-icons" id="AlternativesSortButtonIcon">swap_vert</i>
              </span>
            </div>
            Весовой столбец альтернатив
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
        {[...Array(displayingWeights[cc].length)].map((x, i) =>
          <tr key={i}>
            <td title={displayingWeights[cc][i].alternatives}>
              <div className={style.container}>
                {displayingWeights[cc][i].alternatives}
              </div>
            </td>
            <td>{valAdduction(displayingWeights[cc][i].weight)}</td>
            <td>{percentsDisplay(displayingWeights[cc][i].weight)}</td>
          </tr>
        )}
      </tbody>
    </table>
   )
}






const Menu = ({
  criteria,
  currentCriterion,
  currentCriterionSetter,

  goToPhase,
  phaseDone,
}) => {

  const message = useMessage()

  useEffect(() => {
    const firstCriterionCheckbox = document.querySelector('input[name="criteria"]:first-child')
    firstCriterionCheckbox.checked = true
  }, [])

  const changeCriterionHandler = (criterion) => {
    currentCriterionSetter(criterion)
  }

  const goToAlternativesRating = () => {
    goToPhase(3)
  }

  const goToGlobalAlternatives = () => {
    phaseDone(6)
    goToPhase(6)
    message('Исследование завершено!')
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
        <span className={style.current_criterion} title={criteria[currentCriterion]}>
          {criteria[currentCriterion]}
        </span>
      </div>
      <div className={style.middle}>
        {[...Array(criteria.length)].map((x, i) =>
          <label key={i} title={criteria[i]}>
            <input
              type="radio"
              name="criteria"
              className="with-gap"
              onChange={(e) => changeCriterionHandler(i, e)}
            />
            <span>{criteria[i]}</span>
          </label>
        )}
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToAlternativesRating}>
          Назад
          <i className="material-icons right">fast_rewind</i>
        </button>
        <button className="btn" onClick={goToGlobalAlternatives}>
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
const alternativesSorting = (weights) => {
  weights.sort((a, b) => {
    if (a.weight > b.weight) return -1
    if (a.weight < b.weight) return 1
    return 0
  })
  return weights
}
