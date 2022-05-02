import { useState, useEffect } from "react"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./GroupsWeights.module.scss"


export const GroupsWeights = ({
  criteria,
  criteriaWeights,
  alternatives,
  alternativesWeights,
  
  goToPhase,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  const [percentageDisplay, setPercentageDisplay] = useState(false)

  const percentageDisplaySetter = (condition) => {
    setPercentageDisplay(condition)
  }

  return(
    <div className={style.phase_container}>
      <div className={style.tables_container}>
        <CriteriaWeightsTable
          criteria={criteria}
          criteriaWeights={criteriaWeights}
          percentageDisplay={percentageDisplay}
        />
        <AlternativesWeightsTable
          criteria={criteria}
          alternatives={alternatives}
          alternativesWeights={alternativesWeights}
          percentageDisplay={percentageDisplay}
        />
      </div>
      <Menu
        percentageDisplay={percentageDisplay}
        percentageDisplaySetter={percentageDisplaySetter}
        goToPhase={goToPhase}
      />
    </div>
  )
}

const CriteriaWeightsTable = ({
  criteria,
  criteriaWeights,
  percentageDisplay,
}) => {

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

  const sortedWeights = criteriaSorting([...defaultWeights])



  return(
    <table className={style.criteria_weights_table}>
      <thead>
        <tr>
          <th className={style.heading} colSpan={2}>
            Веса критериев
          </th>
        </tr>
        <tr>
          <th className={style.subheading}>
            Критерий
          </th>
          <th className={style.subheading}>
            Вес
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(sortedWeights.length)].map((x, i) =>
          <tr key={i}>
            <td title={sortedWeights[i].criteria}>
              <div className={style.container}>
                {sortedWeights[i].criteria}
              </div>
            </td>
            {percentageDisplay && <td>{percentsDisplay(sortedWeights[i].weight)}</td>}
            {!percentageDisplay && <td>{valAdduction(sortedWeights[i].weight)}</td>}
          </tr>
        )}
      </tbody>
    </table>
  )
}


const AlternativesWeightsTable = ({
  criteria,
  alternatives,
  alternativesWeights,
  percentageDisplay,
}) => {

  return(
    <table className={style.alternatives_weights_by_criteria}>
      <thead>
        <tr>
          <th className={style.heading} colSpan={criteria.length + 1}>
            Веса альтернатив по критериям
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
        {[...Array(alternatives.length)].map((x, i) =>
          <CellRow
            key={i}
            i={i}
            criteria={criteria}
            alternatives={alternatives}
            alternativesWeights={alternativesWeights}
            percentageDisplay={percentageDisplay}
          />
        )}
      </tbody>
    </table>
  )
}

const CellRow = ({ criteria, alternatives, i, alternativesWeights, percentageDisplay }) => {
  return(
    <tr>
      <th title={alternatives[i]}>
        {alternatives[i]}
      </th>
      {[...Array(criteria.length)].map((x, j) => {
        if (i < alternatives.length) return (
          <Cell
            key={j}
            row={j}
            col={i}
            alternativesWeights={alternativesWeights}
            percentageDisplay={percentageDisplay}
          />
        )
        else return(null)
      })}
    </tr>
  )
}

const Cell = ({ row, col, alternativesWeights, percentageDisplay }) => {
  return(
    <td>
      {percentageDisplay && <span>{percentsDisplay(alternativesWeights[row][col])}</span>}
      {!percentageDisplay && <span>{valAdduction(alternativesWeights[row][col])}</span>}
    </td>
  )
}






const Menu = ({
  percentageDisplay,
  percentageDisplaySetter,
  goToPhase,
}) => {

  const displayChangeHandler = () => {
    if (percentageDisplay) {
      percentageDisplaySetter(false)
    } else {
      percentageDisplaySetter(true)
    }
  }

  const goToGlobalWeights = () => {
    goToPhase(6)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
        <div className={style.switch}>
          <fieldset>
            <legend>Отображение</legend>
            <div className="switch">
              <label>
                Доли
                <input
                  type="checkbox"
                  onChange={displayChangeHandler}
                />
                <span className="lever" />
                %
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToGlobalWeights} style={{marginBottom: '40px'}}>
          Глобальные веса
        </button>
      </div>
    </div>
  )
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
