import { useEffect } from "react"


import style from "./StyleAhpQPhases.module.scss"



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


// Сброс значений матрицы
const resetMtx = (mtx, n) => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      mtx[i][j] = 8
    }
  }
  return mtx
}


// Случайные значения матрицы
const randomIntegerInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const reversArray = []
for (let i = 0; i <= 16; i++) {
  reversArray[i] = 16 - i
}
const randomMtx = (mtx, n) => {
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      mtx[i][j] = randomIntegerInRange(0, 16)
      mtx[j][i] = reversArray[mtx[i][j]]
    }
    mtx[i][i] = 8
  }
  return mtx
}

// Расчёт суммы
const sumCalculate = (mtx, n) => {
  let criteriaSum = [0, 0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      criteriaSum[i] += MARK_MODEL[mtx[j][i]].number
    }
  }
  return criteriaSum
}

// Нормализация матрицы
const normalizeMtx = (mtx, sum) => {
  let normalizedMtx = []
  for (let i = 0; i < mtx.length; i++) {
    normalizedMtx[i] = []
    for (let j = 0; j < mtx.length; j++) {
      normalizedMtx[i][j] = MARK_MODEL[mtx[i][j]].number / sum[i]
    }
  }
  return normalizedMtx
}









//Обновление таблицы
const tableUpdate = (mtx, n) => {
  const cells = []
  for (let i = 0; i < n; i++) {
    cells[i] = []
    for (let j = 0; j < n; j++) {
      cells[i][j] = document.querySelector(`.cell${i}${j}`)
      if (cells[i][j]) {
        cells[i][j].textContent = MARK_MODEL[mtx[i][j]].string
        if (i < j) {
          if (mtx[i][j] === 0) {
            buttonDisabling(buttonPicker(i, j, 'dec'))
            buttonDisabling(buttonPicker(i, j, 'min'))
            buttonEnabling(buttonPicker(i, j, 'inc'))
            buttonEnabling(buttonPicker(i, j, 'max'))
          } else if (mtx[i][j] === 16) {
            buttonDisabling(buttonPicker(i, j, 'inc'))
            buttonDisabling(buttonPicker(i, j, 'max'))
            buttonEnabling(buttonPicker(i, j, 'dec'))
            buttonEnabling(buttonPicker(i, j, 'min'))
          } else {
            buttonEnabling(buttonPicker(i, j, 'inc'))
            buttonEnabling(buttonPicker(i, j, 'dec'))
            buttonEnabling(buttonPicker(i, j, 'max'))
            buttonEnabling(buttonPicker(i, j, 'min'))
          }
        }
      }
    }
  }
}

// Обновление строки суммы
const sumRowUpdate = (criteriaSum, n) => {
  const criteriaSumRounded = []
  const criteriaSumCells = []
  try {
    for (let i = 0; i < n; i++) {
      if (Number.isInteger(criteriaSum[i])) {
        criteriaSumRounded[i] = criteriaSum[i]
      } else {
        criteriaSumRounded[i] = criteriaSum[i].toFixed(3)
        criteriaSumRounded[i] = criteriaSumRounded[i].replace(/0*$/,'');
        if (criteriaSumRounded[i].slice(-1) === '.') {
          criteriaSumRounded[i] = criteriaSumRounded[i].slice(0, -1)
        }
      }
      criteriaSumCells[i] = document.querySelector(`.sum${i}`)
      criteriaSumCells[i].textContent = criteriaSumRounded[i]
    }
  } catch (e) {}
}

// Управление состоянием кнопок
const buttonDisabling = (button) => {
  button.classList.add('disabled')
}
const buttonEnabling = (button) => {
  button.classList.remove('disabled')
}
const buttonPicker = (i, j, procedure) => {
  return(document.querySelector(`.btn${i}${j}${procedure}`))
}

// Функции кнопок
const increaseTuning = (i, j, mtx, mtxSetter, sumSetter) => {
  let criteriaMTXModel = mtx
  if (criteriaMTXModel[i][j] < 16) {
    criteriaMTXModel[i][j] += 1
    criteriaMTXModel[j][i] -= 1
    mtxSetter(criteriaMTXModel)
    const cell = document.querySelector(`.cell${i}${j}`)
    cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
    const rCell = document.querySelector(`.cell${j}${i}`)
    rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
  }
  if (criteriaMTXModel[i][j] > 15) {
    buttonDisabling(buttonPicker(i, j, 'inc'))
    buttonDisabling(buttonPicker(i, j, 'max'))
  }
  buttonEnabling(buttonPicker(i, j, 'dec'))
  buttonEnabling(buttonPicker(i, j, 'min'))
  // if (isSumCalculated) {
    const n = mtx.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    sumSetter(sum)
  // }
}

