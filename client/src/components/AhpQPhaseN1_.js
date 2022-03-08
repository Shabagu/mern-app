import { useState } from "react"
import style from "./AhpQPhases.module.scss"


export const AhpQPhaseN1CriteriaRating = ({ criteria, criteriaSumSetter, criteriaSum }) => {

  const [isSumCalculated, setIsSumCalculated] = useState(false)
  // const [sum, setSum] = useState([])
  // const [iMark, setIMark] = useState(iMarkMTX) // ?

  const setSumCalculationCondition = () => {
    setIsSumCalculated(true)
  }





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

  // index:  [0,   1,   2,   3,   4,   5,   6,   7,   |8|, 9, 10, 11, 12, 13, 14, 15, 16]
  // string: [1/9, 1/8, 1/7, 1/6, 1/5, 1/4, 1/3, 1/2, |1|, 2, 3,  4,  5,  6,  7,  8,  9 ]
  // number: [0.1, 0.1, 0.1, 0.1, 0.2, 0.2, 0.3, 0.5, |1|, 2, 3,  4,  5,  6,  7,  8,  9 ]

  let iMarkMTX = [[],[],[],[],[],[],[],[]]
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      iMarkMTX[i][j] = 8
    }
  }





  const buttonDisabling = (button) => {
    button.classList.add('disabled')
  }
  const buttonEnabling = (button) => {
    button.classList.remove('disabled')
  }

  // Обновление вывода значений парных сравнений критериев
  const tableUpdate = () => {
    const outputMatrix = [[],[],[],[],[],[],[],[]]
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        outputMatrix[i][j] = document.querySelector(`.output${i}${j}`)
        if (outputMatrix[i][j]) {
          outputMatrix[i][j].textContent = MARK_MODEL[iMarkMTX[i][j]].string
          if (i < j) {
            const incButton = document.querySelector(`.btn${i}${j}inc`)
            const decButton = document.querySelector(`.btn${i}${j}dec`)
            const maxButton = document.querySelector(`.btn${i}${j}max`)
            const minButton = document.querySelector(`.btn${i}${j}min`)
            if (iMarkMTX[i][j] === 0) {
              buttonDisabling(decButton)
              buttonDisabling(minButton)
              buttonEnabling(incButton)
              buttonEnabling(maxButton)
            } else if (iMarkMTX[i][j] === 16) {
              buttonDisabling(incButton)
              buttonDisabling(maxButton)
              buttonEnabling(decButton)
              buttonEnabling(minButton)
            } else {
              buttonEnabling(incButton)
              buttonEnabling(decButton)
              buttonEnabling(maxButton)
              buttonEnabling(minButton)
            }
          }
        }
      }
    }
  }

  // Обновление вывода значений сумм оценок по критериям
  const sumUpdate = () => {
    const criteriaSumValues = [0, 0, 0, 0, 0, 0, 0, 0]
    const criteriaSumRoundedValues = []
    const sumOutputArray = []
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        criteriaSumValues[i] += MARK_MODEL[iMarkMTX[j][i]].number
      }
      if (Number.isInteger(criteriaSumValues[i])) {
        criteriaSumRoundedValues[i] = criteriaSumValues[i]
      } else {
        criteriaSumRoundedValues[i] = criteriaSumValues[i].toFixed(3)
        criteriaSumRoundedValues[i] = criteriaSumRoundedValues[i].replace(/0*$/,'');
        if (criteriaSumRoundedValues[i].slice(-1) === '.') {
          criteriaSumRoundedValues[i] = criteriaSumRoundedValues[i].slice(0, -1)
        }
      }
      sumOutputArray[i] = document.querySelector(`.sumOutput${i}`)
      sumOutputArray[i].textContent = criteriaSumRoundedValues[i]
    }
  }
 


  return(
    <div className={style.phase_container}>
      <table className={style.criteria_comparison_table}>
        <thead>
          <tr>
            <th className={style.initial}></th>
            {[...Array(criteria.length)].map((x, i) =>
              <th key={i}>{criteria[i]}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(criteria.length)].map((x, i) =>
            <CellRow
              key={i}
              i={i}
              criteria={criteria}
              sumUpdate={sumUpdate}
              isSumCalculated={isSumCalculated}
              iMarkMTX={iMarkMTX}
              MARK_MODEL={MARK_MODEL}

            />
          )}
        </tbody>
        <tfoot>
          <tr>
            <th className={style.sigma}>Σ</th>
            {[...Array(criteria.length)].map((x, i) =>
              <SumCell key={i} col={i} />
            )}
          </tr>
        </tfoot>
        <Menu
          tableUpdate={tableUpdate}
          sumUpdate={sumUpdate}
          isSumCalculated={isSumCalculated}
          setSumCalculationCondition={setSumCalculationCondition}
          iMarkMTX={iMarkMTX}
        />
      </table>
    </div>
  )
}





