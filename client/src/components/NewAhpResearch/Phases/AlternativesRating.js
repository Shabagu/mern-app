import { useState, useEffect } from "react"
import { useMessage } from "../../../hooks/message.hook" 
import { HOT_CHANGES_EFFECT_RESET, HOT_CHANGES_EFFECT } from "../../../pages/ahp/NewResearchPage"

import style from "./AlternativesRating.module.scss"


export const AlternativesRating = ({
  criteria,
  alternatives,
  alternativesMTX,
  alternativesSum,
  alternativesMTXSetter,
  alternativesSumSetter,
  alternativesNormMTXSetter,
  alternativesWeightsSetter,
  criteriaWeights,
  globalWeightsSetter,

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


  useEffect(() => {
    sumCalculate(currentCriterion, localMTX, localSumSetter)
  }, [currentCriterion, localMTX])

  return(
    <div className={style.phase_container}>


      <Table
        alternatives={alternatives}
        currentCriterion={currentCriterion}
        localMTX={localMTX}
        localSum={localSum}
        localMTXSetter={localMTXSetter}
        localSumSetter={localSumSetter}
      />


      <Menu
        criteria={criteria}
        currentCriterion={currentCriterion}
        currentCriterionSetter={currentCriterionSetter}

        localMTX={localMTX}
        localMTXSetter={localMTXSetter}
        localSum={localSum}
        localSumSetter={localSumSetter}
        alternativesMTXSetter={alternativesMTXSetter}
        alternativesSumSetter={alternativesSumSetter}
        alternativesNormMTXSetter={alternativesNormMTXSetter}
        alternativesWeightsSetter={alternativesWeightsSetter}
        criteriaWeights={criteriaWeights}
        globalWeightsSetter={globalWeightsSetter}

        goToPhase={goToPhase}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const Table = ({
  alternatives,
  currentCriterion,
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
          currentCriterion={currentCriterion}
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
            cc={currentCriterion}
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
  currentCriterion,
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
            cc={currentCriterion}
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
            cc={currentCriterion}
            row={i}
            col={j}
            localMTX={localMTX}
          />
        )
        else if (i === j) return (
          <DiagonalCell
            key={j}
            cc={currentCriterion}
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
  cc,
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
        onWheel={(e) => wheelTuning(cc, localMTX, row, col, localMTXSetter, localSumSetter, e)}
      >
        <div className={style.value_box}>
          <span>
            {MARK_MODEL[localMTX[cc][row][col]].string}
          </span>
        </div>
        <div className={style.cell_tuning}>
          <div className={style.cell_tuning_left}>
            <TuningButton
              icon={'keyboard_arrow_up'}
              action={increaseTuning}
              cc={cc}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[cc][row][col] > 15}
            />
            <TuningButton
              icon={'keyboard_arrow_left'}
              action={decreaseTuning}
              cc={cc}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[cc][row][col] < 1}
            />
          </div>
          <div className={style.cell_tuning_right}>
            <TuningButton
              icon={'arrow_upward'}
              action={maxTuning}
              cc={cc}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[cc][row][col] > 15}
            />
            <TuningButton
              icon={'arrow_back'}
              action={minTuning}
              cc={cc}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[cc][row][col] < 1}
            />
          </div>
          <TuningButton
              icon={'refresh'}
              action={resetTuning}
              cc={cc}
              row={row}
              col={col}
              mtx={localMTX}
              mtxSetter={localMTXSetter}
              sumSetter={localSumSetter}
              disableCondition={localMTX[cc][row][col] === 8}
            />
        </div>
      </div>
    </td>
  )
}

const TuningButton = ({
  icon,
  action,
  cc,
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
      onClick={(e) => action(cc, mtx, row, col, mtxSetter, sumSetter, e)}
    >
      <i className="material-icons">{icon}</i>
    </span>
  )
}

const OutCell = ({
  cc,
  row,
  col,
  localMTX,
}) => {

  return(
    <td className={style.below}>
      <span>
        {MARK_MODEL[localMTX[cc][row][col]].string}
      </span>
    </td>
  )
}

const DiagonalCell = ({
  cc,
  row,
  col,
  localMTX,
}) => {

  return(
    <td className={style.diagonal}>
      <span>
        {MARK_MODEL[localMTX[cc][row][col]].string}
      </span>
    </td>
  )
}

const SumCell = ({
  cc,
  col,
  localSum,
 }) => {
   
  return(
    <td>
      <span>
        {valAdduction(localSum[cc][col])}
      </span>
    </td>
  )
}













