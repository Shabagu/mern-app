

import style from "./Phases.module.scss"


export const N2CriteriaWeights = ({
  criteria,
  criteriaNormMTX,
  criteriaWeights,

  nextPhase,
  phaseDone,
  phasesDone,
}) => {

  const nextPhaseHandler = () => {
    nextPhase()
  }

  return(
    <div className={style.phase_container}>
      <div className={style.tables_container}>
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
              <CellRow
                key={i}
                i={i}
                criteria={criteria}
                criteriaNormMTX={criteriaNormMTX}
              />
            )}
          </tbody>
        </table>
        <table className={style.criteria_weights_table}>
          <thead>
            <tr>
              <th className={style.heading} colSpan="2">
                Весовой столбец критериев
              </th>
            </tr>
            <tr>
              <th className={style.subheading}>
                Вес (в долях)
              </th>
              <th className={style.subheading}>
                Вес (в %)
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(criteria.length)].map((x, i) =>
              <tr>
                <td>{criteriaWeights[i].toFixed(3)}</td>
                <td>{i+1}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Menu
        nextPhase={nextPhaseHandler}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const CellRow = ({ criteria, i, criteriaNormMTX }) => {
  return(
    <tr>
      <th title={criteria[i]}>
        {criteria[i]}
      </th>
      {[...Array(criteria.length)].map((x, j) => {
        if (i < criteria.length) return (
          <Cell
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

const Cell = ({ row, col, criteriaNormMTX }) => {
  return(
    <td>
      <div className={style.stretcher}>
        <span>
          {valAdduction(criteriaNormMTX[row][col])}
        </span>
      </div>
    </td>
  )
}

const Menu = ({
  nextPhase,
  phasesDone,
  phaseDone,
}) => {

  const continueHandler = () => {

    if (phasesDone <= 2) {
      phaseDone()
    }
    nextPhase()
  }

  return(
    <div className={style.panel}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={continueHandler}>
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
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
