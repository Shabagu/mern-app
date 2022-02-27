import { useHistory } from "react-router-dom"
// import { useHttp } from "../hooks/http.hook"
import {
  AhpQueryCriteriaComparisonCellInput,
  AhpQueryCriteriaComparisonCellOutput,
  AhpQueryCriteriaComparisonCellDiagonal
} from '../components/ahp/AhpQueryCriteriaComparisonCells'

import style from './../style/quickStyleFix.module.scss'
import style2 from './../style/AhpSidebar.module.scss'



// Создание класса значений оценок ЛПР
class Value {
  constructor(numerator, denominator) {
    if (denominator === 1) {
      this.string = `${numerator}`
    } else {
      this.string = `${numerator}/${denominator}`
    }
    this.number = numerator / denominator
  }
}

// Заполнение массива сопоставлений индексов и значений оценок ЛПР
export const valuesModel = []
for (let i = 0; i < 9; i++) {
  valuesModel[i] = new Value(1, 9 - i)
  valuesModel[16 - i] = new Value(9 - i, 1)
}
//    VVV             Массив сопоставления индексов и значений оценок ЛПР                   VVV
//    >>>                                                                                   <<<
//    >>>    index(number):   0   1   2   3   4   5   6   7  {8}  9 10 11 12 13 14 15 16    <<<
//    >>>    value(string): 1/9 1/8 1/7 1/6 1/5 1/4 1/3 1/2  {1}  2  3  4  5  6  7  8  9    <<<

// Заполнение матрицы значений таблицы (по индексам) значением по умолчанию - 1 (индекс: 8)
export let indexValueMatrix = [[],[],[],[],[],[],[],[]]
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    indexValueMatrix[i][j] = 8
  }
}













// Функция-генератор случайных целых чисел в заданном интервале
const rng = (min, max) => {
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
      indexValueMatrix[i][j] = rng(0, 16)
      indexValueMatrix[j][i] = reversArray[indexValueMatrix[i][j]]
    }
    indexValueMatrix[i][i] = 8
  }
}

// Обновление вывода значений парных сравнений критериев
const tableUpdate = () => {
  const outputMatrix = [[],[],[],[],[],[],[],[]]
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      outputMatrix[i][j] = document.querySelector(`.valueOutput${i}${j}`)
      if (outputMatrix[i][j]) {
        outputMatrix[i][j].textContent = valuesModel[indexValueMatrix[i][j]].string
      }
    }
  }
}





















// Функция увеличения значения оценки сравнения критериев (+)
export const tuningIncreaseHandler = async (i, j) => {
  const currentValueIndex = indexValueMatrix[i][j]
  if (currentValueIndex < 16) {
    const outputCell = document.querySelector(`.valueOutput${i}${j}`)
    const newValueIndex = currentValueIndex + 1
    indexValueMatrix[i][j] = newValueIndex
    outputCell.textContent = valuesModel[newValueIndex].string
    
    const outputReversCell = document.querySelector(`.valueOutput${j}${i}`)
    if (newValueIndex > 8) {
      const newReversValueIndex = 9 - valuesModel[newValueIndex].number
      indexValueMatrix[j][i] = newReversValueIndex
      outputReversCell.textContent = valuesModel[newReversValueIndex].string
    } else {
      const newReversValueIndex = 7 + Number(valuesModel[newValueIndex].string.slice(-1))
      indexValueMatrix[j][i] = newReversValueIndex
      outputReversCell.textContent = valuesModel[newReversValueIndex].string
    }

    const incButton = document.querySelector(`.b${i}${j}inc`)
    const decButton = document.querySelector(`.b${i}${j}dec`)
    const maxButton = document.querySelector(`.b${i}${j}max`)
    const minButton = document.querySelector(`.b${i}${j}min`)

    if (newValueIndex > 15) {
      buttonDisabling(incButton)
      buttonDisabling(maxButton)
    }
    buttonEnabling(decButton)
    buttonEnabling(minButton)
  }
}

// Функция уменьшения значения оценки сравнения критериев (-)
export const tuningDecreaseHandler = async (i, j) => {
  const currentValueIndex = indexValueMatrix[i][j]
  if (currentValueIndex > 0) {
    const outputCell = document.querySelector(`.valueOutput${i}${j}`)
    const newValueIndex = currentValueIndex - 1
    indexValueMatrix[i][j] = newValueIndex
    outputCell.textContent = valuesModel[newValueIndex].string

    const outputReversCell = document.querySelector(`.valueOutput${j}${i}`)
    if (newValueIndex < 8) {
      const newReversValueIndex = 7 + Number(valuesModel[newValueIndex].string.slice(-1))
      indexValueMatrix[j][i] = newReversValueIndex
      outputReversCell.textContent = valuesModel[newReversValueIndex].string
    } else {
      const newReversValueIndex = 9 - valuesModel[newValueIndex].number
      indexValueMatrix[j][i] = newReversValueIndex
      outputReversCell.textContent = valuesModel[newReversValueIndex].string
    }

    const incButton = document.querySelector(`.b${i}${j}inc`)
    const decButton = document.querySelector(`.b${i}${j}dec`)
    const maxButton = document.querySelector(`.b${i}${j}max`)
    const minButton = document.querySelector(`.b${i}${j}min`)

    if (newValueIndex < 1) {
      buttonDisabling(decButton)
      buttonDisabling(minButton)
    }
    buttonEnabling(incButton)
    buttonEnabling(maxButton)
  }
}

