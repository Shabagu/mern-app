import { useState, useEffect } from "react"
import { HOT_CHANGES_EFFECT_RESET, HOT_CHANGES_EFFECT } from "../../../pages/ahp/NewResearchPage"

import style from "./CriteriaRating.module.scss"


export const CriteriaRating = ({
  criteria,
  criteriaMTX,
  criteriaSum,
  criteriaMTXSetter,
  criteriaSumSetter,
  criteriaNormMTXSetter,
  criteriaWeightsSetter,

  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  const [localMTX, setLocalMTX] = useState(criteriaMTX)
  const [localSum, setLocalSum] = useState(criteriaSum)

  const localMTXSetter = (mtx) => {
    setLocalMTX([...mtx])
  }
  const localSumSetter = (sum) => {
    setLocalSum(sum)
  }

  const [popupActive, setPopupActive] = useState(false)
  const [popupRow, setPopupRow] = useState(0)
  const [popupCol, setPopupCol] = useState(0)

  const popup = (row, col) => {
    setPopupActive(true)
    setPopupRow(row)
    setPopupCol(col)
  }
  
  useEffect(() => {
    sumCalculate(localMTX, localSumSetter)
  }, [localMTX])

  return(
    <div className={style.phase_container}>

      <Table
        criteria={criteria}
        localMTX={localMTX}
        localSum={localSum}
        localMTXSetter={localMTXSetter}
        localSumSetter={localSumSetter}
        popup={popup}
      />

      <Menu
        localMTX={localMTX}
        localMTXSetter={localMTXSetter}
        localSum={localSum}
        localSumSetter={localSumSetter}
        criteriaMTXSetter={criteriaMTXSetter}
        criteriaSumSetter={criteriaSumSetter}
        criteriaNormMTXSetter={criteriaNormMTXSetter}
        criteriaWeightsSetter={criteriaWeightsSetter}

        goToPhase={goToPhase}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />

      <CriteriaRatingPopup
        active={popupActive}
        setActive={setPopupActive}
        criteria={criteria}
        row={popupRow}
        col={popupCol}
        localMTX={localMTX}
        localMTXSetter={localMTXSetter}
        localSumSetter={localSumSetter}
      />

    </div>
  )
}

const Table = ({
  criteria,
  localMTX,
  localSum,
  localMTXSetter,
  localSumSetter,
  popup,
}) => {

  return(
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
            popup={popup}
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
  )
}

const CellRow = ({
  i,
  criteria,
  localMTX,
  localMTXSetter,
  localSumSetter,
  popup,
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
            popup={popup}
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
  popup,
}) => {

  return(
    <td>
      <div
        className={style.cell}
        onWheel={(e) => wheelTuning(localMTX, row, col, localMTXSetter, localSumSetter, e)}
      >
        <div
          className={style.value_box}
          onClick={() => popup(row, col)}
        >
          <span>
            {MARK_MODEL[localMTX[row][col]].string}
          </span>
        </div>
        <div className={style.cell_tuning}>
          <div className={style.cell_tuning_left}>
            <TuningButton
              icon={'keyboard_arrow_left'}
              action={increaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] > 15}
            />
            <TuningButton
              icon={'arrow_back'}
              action={maxTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] > 15}
            />
          </div>
          <div className={style.cell_tuning_right}>
            <TuningButton
              icon={'keyboard_arrow_up'}
              action={decreaseTuning}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[row][col] < 1}
            />
            <TuningButton
              icon={'arrow_upward'}
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


const CriteriaRatingPopup = ({
  active,
  setActive,
  criteria,
  row,
  col,
  localMTX,
  localMTXSetter,
  localSumSetter,
}) => {

  const confirmHandler = () => { setActive(false) }

  return(
    <div
      className={active ? `${style.popup} ${style.active}` : style.popup}
      onClick={() => setActive(false)}
      onWheel={(e) => wheelTuning(localMTX, row, col, localMTXSetter, localSumSetter, e)}
    >
      <div
        className={active ? `${style.popup_content} ${style.active}` : style.popup_content}
        onClick={e => e.stopPropagation()}
      >
        <p className="center">Сравнение критериев</p>
        <div className="center">{MARK_MODEL[localMTX[row][col]].string}</div>
        <div className={style.rating_box}>
          <div>{criteria[col]}</div>
          <div>{criteria[row]}</div>
        </div>
        <div className="range-field">
          <input
            type="range" id="criteria" name="criteria"
            min={0} max={16} value={[localMTX[row][col]]} readOnly={true} tabIndex={-1}
          />
        </div>

        <div className={style.popup_menu}>
          <div className={style.item}>
            <span
              className="btn"
              disabled={localMTX[row][col] < 1}
              onClick={() => minTuning(localMTX, row, col, localMTXSetter, localSumSetter)}
            >
              <i className="material-icons">arrow_back</i>
            </span>
          </div>
          <div className={style.item}>
            <span
              className="btn"
              disabled={localMTX[row][col] < 1}
              onClick={() => decreaseTuning(localMTX, row, col, localMTXSetter, localSumSetter)}
            >
              <i className="material-icons">keyboard_arrow_left</i>
            </span>
          </div>
          <div className={style.item}>
            <span
              className="btn"
              disabled={localMTX[row][col] === 8}
              onClick={() => resetTuning(localMTX, row, col, localMTXSetter, localSumSetter)}
            >
              <i className="material-icons">refresh</i>
            </span>
          </div>
          <div className={style.item}>
            <span
              className="btn"
              disabled={localMTX[row][col] > 15}
              onClick={() => increaseTuning(localMTX, row, col, localMTXSetter, localSumSetter)}
            >
              <i className="material-icons">keyboard_arrow_right</i>
            </span>
          </div>
          <div className={style.item}>
            <span
              className="btn"
              disabled={localMTX[row][col] > 15}
              onClick={() => maxTuning(localMTX, row, col, localMTXSetter, localSumSetter)}
            >
              <i className="material-icons">arrow_forward</i>
            </span>
          </div>
        </div>
        <div className={style.popup_exit}>
          <i className="material-icons" onClick={confirmHandler}>check</i>
        </div>
      </div>
    </div>
  )
}