const CellRow = ({ criteria, i, sumUpdate, isSumCalculated, iMarkMTX, MARK_MODEL }) => {
  return(
    <tr>
      <th>{criteria[i]}</th>
      {[...Array(criteria.length)].map((x, j) => {
          if (i < j) return (
            <InCell
              key={j}
              row={i}
              col={j}
              sumUpdate={sumUpdate}
              isSumCalculated={isSumCalculated}
              iMarkMTX={iMarkMTX}
              MARK_MODEL={MARK_MODEL}
            />
          )           
          if (i === j) return (
            <DiagonalCell key={j} />
          )
          if (i > j) return(
            <OutCell 
              key={j}
              row={i}
              col={j}
              iMarkMTX={iMarkMTX}
              MARK_MODEL={MARK_MODEL}
            />
          )
        }
      )}
    </tr>
  )
}





const InCell = ({ row, col, sumUpdate, isSumCalculated, iMarkMTX, MARK_MODEL }) => {

  let disabledBtn = {}

  const buttonDisabling = (button) => {
    button.classList.add('disabled')
  }
  const buttonEnabling = (button) => {
    button.classList.remove('disabled')
  }
  
  const tuningIncreaseHandler = async (i, j) => {

    const currentI = iMarkMTX[i][j]
    if (currentI < 16) {

      const newI = currentI + 1
      iMarkMTX[i][j] = newI
      const outCell = document.querySelector(`.output${i}${j}`)
      outCell.textContent = MARK_MODEL[newI].string
      
      const outRevCell = document.querySelector(`.output${j}${i}`)
      if (newI > 8) {
        const newRevI = 9 - MARK_MODEL[newI].number
        iMarkMTX[j][i] = newRevI
        outRevCell.textContent = MARK_MODEL[newRevI].string
      } else {
        const newRevI = 7 + Number(MARK_MODEL[newI].string.slice(-1))
        iMarkMTX[j][i] = newRevI
        outRevCell.textContent = MARK_MODEL[newRevI].string
      }

      const incButton = document.querySelector(`.btn${i}${j}inc`)
      const decButton = document.querySelector(`.btn${i}${j}dec`)
      const maxButton = document.querySelector(`.btn${i}${j}max`)
      const minButton = document.querySelector(`.btn${i}${j}min`)
      if (newI > 15) {
        buttonDisabling(incButton)
        buttonDisabling(maxButton)
      }
      buttonEnabling(decButton)
      buttonEnabling(minButton)
    }
    if (isSumCalculated) sumUpdate()
  }

  const tuningDecreaseHandler = async (i, j) => {

    const currentI = iMarkMTX[i][j]
    if (currentI > 0) {

      const newI = currentI - 1
      iMarkMTX[i][j] = newI
      const outCell = document.querySelector(`.output${i}${j}`)
      outCell.textContent = MARK_MODEL[newI].string

      const outRevCell = document.querySelector(`.output${j}${i}`)
      if (newI < 8) {
        const newRevI = 7 + Number(MARK_MODEL[newI].string.slice(-1))
        iMarkMTX[j][i] = newRevI
        outRevCell.textContent = MARK_MODEL[newRevI].string
      } else {
        const newRevI = 9 - MARK_MODEL[newI].number
        iMarkMTX[j][i] = newRevI
        outRevCell.textContent = MARK_MODEL[newRevI].string
      }

      const incButton = document.querySelector(`.btn${i}${j}inc`)
      const decButton = document.querySelector(`.btn${i}${j}dec`)
      const maxButton = document.querySelector(`.btn${i}${j}max`)
      const minButton = document.querySelector(`.btn${i}${j}min`)
      if (newI < 1) {
        buttonDisabling(decButton)
        buttonDisabling(minButton)
      }
      buttonEnabling(incButton)
      buttonEnabling(maxButton)
    }
    if (isSumCalculated) sumUpdate()
  }

  const tuningMaxHandler = async (i, j) => {

    const newI = 16
    iMarkMTX[i][j] = newI
    const outCell = document.querySelector(`.output${i}${j}`)
    outCell.textContent = MARK_MODEL[newI].string

    const newRevI = 0
    iMarkMTX[j][i] = newRevI
    const outRevCell = document.querySelector(`.output${j}${i}`)
    outRevCell.textContent = MARK_MODEL[newRevI].string

    const incButton = document.querySelector(`.btn${i}${j}inc`)
    const decButton = document.querySelector(`.btn${i}${j}dec`)
    const maxButton = document.querySelector(`.btn${i}${j}max`)
    const minButton = document.querySelector(`.btn${i}${j}min`)
    buttonDisabling(incButton)
    buttonDisabling(maxButton)
    buttonEnabling(decButton)
    buttonEnabling(minButton)
    if (isSumCalculated) sumUpdate()
  }

  const tuningMinHandler = async (i, j) => {

    const newI = 0
    iMarkMTX[i][j] = newI
    const outCell = document.querySelector(`.output${i}${j}`)
    outCell.textContent = MARK_MODEL[newI].string
    
    const newRevI = 16
    iMarkMTX[j][i] = newRevI
    const outRevCell = document.querySelector(`.output${j}${i}`)
    outRevCell.textContent = MARK_MODEL[newRevI].string

    const incButton = document.querySelector(`.btn${i}${j}inc`)
    const decButton = document.querySelector(`.btn${i}${j}dec`)
    const maxButton = document.querySelector(`.btn${i}${j}max`)
    const minButton = document.querySelector(`.btn${i}${j}min`)
    buttonDisabling(decButton)
    buttonDisabling(minButton)
    buttonEnabling(incButton)
    buttonEnabling(maxButton)
    if (isSumCalculated) sumUpdate()
  }

  const resetTuning = async (i, j) => {

    const newI = 8
    iMarkMTX[j][i] = newI
    const outCell = document.querySelector(`.output${i}${j}`)
    outCell.textContent = MARK_MODEL[newI].string

    const newRevI = 8
    iMarkMTX[j][i] = newRevI
    const outRevCell = document.querySelector(`.output${j}${i}`)
    outRevCell.textContent = MARK_MODEL[newRevI].string

    const incButton = document.querySelector(`.btn${i}${j}inc`)
    const decButton = document.querySelector(`.btn${i}${j}dec`)
    const maxButton = document.querySelector(`.btn${i}${j}max`)
    const minButton = document.querySelector(`.btn${i}${j}min`)
    buttonEnabling(decButton)
    buttonEnabling(minButton)
    buttonEnabling(incButton)
    buttonEnabling(maxButton)
    if (isSumCalculated) sumUpdate()
  }

  const wheelTuning = (row, col, e) => {
    if (e.nativeEvent.wheelDelta > 0) {
      tuningIncreaseHandler(row, col, e)
    } else {
      tuningDecreaseHandler(row, col, e)
    }
  }



  return(
    <td>
      <div className={style.cell}
        onWheel={(e) => wheelTuning(row, col, e)}
      >
        <div className={style.value_box}>
          <span className={`output${row}${col}`}>
            {MARK_MODEL[iMarkMTX[row][col]].string}
          </span>
        </div>
        <div className={style.cell_tuning_left}>
          <span
            className={`btn${row}${col}inc btn`}
            disabled={disabledBtn.incMax}
            onClick={(e) => tuningIncreaseHandler(row, col, e)}
          >
            <i className="material-icons">arrow_upward</i>
          </span>
          <span
            className={`btn${row}${col}dec btn`}
            disabled={disabledBtn.decMin}
            onClick={(e) => tuningDecreaseHandler(row, col, e)}
          >
            <i className="material-icons">arrow_back</i>
          </span>
        </div>
        <div className={style.cell_tuning_right}>
          <span
            className={`btn${row}${col}max btn`}
            disabled={disabledBtn.incMax}
            onClick={(e) => tuningMaxHandler(row, col, e)}
          >
            MAX
          </span>
          <span
            className={`btn${row}${col}res btn`}
            disabled={disabledBtn.reset}
            onClick={(e) => resetTuning(row, col, e)}
          >
            <i className="material-icons">refresh</i>
          </span>
          <span
            className={`btn${row}${col}min btn`}
            disabled={disabledBtn.decMin}
            onClick={(e) => tuningMinHandler(row, col, e)}
          >
            MIN
          </span>
        </div>
      </div>
    </td>
  )
}