// Функция выставления значения оценки сравнения критериев на максимум (MAX)
export const tuningMaxHandler = async (i, j) => {

  const outputCell = document.querySelector(`.valueOutput${i}${j}`)
  const newValueIndex = 16
  indexValueMatrix[i][j] = newValueIndex
  outputCell.textContent = valuesModel[newValueIndex].string
  
  const outputReversCell = document.querySelector(`.valueOutput${j}${i}`)
  const newReversValueIndex = 0
  indexValueMatrix[j][i] = newReversValueIndex
  outputReversCell.textContent = valuesModel[newReversValueIndex].string

  const incButton = document.querySelector(`.b${i}${j}inc`)
  const decButton = document.querySelector(`.b${i}${j}dec`)
  const maxButton = document.querySelector(`.b${i}${j}max`)
  const minButton = document.querySelector(`.b${i}${j}min`)
  buttonDisabling(incButton)
  buttonDisabling(maxButton)
  buttonEnabling(decButton)
  buttonEnabling(minButton)
}

// Функция выставления значения оценки сравнения критериев на минимум (MIN)
export const tuningMinHandler = async (i, j) => {

  const outputCell = document.querySelector(`.valueOutput${i}${j}`)
  const newValueIndex = 0
  indexValueMatrix[i][j] = newValueIndex
  outputCell.textContent = valuesModel[newValueIndex].string
  
  const outputReversCell = document.querySelector(`.valueOutput${j}${i}`)
  const newReversValueIndex = 16
  indexValueMatrix[j][i] = newReversValueIndex
  outputReversCell.textContent = valuesModel[newReversValueIndex].string

  const incButton = document.querySelector(`.b${i}${j}inc`)
  const decButton = document.querySelector(`.b${i}${j}dec`)
  const maxButton = document.querySelector(`.b${i}${j}max`)
  const minButton = document.querySelector(`.b${i}${j}min`)
  buttonDisabling(decButton)
  buttonDisabling(minButton)
  buttonEnabling(incButton)
  buttonEnabling(maxButton)
}

// Функции активации/деактивации кнопок
const buttonDisabling = (button) => {
  button.classList.add('disabled')
}
const buttonEnabling = (button) => {
  button.classList.remove('disabled')
}

// Функция натройки выставления значений оценок сравнений критериев с помощью колеса мыши
export const wheelTuning = (row, col, e) => {
  if (e.nativeEvent.wheelDelta > 0) {
    tuningIncreaseHandler(row, col, e)
  } else {
    tuningDecreaseHandler(row, col, e)
  }
}



const rngHandler = () => {
  randomValueGenerator()
  tableUpdate()
}





const AhpSidebar = () => {

  const history = useHistory()

  // Функция перевыбора критериев и альтернатив
  const reselectionHandler = async () => {
    history.push('/query/selection')
  }

  return(
    <div className={style2.sidebar}>
      <div className={style2.top}>
        <button className="btn" onClick={rngHandler}>Случ. значения</button>
        <button className="btn" onClick={reselectionHandler}>Перевыбор</button>
      </div>
      <div className={style2.bottom}>
        <button className="btn disabled">Посчитать суммы</button>
        <button className="btn disabled">Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;</button>
      </div>
    </div>
  )
}