const Menu = ({
  criteria,
  currentCriterion,
  currentCriterionSetter,
  localMTX,
  localMTXSetter,
  localSum,
  localSumSetter,
  alternativesMTXSetter,
  alternativesSumSetter,
  alternativesNormMTXSetter,
  alternativesWeightsSetter,
  criteriaWeights,
  globalWeightsSetter,

  goToPhase,
  phaseDone,
  phasesDone,
}) => {

  const message = useMessage()

  useEffect(() => {
    const firstCriterionCheckbox = document.querySelector('input[name="criteria"]:first-child')
    firstCriterionCheckbox.checked = true
  }, [])

  const resetHandler = () => {
    resetMtx(currentCriterion, localMTX, localMTXSetter)
    sumCalculate(currentCriterion, localMTX, localSumSetter)
  }

  const randomHandler = () => {
    randomMtx(currentCriterion, localMTX, localMTXSetter)
    sumCalculate(currentCriterion, localMTX, localSumSetter)
  }

  const testHandler = () => {
    testMtx(currentCriterion, localMTX, localMTXSetter)
    sumCalculate(currentCriterion, localMTX, localSumSetter)
  }



  const globalStateSetter = () => {
    const normalizedMTX = normalizeMtx(localMTX, localSum)
    const alternativesWeights = calculateWeights(normalizedMTX)
    const globalWeights = calculateGlobalWeights(criteriaWeights, alternativesWeights)

    alternativesMTXSetter(localMTX)
    alternativesSumSetter(localSum)
    alternativesNormMTXSetter(normalizedMTX)
    alternativesWeightsSetter(alternativesWeights)
    globalWeightsSetter(globalWeights)
  }

  const goToCriteriaRating = () => {
    goToPhase(1)
  }

  const goToGlobalAlternatives = () => {
    globalStateSetter()

    phaseDone(6)
    goToPhase(6)
    message('Исследование завершено!')
  }

  const goToAlternativesWeights = () => {
    globalStateSetter()

    if (phasesDone < 4) {
      phaseDone(4)
    }
    goToPhase(4)
  }

  const changeCriterionHandler = (criterion) => {
    currentCriterionSetter(criterion)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
        <span className={style.current_criterion} title={criteria[currentCriterion]}>
          {criteria[currentCriterion]}
        </span>
        <span className="btn waves-effect waves-light" onClick={resetHandler}>
          Сброс
        </span>
        <span className="btn waves-effect waves-light" onClick={testHandler}>
          Тест. значения
        </span>
        <span className="btn waves-effect waves-light" onClick={randomHandler}>
          Случ. значения
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
const increaseTuning = (cc, mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx[cc]
  if (mtxModel[i][j] < 16) {
    mtxModel[i][j] += 1
    mtxModel[j][i] -= 1
    mtxSetter(mtxModel, cc)
  }
  sumCalculate(cc, mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const decreaseTuning = (cc, mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx[cc]
  if (mtxModel[i][j] > 0) {
    mtxModel[i][j] -= 1
    mtxModel[j][i] += 1
    mtxSetter(mtxModel, cc)
  }
  sumCalculate(cc, mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const wheelTuning = (cc, mtx, i, j, mtxSetter, sumSetter, e) => {
  if (e.nativeEvent.wheelDelta > 0) {
    increaseTuning(cc, mtx, i, j, mtxSetter, sumSetter)
  } else {
    decreaseTuning(cc, mtx, i, j, mtxSetter, sumSetter)
  }
}
const maxTuning = (cc, mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx[cc]
  mtxModel[i][j] = 16
  mtxModel[j][i] = 0
  mtxSetter(mtxModel, cc)
  sumCalculate(cc, mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const minTuning = (cc, mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx[cc]
  mtxModel[i][j] = 0
  mtxModel[j][i] = 16
  mtxSetter(mtxModel, cc)
  sumCalculate(cc, mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}
const resetTuning = (cc, mtx, i, j, mtxSetter, sumSetter) => {
  let mtxModel = mtx[cc]
  mtxModel[i][j] = 8
  mtxModel[j][i] = 8
  mtxSetter(mtxModel, cc)
  sumCalculate(cc, mtx, sumSetter)
  HOT_CHANGES_EFFECT()
}



// Расчёт суммы
const sumCalculate = (cc, mtx, sumSetter) => {
  const n = mtx[cc].length
  let sum = Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum[i] += MARK_MODEL[mtx[cc][j][i]].number
    }
  }
  sumSetter(sum, cc)
}



// Сброс значений матрицы
const resetMtx = (cc, mtx, mtxSetter) => {
  let ccmtx = mtx[cc]
  const n = ccmtx.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      ccmtx[i][j] = 8
    }
  }
  mtxSetter(ccmtx, cc)
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
const randomMtx = (cc, mtx, mtxSetter) => {
  let ccmtx = mtx[cc]
  const n = ccmtx.length
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      ccmtx[i][j] = randomIntegerInRange(0, 16)
      ccmtx[j][i] = reversArray[ccmtx[i][j]]
    }
    ccmtx[i][i] = 8
  }
  mtxSetter(ccmtx, cc)
  HOT_CHANGES_EFFECT()
}

// Тестовый набор данных
const testMtx = (cc, mtx, mtxSetter) => {
  let ccmtx = mtx[cc]
  if (ccmtx.length === 8) {
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
    mtxSetter(testMtx, cc)
    HOT_CHANGES_EFFECT()
  }
}



// Нормировка матрицы
const normalizeMtx = (mtx, sum) => {
  const criteriaN = mtx.length
  const alternativesN = mtx[0].length
  let normMtx = []

  for (let cr = 0; cr < criteriaN; cr++) {
    normMtx[cr] = []

    for (let i = 0; i < alternativesN; i++) {
      normMtx[cr][i] = []

      for (let j = 0; j < alternativesN; j++) {
        normMtx[cr][i][j] = MARK_MODEL[mtx[cr][i][j]].number / sum[cr][j]
      }
    }
  }
  return normMtx
}

// Расчёт весов альтернатив по критериям
const calculateWeights = (mtx) => {
  const criteriaN = mtx.length
  const alternativesN = mtx[0].length
  let weights = []

  for (let cr = 0; cr < criteriaN; cr++) {
    weights[cr] = []

    for (let i = 0; i < alternativesN; i++) {
      weights[cr][i] = 0
      
      for (let j = 0; j < alternativesN; j++) {
        weights[cr][i] += mtx[cr][i][j]
      }
      weights[cr][i] = weights[cr][i] / alternativesN
    }
  }
  return weights
}

// Расчёт глобальных весов альтернатив
const calculateGlobalWeights = (criteriaWeights, alternativesWeights) => {
  let globalWeights = []

  for (let i = 0; i < alternativesWeights[0].length; i++) {
    globalWeights[i] = 0

    for (let j = 0; j < criteriaWeights.length; j++) {

      globalWeights[i] += alternativesWeights[j][i] * criteriaWeights[j]
      
    }
  }
  return globalWeights
}
