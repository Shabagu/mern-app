// import { useEffect } from "react"
import style from "./AhpQPhases.module.scss"

export const AhpQPhaseN2CriteriaNormalization = ({
    criteria,
    criteriaNormMTX,
    criteriaWeights,
    criteriaWeightsSetter,

    nextPhase,
    phaseDone,
    phasesDone,
  }) => {

  // useEffect({}, [])

  const nextPhaseHandler = () => {
    nextPhase()
  }

  return(
    <div className={style.phase_container}>
      <table className={style.criteria_normalization_table}>
        <thead>
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
        }
      )}
    </tr>
  )
}

const Cell = ({ row, col, criteriaNormMTX }) => {
  return(
    <td>
      <span className={`cell${row}${col}`}>
        {criteriaNormMTX[row][col].toFixed(4)}
      </span>
    </td>
  )
}

const Menu = ({
    criteriaMTX,
    criteriaNormMTXSetter,
    criteriaWeights,
    criteriaWeightsSetter,
    nextPhase,
    phasesDone,
    phaseDone,
  }) => {

  const continueHandler = () => {
    // let criteriaMTXModel = criteriaMTX
    // const n = criteriaMTX.length
    // const sum = sumCalculate(criteriaMTXModel, n)
    // const normalizedMtx = normalizeMtx(criteriaMTXModel, sum)
    // criteriaNormMTXSetter(normalizedMtx)

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
        <button className="btn"
          onClick={continueHandler}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
