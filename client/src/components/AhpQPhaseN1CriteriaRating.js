import { useEffect, useState } from "react"
import style from "./AhpQPhases.module.scss"



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

// Обновление строки суммы
const sumRowUpdate = (criteriaSum, n) => {
  const criteriaSumRounded = []
  const criteriaSumCells = []
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
}


const buttonDisabling = (button) => {
  button.classList.add('disabled')
}
const buttonEnabling = (button) => {
  button.classList.remove('disabled')
}
const buttonPicker = (i, j, procedure) => {
  return(document.querySelector(`.btn${i}${j}${procedure}`))
}

















export const AhpQPhaseN1CriteriaRating = ({ criteria, criteriaMTX, criteriaMTXSetter, criteriaSum, criteriaSumSetter, nextPhase, previousPhase }) => {

  const [isSumCalculated, setIsSumCalculated] = useState(false)
  const sumHaveBeenCalculated = () => {
    setIsSumCalculated(true)
  }

  useEffect(() => {
    sumRowUpdate(criteriaSum, criteria.length)
  }, [criteriaSum, criteria])

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
              <th key={i}>
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
                criteriaSum={criteriaSum}
              />
            )}
          </tr>
        </tfoot>
      </table>
      <Menu
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
        criteriaMTX={criteriaMTX}
        criteriaMTXSetter={criteriaMTXSetter}
        criteriaSumSetter={criteriaSumSetter}
        isSumCalculated={isSumCalculated}
        sumHaveBeenCalculated={sumHaveBeenCalculated}
      />
    </div>
  )
}



const CellRow = ({ criteria, i, criteriaMTX, criteriaMTXSetter }) => {
  return(
    <tr>
      <th>{criteria[i]}</th>
      {[...Array(criteria.length)].map((x, j) => {
          if (i < j) return (
            <InCell
              key={j}
              row={i}
              col={j}
              criteriaMTX={criteriaMTX}
              criteriaMTXSetter={criteriaMTXSetter}
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



const InCell = ({ row, col, criteriaMTX, criteriaMTXSetter }) => {

  const increaseTuning = (i, j) => {
    let criteriaMTXModel = criteriaMTX
    if (criteriaMTXModel[i][j] < 16) {
      criteriaMTXModel[i][j] += 1
      criteriaMTXModel[j][i] -= 1
      criteriaMTXSetter(criteriaMTXModel)
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
  }
  const decreaseTuning = (i, j) => {
    let criteriaMTXModel = criteriaMTX
    if (criteriaMTXModel[i][j] > 0) {
      criteriaMTXModel[i][j] -= 1
      criteriaMTXModel[j][i] += 1
      criteriaMTXSetter(criteriaMTXModel)
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
  }
  const wheelTuning = (row, col, e) => {
    if (e.nativeEvent.wheelDelta > 0) {
      increaseTuning(row, col, e)
    } else {
      decreaseTuning(row, col, e)
    }
  }
  const maxTuning = (i, j) => {
    let criteriaMTXModel = criteriaMTX
    criteriaMTXModel[i][j] = 16
    criteriaMTXModel[j][i] = 0
    criteriaMTXSetter(criteriaMTXModel)
    const cell = document.querySelector(`.cell${i}${j}`)
    cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
    const rCell = document.querySelector(`.cell${j}${i}`)
    rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
    buttonDisabling(buttonPicker(i, j, 'inc'))
    buttonDisabling(buttonPicker(i, j, 'max'))
    buttonEnabling(buttonPicker(i, j, 'dec'))
    buttonEnabling(buttonPicker(i, j, 'min'))
  }
  const minTuning = (i, j) => {
    let criteriaMTXModel = criteriaMTX
    criteriaMTXModel[i][j] = 0
    criteriaMTXModel[j][i] = 16
    criteriaMTXSetter(criteriaMTXModel)
    const cell = document.querySelector(`.cell${i}${j}`)
    cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
    const rCell = document.querySelector(`.cell${j}${i}`)
    rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
    buttonDisabling(buttonPicker(i, j, 'dec'))
    buttonDisabling(buttonPicker(i, j, 'min'))
    buttonEnabling(buttonPicker(i, j, 'inc'))
    buttonEnabling(buttonPicker(i, j, 'max'))
  }
  const resetTuning = (i, j) => {
    let criteriaMTXModel = criteriaMTX
    criteriaMTXModel[i][j] = 8
    criteriaMTXModel[j][i] = 8
    criteriaMTXSetter(criteriaMTXModel)
    const cell = document.querySelector(`.cell${i}${j}`)
    cell.textContent = MARK_MODEL[criteriaMTXModel[i][j]].string
    const rCell = document.querySelector(`.cell${j}${i}`)
    rCell.textContent = MARK_MODEL[criteriaMTXModel[j][i]].string
    buttonEnabling(buttonPicker(i, j, 'inc'))
    buttonEnabling(buttonPicker(i, j, 'dec'))
    buttonEnabling(buttonPicker(i, j, 'max'))
    buttonEnabling(buttonPicker(i, j, 'min'))
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
            onClick={(e) => increaseTuning(row, col, e)}
          >
            <i className="material-icons">arrow_upward</i>
          </span>
          <span
            className={`waves-effect waves-light btn btn${row}${col}dec`}
            onClick={(e) => decreaseTuning(row, col, e)}
          >
            <i className="material-icons">arrow_back</i>
          </span>
        </div>
        <div className={style.cell_tuning_right}>
          <span
            className={`waves-effect waves-light btn btn${row}${col}max`}
            onClick={(e) => maxTuning(row, col, e)}
          >
            MAX
          </span>
          <span
            className={`waves-effect waves-light btn btn${row}${col}res`}
            onClick={(e) => resetTuning(row, col, e)}
          >
            <i className="material-icons">refresh</i>
          </span>
          <span
            className={`waves-effect waves-light btn btn${row}${col}min`}
            onClick={(e) => minTuning(row, col, e)}
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



const SumCell = ({ col, criteriaSum }) => {
  return(
    <td>
      <span className={`sum${col}`}>
        {criteriaSum}
      </span>
    </td>
  )
}



const Menu = ({ nextPhase, previousPhase, criteriaMTX, criteriaMTXSetter, criteriaSumSetter, isSumCalculated, sumHaveBeenCalculated }) => {

  const reselectionHandler = () => {
    previousPhase()
  }
  const continueHandler = () => {
    nextPhase()
  }

  const resetHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    criteriaMTXModel = resetMtx(criteriaMTXModel, n)
    tableUpdate(criteriaMTXModel, n)
    criteriaMTXSetter(criteriaMTXModel)
  }

  const randomHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    criteriaMTXModel = randomMtx(criteriaMTXModel, n)
    tableUpdate(criteriaMTXModel, n)
    criteriaMTXSetter(criteriaMTXModel)
  }

  const calculateHandler = () => {
    let criteriaMTXModel = criteriaMTX
    const n = criteriaMTX.length
    const sum = sumCalculate(criteriaMTXModel, n)
    sumRowUpdate(sum, n)
    criteriaSumSetter(sum)
    sumHaveBeenCalculated()
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
          disabled={isSumCalculated}
        >
          Посчитать суммы
        </button>
        <button className="btn"
          onClick={continueHandler}
          disabled={!isSumCalculated}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
