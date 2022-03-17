import { useState, useEffect } from "react"
import { useMessage } from "../../../hooks/message.hook" 
import { HOT_CHANGES_EFFECT_RESET, HOT_CHANGES_EFFECT } from "../../../pages/ahp/NewResearchPage"

import style from "./AlternativesRating.module.scss"


export const AlternativesRating = ({
  criteria,
  alternatives,
  alternativesMTX,
  alternativesMTXSetter,
  alternativesSum,
  alternativesSumSetter,
  alternativesNormMTXSetter,
  alternativesWeightsSetter,

  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  const [localMTX, setLocalMTX] = useState(alternativesMTX)
  const [localSum, setLocalSum] = useState(alternativesSum)
  
  const localMTXSetter = (mtx, criterion) => {
    let enteringMtx = localMTX
    enteringMtx[criterion] = mtx
    setLocalMTX([...enteringMtx])
  }
  const localSumSetter = (sum, criterion) => {
    let enteringSum = localSum
    enteringSum[criterion] = sum
    setLocalSum([...enteringSum])
  }
  
  const [currentCriterion, setCurrentCriterion] = useState(0)

  const currentCriterionSetter = (criterion) => {
    setCurrentCriterion(criterion)
  }


  // useEffect(() => {
  //   sumCalculate(localMTX, localSumSetter)
  // }, [localMTX])

  return(
    <div className={style.phase_container}>


      <Table
        alternatives={alternatives}
        localMTX={localMTX[0]}
        localSum={localSum[0]}
        localMTXSetter={localMTXSetter}
        localSumSetter={localSumSetter}
      />


      <Menu
        criteria={criteria}
        currentCriterionSetter={currentCriterionSetter}

        goToPhase={goToPhase}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const Table = ({
  alternatives,
  localMTX,
  localSum,
  localMTXSetter,
  localSumSetter,
}) => {

  return(
    <table className={style.alternatives_comparison_table}>
    <thead>
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
        <CellRow
          key={i}
          i={i}
          alternatives={alternatives}
          localMTX={localMTX}
          localMTXSetter={localMTXSetter}
          localSumSetter={localSumSetter}
        />
      )}
    </tbody>
    <tfoot>
      <tr>
        <th className={style.sigma}>Σ</th>
        {[...Array(alternatives.length)].map((x, i) =>
          <SumCell
            key={i}
            col={i}
            localSum={localSum}
          />
        )}
      </tr>
    </tfoot>
  </table>
  )
}

const CellRow = ({
  i,
  alternatives,
  localMTX,
  localMTXSetter,
  localSumSetter,
}) => {

  return(
    <tr>
      <th title={alternatives[i]}>
        {alternatives[i]}
      </th>
      {[...Array(alternatives.length)].map((x, j) => {
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
      <div
        className={style.cell}
        onWheel={(e) => wheelTuning(localMTX, row, col, localMTXSetter, localSumSetter, e)}
      >
        <div className={style.value_box}>
          <span key={localMTX}>
            {MARK_MODEL[localMTX[row][col]].string}
          </span>
        </div>
        <div className={style.cell_tuning}>
          <div className={style.cell_tuning_left}>
            <TuningButton
              icon={'keyboard_arrow_up'}
              action={increaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] > 15}
            />
            <TuningButton
              icon={'keyboard_arrow_left'}
              action={decreaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] < 1}
            />
          </div>
          <div className={style.cell_tuning_right}>
            <TuningButton
              icon={'arrow_upward'}
              action={maxTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] > 15}
            />
            <TuningButton
              icon={'arrow_back'}
              action={minTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] < 1}
            />
          </div>
          <TuningButton
              icon={'refresh'}
              action={resetTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] === 8}
            />
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
  sumSetter,
  disableCondition,
}) => {

  return(
    <span
      className="btn"
      disabled={disableCondition}
      onClick={(e) => action(mtx, row, col, mtxSetter, sumSetter, e)}
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
        {MARK_MODEL[localMTX[row][col]].string}
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
        {MARK_MODEL[localMTX[row][col]].string}
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
        {valAdduction(localSum[col])}
      </span>
    </td>
  )
}