export const AhpQueryCriteriaComparisonPage = () => {
  return (
    <div>
      <h3>Попарное сравнение критериев</h3>
      <AhpSidebar />
      <table className={style.criteria_comparison_table}>
        <thead>
          <tr>
            <th className={style.initial}></th>
            <th>Стоимость</th>
            <th>Климат</th>
            <th>Экология</th>
            <th>Безопасность</th>
            <th>Кухня</th>
            <th>Престиж</th>
            <th>Дорога</th>
            <th>Достопримечательности</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Стоимость</th>
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={0} col={1} />
            <AhpQueryCriteriaComparisonCellInput row={0} col={2} />
            <AhpQueryCriteriaComparisonCellInput row={0} col={3} />
            <AhpQueryCriteriaComparisonCellInput row={0} col={4} />
            <AhpQueryCriteriaComparisonCellInput row={0} col={5} />
            <AhpQueryCriteriaComparisonCellInput row={0} col={6} />
            <AhpQueryCriteriaComparisonCellInput row={0} col={7} />
          </tr>
          <tr>
            <th>Климат</th>
            <AhpQueryCriteriaComparisonCellOutput row={1} col={0} />
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={1} col={2} />
            <AhpQueryCriteriaComparisonCellInput row={1} col={3} />
            <AhpQueryCriteriaComparisonCellInput row={1} col={4} />
            <AhpQueryCriteriaComparisonCellInput row={1} col={5} />
            <AhpQueryCriteriaComparisonCellInput row={1} col={6} />
            <AhpQueryCriteriaComparisonCellInput row={1} col={7} />
          </tr>
          <tr>
            <th>Экология</th>
            <AhpQueryCriteriaComparisonCellOutput row={2} col={0} />
            <AhpQueryCriteriaComparisonCellOutput row={2} col={1} />
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={2} col={3} />
            <AhpQueryCriteriaComparisonCellInput row={2} col={4} />
            <AhpQueryCriteriaComparisonCellInput row={2} col={5} />
            <AhpQueryCriteriaComparisonCellInput row={2} col={6} />
            <AhpQueryCriteriaComparisonCellInput row={2} col={7} />
          </tr>
          <tr>
            <th>Безопасность</th>
            <AhpQueryCriteriaComparisonCellOutput row={3} col={0} />
            <AhpQueryCriteriaComparisonCellOutput row={3} col={1} />
            <AhpQueryCriteriaComparisonCellOutput row={3} col={2} />
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={3} col={4} />
            <AhpQueryCriteriaComparisonCellInput row={3} col={5} />
            <AhpQueryCriteriaComparisonCellInput row={3} col={6} />
            <AhpQueryCriteriaComparisonCellInput row={3} col={7} />
          </tr>
          <tr>
            <th>Кухня</th>
            <AhpQueryCriteriaComparisonCellOutput row={4} col={0} />
            <AhpQueryCriteriaComparisonCellOutput row={4} col={1} />
            <AhpQueryCriteriaComparisonCellOutput row={4} col={2} />
            <AhpQueryCriteriaComparisonCellOutput row={4} col={3} />
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={4} col={5} />
            <AhpQueryCriteriaComparisonCellInput row={4} col={6} />
            <AhpQueryCriteriaComparisonCellInput row={4} col={7} />
          </tr>
          <tr>
            <th>Престиж</th>
            <AhpQueryCriteriaComparisonCellOutput row={5} col={0} />
            <AhpQueryCriteriaComparisonCellOutput row={5} col={1} />
            <AhpQueryCriteriaComparisonCellOutput row={5} col={2} />
            <AhpQueryCriteriaComparisonCellOutput row={5} col={3} />
            <AhpQueryCriteriaComparisonCellOutput row={5} col={4} />
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={5} col={6} />
            <AhpQueryCriteriaComparisonCellInput row={5} col={7} />
          </tr>
          <tr>
            <th>Дорога</th>
            <AhpQueryCriteriaComparisonCellOutput row={6} col={0} />
            <AhpQueryCriteriaComparisonCellOutput row={6} col={1} />
            <AhpQueryCriteriaComparisonCellOutput row={6} col={2} />
            <AhpQueryCriteriaComparisonCellOutput row={6} col={3} />
            <AhpQueryCriteriaComparisonCellOutput row={6} col={4} />
            <AhpQueryCriteriaComparisonCellOutput row={6} col={5} />
            <AhpQueryCriteriaComparisonCellDiagonal />
            <AhpQueryCriteriaComparisonCellInput row={6} col={7} />
          </tr>
          <tr>
            <th>Достопримечательности</th>
            <AhpQueryCriteriaComparisonCellOutput row={7} col={0} />
            <AhpQueryCriteriaComparisonCellOutput row={7} col={1} />
            <AhpQueryCriteriaComparisonCellOutput row={7} col={2} />
            <AhpQueryCriteriaComparisonCellOutput row={7} col={3} />
            <AhpQueryCriteriaComparisonCellOutput row={7} col={4} />
            <AhpQueryCriteriaComparisonCellOutput row={7} col={5} />
            <AhpQueryCriteriaComparisonCellOutput row={7} col={6} />
            <AhpQueryCriteriaComparisonCellDiagonal />
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>СУММА:</th>
            <td><span className="sumOutput0"></span></td>
            <td><span className="sumOutput1"></span></td>
            <td><span className="sumOutput2"></span></td>
            <td><span className="sumOutput3"></span></td>
            <td><span className="sumOutput4"></span></td>
            <td><span className="sumOutput5"></span></td>
            <td><span className="sumOutput6"></span></td>
            <td><span className="sumOutput7"></span></td>
          </tr>
        </tfoot>
      </table>

      
      <AhpSidebar />

    </div>
  )
}
