import { useEffect, useState } from "react"
import { DEFAULT_BUTTON_COLOR, HOT_CHANGES_BUTTON_COLOR, HOT_CHANGES_HANDLER } from "../pages/AhpPage"


import style from "./StyleAhpQPhases.module.scss"


export const AhpQPhaseN1CriteriaRating = ({
  criteria,
  criteriaMTX,
  criteriaMTXSetter,
  criteriaSum,
  criteriaSumSetter,
  criteriaNormMTXSetter,

  previousPhase,
  nextPhase,
  phaseDone,
  phasesDone,
}) => {

  const [localMTX, setLocalMTX] = useState(criteriaMTX)
  const [localSum, setLocalSum] = useState(criteriaSum)

  const localMTXSetter = (mtx) => {
    setLocalMTX(mtx)
  }
  const localSumSetter = (sum) => {
    setLocalSum(sum)
  }

  useEffect(() => {

    localMTXSetter(criteriaMTX)
    localSumSetter(criteriaSum)

    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR

  }, [criteriaMTX, criteriaSum])

  // const nextPhaseHandler = () => {
  //   nextPhase()
  // }
  // const previousPhaseHandler = () => {
  //   previousPhase()
  // }

  return(
    <div className={style.phase_container}>
      <table className={style.criteria_comparison_table}>
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
              localMTX={localMTX}
              localMTXSetter={localMTXSetter}
              localSumSetter={localSumSetter}
            />
          )}
        </tbody>
        <tfoot>
          <tr>
            <th className={style.sigma}>Σ</th>
            {[...Array(criteria.length)].map((x, i) =>
              <SumCell
                key={i}
                col={i}
                localSum={localSum}
              />
            )}
          </tr>
        </tfoot>
      </table>
      {/* <Menu
        // localMTX={localMTX}
        // localMTXSetter={localMTXSetter}
        // localSum={localSum}
        // localSumSetter={localSumSetter}

        // criteriaMTXSetter={criteriaMTXSetter}
        // criteriaSumSetter={criteriaSumSetter}

        // criteriaNormMTXSetter={criteriaNormMTXSetter}
        // nextPhase={nextPhaseHandler}
        // previousPhase={previousPhaseHandler}
        // phaseDone={phaseDone}
        // phasesDone={phasesDone}
      /> */}
    </div>
  )
}

const CellRow = ({
  i,
  criteria,
  localMTX,
  localMTXSetter,
  localSumSetter,
}) => {

  return(
    <tr>
      <th title={criteria[i]}>
        {criteria[i]}
      </th>
      {[...Array(criteria.length)].map((x, j) => {
        if (i < j) return (
          <InCell
            key={j}
            row={i}
            col={j}
            localMTX={localMTX}
            localMTXSetter={localMTXSetter}
            localSumSetter={localSumSetter}
          />
        )
        else if (i > j) return(
          <OutCell
            key={j}
            row={i}
            col={j}
            localMTX={localMTX}
          />
        )
        else if (i === j) return (
          <DiagonalCell
            key={j}
            row={i}
            col={j}
            localMTX={localMTX}
          />
        )
        else return(null)
      })}
    </tr>
  )
}

const InCell = ({
  row,
  col,
  localMTX,
  localMTXSetter,
  localSumSetter,
}) => {

  return(
    <td>
      <div className={style.cell}>
        <div className={style.value_box}>
          <span>
            {localMTX[row][col]}
          </span>
        </div>
        <div className={style.cell_tuning}>
          <div className={style.cell_tuning_left}>
            <TuningButton
              icon={'arrow_upward'}
              action={increaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
            />
            <TuningButton icon={'arrow_back'} />
          </div>
          <div className={style.cell_tuning_right}>
            <TuningButton icon={'keyboard_arrow_up'} />
            <TuningButton icon={'refresh'} />
            <TuningButton icon={'keyboard_arrow_left'} />
          </div>
        </div>
      </div>
    </td>
  )
}

const TuningButton = ({
  icon,
  action,
  row,
  col,
  mtx,
  mtxSetter,
}) => {

  return(
    <span
      className="btn waves-effect waves-light"
      onClick={(e) => action(mtx, row, col, mtxSetter, e)}
    >
      <i className="material-icons">{icon}</i>
    </span>
  )
}

const OutCell = ({
  row,
  col,
  localMTX,
}) => {

  return(
    <td className={style.below}>
      <span>
        {localMTX[row][col]}
      </span>
    </td>
  )
}

const DiagonalCell = ({
  row,
  col,
  localMTX,
}) => {

  return(
    <td className={style.diagonal}>
      <span>
        {localMTX[row][col]}
      </span>
    </td>
  )
}

const SumCell = ({
  col,
  localSum
 }) => {
  return(
    <td>
      <span>
        {/* {localSum[col]} */}
      </span>
    </td>
  )
}





// const increaseTuning = (mtx, i, j, mtxSetter, sumSetter) => {
const increaseTuning = (mtx, i, j, mtxSetter) => {
  let mtxModel = mtx
  if (mtxModel[i][j] < 16) {
    mtxModel[i][j] += 1
    mtxModel[j][i] -= 1
    mtxSetter(mtxModel)
  }
  // this.forceUpdate()
  alert('a')
}