const Menu = ({
  localMTX,
  localMTXSetter,
  localSum,
  localSumSetter,
  criteriaMTXSetter,
  criteriaSumSetter,
  criteriaNormMTXSetter,
  criteriaWeightsSetter,

  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  const reselectionHandler = () => {
    goToPhase(0)
  }

  const resetHandler = () => {
    resetMtx(localMTX, localMTXSetter)
    sumCalculate(localMTX, localSumSetter)
  }

  const randomHandler = () => {
    randomMtx(localMTX, localMTXSetter)
    sumCalculate(localMTX, localSumSetter)
  }

  const testHandler = () => {
    testMtx(localMTX, localMTXSetter)
    sumCalculate(localMTX, localSumSetter)
  }

  

  const globalStateSetter = () => {
    const normalizedMTX = normalizeMtx(localMTX, localSum)
    const weights = calculateWeights(normalizedMTX)
    
    criteriaMTXSetter(localMTX)
    criteriaSumSetter(localSum)
    criteriaNormMTXSetter(normalizedMTX)
    criteriaWeightsSetter(weights)
  }

  const goToAlternativesRating = () => {
    globalStateSetter()

    if (phasesDone < 3) {
      phaseDone(3)
    }
    goToPhase(3)
  }

  const goToCriteriaWeights = () => {
    globalStateSetter()

    if (phasesDone < 2) {
      phaseDone(2)
    }
    goToPhase(2)
  }


  return(
    <div className={style.menu}>
      <div className={style.top}>
        <span className="btn waves-effect waves-light" onClick={resetHandler}>
          Сброс
          <i className="material-icons right">refresh</i>
        </span>
        <span className="btn waves-effect waves-light" onClick={testHandler}>
          Тест. значения
          <i className="material-icons right">tune</i>
        </span>
        <span className="btn waves-effect waves-light" onClick={randomHandler}>
          Случ. значения
          <i className="material-icons right">tune</i>
        </span>
      </div>
      <div className={style.bottom}>
        <div className={style.high}>
        </div>
        <button className="btn" onClick={reselectionHandler}>
          Перевыбор
          <i className="material-icons right">fast_rewind</i>
        </button>
        <button className="btn" onClick={goToCriteriaWeights}>
          Веса крит.
          <i className="material-icons right">info_outline</i>
        </button>
        <button className="btn" onClick={goToAlternativesRating}>
          Продолжить
          <i className="material-icons right">fast_forward</i>
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
      sum[i] += MARK_MODEL[mtx[j][i]].number
    }
  }
  sumSetter(sum)
}



// Сброс значений матрицы
const resetMtx = (mtx, mtxSetter) => {
  const n = mtx.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      mtx[i][j] = 8
    }
  }
  mtxSetter(mtx)
  HOT_CHANGES_EFFECT()
}

// Рандомизация значений матрицы
const randomIntegerInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const reversArray = []
for (let i = 0; i <= 16; i++) {
  reversArray[i] = 16 - i
}
const randomMtx = (mtx, mtxSetter) => {
  const n = mtx.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      mtx[i][j] = randomIntegerInRange(0, 16)
      mtx[j][i] = reversArray[mtx[i][j]]
    }
    mtx[i][i] = 8
  }
  mtxSetter(mtx)
  HOT_CHANGES_EFFECT()
}

// Тестовый набор данных
const testMtx = (mtx, mtxSetter) => {
  if (mtx.length === 8) {
    const testMtx = [
      [8, 1, 13, 1, 13, 3, 14, 0],
      [15, 8, 13, 14, 6, 2, 5, 1],
      [3, 3, 8, 6, 14, 16, 6, 1],
      [15, 2, 10, 8, 12, 12, 5, 7],
      [3, 10, 2, 4, 8, 7, 6, 8],
      [13, 14, 0, 4, 9, 8, 9, 15],
      [2, 11, 10, 11, 10, 7, 8, 8],
      [16, 15, 15, 9, 8, 1, 8, 8]
    ]
    mtxSetter(testMtx)
    HOT_CHANGES_EFFECT()
  }
}



// Нормировка матрицы
const normalizeMtx = (mtx, sum) => {
  let normMtx = []
  for (let i = 0; i < mtx.length; i++) {
    normMtx[i] = []
    for (let j = 0; j < mtx.length; j++) {
      normMtx[i][j] = MARK_MODEL[mtx[i][j]].number / sum[j]
    }
  }
  return normMtx
}

// Расчёт весов
const calculateWeights = (mtx) => {
  let weights = []
  for (let i = 0; i < mtx.length; i++) {
    weights[i] = 0
    for (let j = 0; j < mtx.length; j++) {
      weights[i] += mtx[i][j]
    }
    weights[i] = weights[i] / mtx.length
  }
  return weights
}