const Menu = ({
  criteria,
  currentCriterionSetter,

  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  const message = useMessage()

  useEffect(() => {
    const firstCriterionCheckbox = document.querySelector('input[name="criteria"]:first-child')
    firstCriterionCheckbox.checked = true
  }, [])

  const goToCriteriaRating = () => {
    goToPhase(1)
  }

  const goToGlobalAlternatives = () => {
    // globalStateSetter()

    phaseDone(6)
    goToPhase(6)
    message('Исследование завершено!')
  }

  const goToAlternativesWeights = () => {
    // globalStateSetter()

    if (phasesDone < 4) {
      phaseDone(4)
    }
    goToPhase(4)
  }

  function noop () {}

  const changeCriterionHandler = (criterion) => {
    
    currentCriterionSetter(criterion)
    console.log(criterion)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
        <span className="btn waves-effect waves-light" onClick={noop}>
          Сброс
        </span>
        <span className="btn waves-effect waves-light" onClick={noop}>
          Тест. значения
        </span>
        <span className="btn waves-effect waves-light" onClick={noop}>
          Случ. значения
        </span>
      </div>
      <div className={style.middle}>
        {[...Array(criteria.length)].map((x, i) =>
          <label key={i} title={criteria[i]}>
            <input
              type="radio"
              name="criteria"
              // className={`criterion${i} with-gap`}
              className="with-gap"
              onChange={(e) => changeCriterionHandler(i, e)}
            />
            <span>{criteria[i]}</span>
          </label>
        )}
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToCriteriaRating}>
          &nbsp;&lt;&lt;&lt;&nbsp;&nbsp;Назад
        </button>
        <button className="btn" onClick={goToAlternativesWeights}>
          Веса альт.&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
        <button className="btn"
          onClick={goToGlobalAlternatives}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}























// Модель оценок 
class Mark {
  constructor(numerator, denominator) {
    if (denominator === 1) { this.string = `${numerator}` }
    else { this.string = `${numerator}/${denominator}` }
    this.number = numerator / denominator
  }
}
let markModel = []
for (let i = 0; i < 9; i++) {
  markModel[i] = new Mark(1, 9 - i)
  markModel[16 - i] = new Mark(9 - i, 1)
}
const MARK_MODEL = markModel

// #####################################  MARK_MODEL  #####################################
//   index:  [0,   1,   2,   3,   4,   5,   6,   7,   |8|, 9, 10, 11, 12, 13, 14, 15, 16]
//   string: [1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1/2, |1|, 2, 3,  4,  5,  6,  7,  8,  9 ]
//   number: [0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 0.5, |1|, 2, 3,  4,  5,  6,  7,  8,  9 ]
// ########################################################################################



// Приведение оценок 
const valAdduction = (value) => {
  value = value.toFixed(3)
  value = value * 1
  return(value)
}



// Изменение оценок
const increaseTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  if (mtxModel[i][j] < 16) {
    mtxModel[i][j] += 1
    mtxModel[j][i] -= 1
    mtxSetter(mtxModel)
  }
  sumCalculate(mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const decreaseTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  if (mtxModel[i][j] > 0) {
    mtxModel[i][j] -= 1
    mtxModel[j][i] += 1
    mtxSetter(mtxModel)
  }
  sumCalculate(mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const wheelTuning = (mtx, i, j, mtxSetter, sumSetter, e) => {
  if (e.nativeEvent.wheelDelta > 0) {
    increaseTuning(mtx, i, j, mtxSetter, sumSetter)
  } else {
    decreaseTuning(mtx, i, j, mtxSetter, sumSetter)
  }
}
const maxTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  mtxModel[i][j] = 16
  mtxModel[j][i] = 0
  mtxSetter(mtxModel)
  sumCalculate(mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const minTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  mtxModel[i][j] = 0
  mtxModel[j][i] = 16
  mtxSetter(mtxModel)
  sumCalculate(mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const resetTuning = (mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx
  mtxModel[i][j] = 8
  mtxModel[j][i] = 8
  mtxSetter(mtxModel)
  sumCalculate(mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}



// Расчёт суммы
const sumCalculate = (mtx, sumSetter) => {
  const n = mtx.length
  let sum = Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (MARK_MODEL[mtx[j][i]]) {
        sum[i] += MARK_MODEL[mtx[j][i]].number
      }
    }
  }
  sumSetter(sum)
}