const decreaseTuning = (i, j, mtx, mtxSetter, sumSetter) => {
  let criteriaMTXModel = mtx
  if (criteriaMTXModel[i][j] > 0) {
    criteriaMTXModel[i][j] -= 1
    criteriaMTXModel[j][i] += 1
    mtxSetter(criteriaMTXModel)
    const cell = document.querySelector(`.cell${i}${j}`)
    cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
    const rCell = document.querySelector(`.cell${j}${i}`)
    rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
  }
  if (criteriaMTXModel[i][j] < 1) {
    buttonDisabling(buttonPicker(i, j, 'dec'))
    buttonDisabling(buttonPicker(i, j, 'min'))
  }
  buttonEnabling(buttonPicker(i, j, 'inc'))
  buttonEnabling(buttonPicker(i, j, 'max'))
  // if (isSumCalculated) {
    const n = mtx.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    sumSetter(sum)
  // }
}

const maxTuning = (i, j, mtx, mtxSetter, sumSetter) => {
  let criteriaMTXModel = mtx
  criteriaMTXModel[i][j] = 16
  criteriaMTXModel[j][i] = 0
  mtxSetter(criteriaMTXModel)
  const cell = document.querySelector(`.cell${i}${j}`)
  cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
  const rCell = document.querySelector(`.cell${j}${i}`)
  rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
  buttonDisabling(buttonPicker(i, j, 'inc'))
  buttonDisabling(buttonPicker(i, j, 'max'))
  buttonEnabling(buttonPicker(i, j, 'dec'))
  buttonEnabling(buttonPicker(i, j, 'min'))
  // if (isSumCalculated) {
    const n = mtx.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    sumSetter(sum)
  // }
}

const minTuning = (i, j, mtx, mtxSetter, sumSetter) => {
  let criteriaMTXModel = mtx
  criteriaMTXModel[i][j] = 0
  criteriaMTXModel[j][i] = 16
  mtxSetter(criteriaMTXModel)
  const cell = document.querySelector(`.cell${i}${j}`)
  cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
  const rCell = document.querySelector(`.cell${j}${i}`)
  rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
  buttonDisabling(buttonPicker(i, j, 'dec'))
  buttonDisabling(buttonPicker(i, j, 'min'))
  buttonEnabling(buttonPicker(i, j, 'inc'))
  buttonEnabling(buttonPicker(i, j, 'max'))
  // if (isSumCalculated) {
    const n = mtx.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    sumSetter(sum)
  // }
}

const resetTuning = (i, j, mtx, mtxSetter, sumSetter) => {
  let criteriaMTXModel = mtx
  criteriaMTXModel[i][j] = 8
  criteriaMTXModel[j][i] = 8
  mtxSetter(criteriaMTXModel)
  const cell = document.querySelector(`.cell${i}${j}`)
  cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
  const rCell = document.querySelector(`.cell${j}${i}`)
  rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
  buttonEnabling(buttonPicker(i, j, 'inc'))
  buttonEnabling(buttonPicker(i, j, 'dec'))
  buttonEnabling(buttonPicker(i, j, 'max'))
  buttonEnabling(buttonPicker(i, j, 'min'))
  // if (isSumCalculated) {
    const n = mtx.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    sumSetter(sum)
  // }
}









export const AhpQPhaseN1CriteriaRating = ({
    criteria,
    criteriaMTX,
    criteriaMTXSetter,
    criteriaSumSetter,
    criteriaNormMTXSetter,
    previousPhase,

    nextPhase,
    phaseDone,
    phasesDone,
  }) => {

  useEffect(() => {
    const n = criteria.length
    const sum = sumCalculate(criteriaMTX, n)
    sumRowUpdate(sum, n)
  }, [criteria, criteriaMTX])

  const nextPhaseHandler = () => {
    nextPhase()
  }
  const previousPhaseHandler = () => {
    previousPhase()
  }

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
              criteriaMTX={criteriaMTX}
              criteriaMTXSetter={criteriaMTXSetter}
              criteriaSumSetter={criteriaSumSetter}
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
              />
            )}
          </tr>
        </tfoot>
      </table>
      <Menu
        criteriaMTX={criteriaMTX}
        criteriaMTXSetter={criteriaMTXSetter}
        criteriaSumSetter={criteriaSumSetter}
        criteriaNormMTXSetter={criteriaNormMTXSetter}
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}



