

import style from "./N2CriteriaWeights.module.scss"


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

        <NormalizationTable criteria={criteria} criteriaNormMTX={criteriaNormMTX} />
        <WeightsTable criteria={criteria} criteriaWeights={criteriaWeights} />

      </div>

      <Menu
        nextPhase={nextPhaseHandler}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
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



const WeightsTable = ({ criteria, criteriaWeights}) => {
   return(
    <table className={style.criteria_weights_table}>
      <colgroup>
        <col className={style.first} />
      </colgroup>
      <thead>
        <tr>
          <th className={style.heading} colSpan={3}>
            <div className={style.button}>
              <span className="btn waves-effect waves-light ">
                <i className="material-icons">swap_vert</i>
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
        {[...Array(criteria.length)].map((x, i) =>
          <tr key={i}>
            <td title={criteria[i]}>
              <div className={style.container}>
                {criteria[i]}
              </div>
            </td>
            <td>{valAdduction(criteriaWeights[i])}</td>
            <td>{percentsDisplay(criteriaWeights[i])}</td>
          </tr>
        )}
      </tbody>
    </table>
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
    <div className={style.menu}>
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

// Отображние весов в процентах
const percentsDisplay = (value) => {
  value = value * 100
  value = value.toFixed(1)
  value = value * 1
  value = `${value}%`
  return (value)
}