const OutCell = ({ row, col, iMarkMTX, MARK_MODEL }) => {
  return(
    <td className={style.below}>
      <span className={`output${row}${col}`}>
        {MARK_MODEL[iMarkMTX[row][col]].string}
      </span>
    </td>
  )
}



const DiagonalCell = () => {
  return(
    <td className={style.diagonal}>
      1
    </td>
  )
}



const SumCell = ({ col }) => {
  return(
    <td>
      <span className={`sumOutput${col}`}></span>
    </td>
  )
}





const Menu = ({ tableUpdate, sumUpdate, isSumCalculated, setSumCalculationCondition, iMarkMTX }) => {

  const buttonDisabling = (button) => {
    button.classList.add('disabled')
  }
  const buttonEnabling = (button) => {
    button.classList.remove('disabled')
  }

  const reselectionHandler = () => {

  }

  // Функция-генератор случайных целых чисел в заданном интервале
  const randomIntegerInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Массив чисел для реверсирования индексов
  const reversArray = []
  for (let i = 0; i <= 16; i++) {
    reversArray[i] = 16 - i
  }

  // Генерация случайных значений парных сравнений критериев
  const randomValueGenerator = () => {
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        iMarkMTX[i][j] = randomIntegerInRange(0, 16)
        iMarkMTX[j][i] = reversArray[iMarkMTX[i][j]]
      }
      iMarkMTX[i][i] = 8
    }
  }

  // Сброс
  const resetValueGenerator = () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        iMarkMTX[i][j] = 8
      }
    }
  }

  
  
  // Обработчик события нажатия на кнопку сброса значений
  const resetHandler = () => {
    resetValueGenerator()
    tableUpdate()
    if (isSumCalculated) sumUpdate()
  }

  // Обработчик события нажатия на кнопку случайной генерации значений оценок сравнивания критериев
  const randomGenerationHandler = () => {
    randomValueGenerator()
    tableUpdate()
    if (isSumCalculated) sumUpdate()
  }

  // Обработчик события нажатия на кнопку расчёта суммы
  const criteriaSumCalculationHandler = () => {
    setSumCalculationCondition(true)
    sumUpdate()

    const sumButton = document.querySelector('.calculation')
    const normalizationButton = document.querySelector('.normalization')
    buttonDisabling(sumButton)
    buttonEnabling(normalizationButton)
  }


  const normalizationHandler = () => {
    
  }




  return(
    <div className={style.panel}>
      <div className={style.top}>
        <button className="btn"
          onClick={reselectionHandler}>Перевыбор</button>
        <button className="btn"
          onClick={resetHandler}>Сброс</button>
        <button className="btn"
          onClick={randomGenerationHandler}>Случ. значения</button>
      </div>
      <div className={style.bottom}>
        <button className="btn calculation"
          onClick={criteriaSumCalculationHandler}>Посчитать суммы</button>
        <button className="btn normalization disabled"
          onClick={normalizationHandler}>Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;</button>
      </div>
    </div>
  )
}