const CellRow = ({
    criteria,
    i,
    criteriaMTX,
    criteriaMTXSetter,
    criteriaSumSetter,
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
              criteriaMTX={criteriaMTX}
              criteriaMTXSetter={criteriaMTXSetter}
              criteriaSumSetter={criteriaSumSetter}
            />
          )           
          else if (i > j) return(
            <OutCell 
              key={j}
              row={i}
              col={j}
              criteriaMTX={criteriaMTX}
            />
          )
          else if (i === j) return (
            <DiagonalCell
              key={j}
              row={i}
              col={j}
              criteriaMTX={criteriaMTX}
            />
          )
          else return(null)
        }
      )}
    </tr>
  )
}



const InCell = ({ row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter }) => {

  const wheelTuning = (row, col, e) => {
    if (e.nativeEvent.wheelDelta > 0) {
      increaseTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
    } else {
      decreaseTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
    }
  }

  return(
    <td>
      <div className={style.cell}
        onWheel={(e) => wheelTuning(row, col, e)}
      >
        <div className={style.value_box}>
          <span className={`cell${row}${col}`}>
            {MARK_MODEL[criteriaMTX[row][col]].string}
          </span>
        </div>

        <div className={style.cell_tuning_left}>
          <span
            className={`waves-effect waves-light btn btn${row}${col}inc`}
            onClick={(e) =>
              increaseTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
            }
          >
            <i className="material-icons">arrow_upward</i>
          </span>
          <span
            className={`waves-effect waves-light btn btn${row}${col}dec`}
            onClick={(e) =>
              decreaseTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
            }
          >
            <i className="material-icons">arrow_back</i>
          </span>
        </div>
        <div className={style.cell_tuning_right}>
          <span
            className={`waves-effect waves-light btn btn${row}${col}max`}
            onClick={(e) =>
              maxTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
            }
          >
            MAX
          </span>
          <span
            className={`waves-effect waves-light btn btn${row}${col}res`}
            onClick={(e) =>
              resetTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
            }
          >
            <i className="material-icons">refresh</i>
          </span>
          <span
            className={`waves-effect waves-light btn btn${row}${col}min`}
            onClick={(e) => 
              minTuning(row, col, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, e)
            }
          >
            MIN
          </span>
        </div>
      </div>
    </td>
  )
}



const OutCell = ({ row, col, criteriaMTX }) => {
  return(
    <td className={style.below}>
      <span className={`cell${row}${col}`}>
        {MARK_MODEL[criteriaMTX[row][col]].string}
      </span>
    </td>
  )
}



const DiagonalCell = ({ row, col, criteriaMTX }) => {
  return(
    <td className={style.diagonal}>
      {MARK_MODEL[criteriaMTX[row][col]].string}
    </td>
  )
}



const SumCell = ({ col }) => {
  return(
    <td>
      <span className={`sum${col}`}></span>
    </td>
  )
}



const Menu = ({
    criteriaMTX,
    criteriaMTXSetter,
    criteriaSumSetter,
    criteriaNormMTXSetter,
    nextPhase,
    previousPhase,
    phaseDone,
    phasesDone,
  }) => {


  const resetHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    criteriaMTXModel = resetMtx(criteriaMTXModel, n)
    tableUpdate(criteriaMTXModel, n)
    criteriaMTXSetter(criteriaMTXModel)

    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    criteriaSumSetter(sum)

  }

  const randomHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    criteriaMTXModel = randomMtx(criteriaMTXModel, n)
    tableUpdate(criteriaMTXModel, n)
    criteriaMTXSetter(criteriaMTXModel)

    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    criteriaSumSetter(sum)

  }

  const calculateHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    criteriaSumSetter(sum)
  }

  const reselectionHandler = () => {
    previousPhase()
  }
  
  const continueHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    const sum = sumCalculate(criteriaMTXModel, n)
    const normalizedMtx = normalizeMtx(criteriaMTXModel, sum)
    criteriaNormMTXSetter(normalizedMtx)

    if (phasesDone <= 1) {
      phaseDone()
    }
    nextPhase()
  }


  return(
    <div className={style.panel}>
      <div className={style.top}>
        <button
          className="btn"
          onClick={reselectionHandler}
        >
          Перевыбор
        </button>
        <button
          className="btn"
          onClick={resetHandler}
        >
          Сброс
        </button>
        <button
          className="btn"
          onClick={randomHandler}
        >
          Случ. значения
        </button>
      </div>
      <div className={style.bottom}>
        <button
          className="btn"
          onClick={calculateHandler}
        >
          Посчитать суммы
        </button>
        <button
          className="btn"
          onClick={continueHandler}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
