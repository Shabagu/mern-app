import { useState } from 'react'
import style from './GroupsWeights.module.scss'

export const GroupsWeights = ({ research }) => {

  const [percentageDisplay, setPercentageDisplay] = useState(false)
  const percentageDisplaySetter = (condition) => setPercentageDisplay(condition)
  const displayChangeHandler = () => {
    if (percentageDisplay) {
      percentageDisplaySetter(false)
    } else {
      percentageDisplaySetter(true)
    }
  }

  return(
    <div className={style.groups_weights_container}>
      <CriteriaWeights
        research={research}
        percentageDisplay={percentageDisplay}
      />
      <AlternativesWeights
        research={research}
        percentageDisplay={percentageDisplay}
        displayChangeHandler={displayChangeHandler}
      />
    </div>
  )
}

const CriteriaWeights = ({ research, percentageDisplay }) => {

  class Weight {
    constructor(criteria, weight) {
      this.criteria = criteria
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < research.criteria.length; i++) {
    defaultWeights[i] = new Weight(research.criteria[i], research.criteriaWeights[i])
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



const AlternativesWeights = ({
  research,
  percentageDisplay,
  displayChangeHandler,
}) => {

  return(
    <>
      <div className={style.switch}>
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
      </div>
      <table className={style.alternatives_weights_by_criteria}>
        <thead>
          <tr>
            <th className={style.heading} colSpan={research.criteria.length + 1}>
              Веса альтернатив по критериям
            </th>
          </tr>
          <tr>
            <th className={style.initial}></th>
            {[...Array(research.criteria.length)].map((x, i) =>
              <th key={i} title={research.criteria[i]}>
                {research.criteria[i]}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(research.alternatives.length)].map((x, i) =>
            <CellRow
              key={i}
              i={i}
              criteria={research.criteria}
              alternatives={research.alternatives}
              alternativesWeights={research.alternativesWeights}
              percentageDisplay={percentageDisplay}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

const CellRow = ({ criteria, alternatives, i, alternativesWeights, percentageDisplay }) => {
  return(
    <tr>
      <th title={alternatives[i]}>
        <div>
          {alternatives[i]}
        </div>
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
      <div className={style.container}>
        {percentageDisplay && <span>{percentsDisplay(alternativesWeights[row][col])}</span>}
        {!percentageDisplay && <span>{valAdduction(alternativesWeights[row][col])}</span>}
      </div>
    </td>
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
