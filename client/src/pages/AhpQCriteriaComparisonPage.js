import { AhpCriteriaComparison } from "../components/ahp/AhpCriteriaComparison"
import { AhpSidebar } from "../components/ahp/AhpSidebar"


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

// Состояние подсчёта суммы
export let isSumCalculated = false

// Значение сумм оценок критериев по столбцам
export let criteriaSumArray = []





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
  if (isSumCalculated) sumOutputUpdate()
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
  if (isSumCalculated) sumOutputUpdate()
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

  if (isSumCalculated) sumOutputUpdate()
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

  if (isSumCalculated) sumOutputUpdate()
}

// Функция натройки выставления значений оценок сравнений критериев с помощью колеса мыши
export const wheelTuning = (row, col, e) => {
  if (e.nativeEvent.wheelDelta > 0) {
    tuningIncreaseHandler(row, col, e)
  } else {
    tuningDecreaseHandler(row, col, e)
  }
}

// Функции активации/деактивации кнопок
const buttonDisabling = (button) => {
  button.classList.add('disabled')
}
const buttonEnabling = (button) => {
  button.classList.remove('disabled')
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
      indexValueMatrix[i][j] = randomIntegerInRange(0, 16)
      indexValueMatrix[j][i] = reversArray[indexValueMatrix[i][j]]
    }
    indexValueMatrix[i][i] = 8
  }
}

// Сброс
const resetValueGenerator = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      indexValueMatrix[i][j] = 8
    }
  }
}

// Обновление вывода значений парных сравнений критериев
const tableOutputUpdate = () => {
  const outputMatrix = [[],[],[],[],[],[],[],[]]
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      outputMatrix[i][j] = document.querySelector(`.valueOutput${i}${j}`)
      if (outputMatrix[i][j]) {
        outputMatrix[i][j].textContent = valuesModel[indexValueMatrix[i][j]].string
        if (i < j) {
          const incButton = document.querySelector(`.b${i}${j}inc`)
          const decButton = document.querySelector(`.b${i}${j}dec`)
          const maxButton = document.querySelector(`.b${i}${j}max`)
          const minButton = document.querySelector(`.b${i}${j}min`)
          if (indexValueMatrix[i][j] === 0) {
            buttonDisabling(decButton)
            buttonDisabling(minButton)
            buttonEnabling(incButton)
            buttonEnabling(maxButton)
          } else if (indexValueMatrix[i][j] === 16) {
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
const sumOutputUpdate = () => {
  const criteriaSumValues = [0, 0, 0, 0, 0, 0, 0, 0]
  const criteriaSumRoundedValues = []
  const sumOutputArray = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      criteriaSumValues[i] += valuesModel[indexValueMatrix[j][i]].number
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

  criteriaSumArray = criteriaSumValues
}



// Обработчик события нажатия на кнопку случайной генерации значений оценок сравнивания критериев
export const randomGenerationHandler = () => {
  randomValueGenerator()
  tableOutputUpdate()
  if (isSumCalculated) sumOutputUpdate()
}

// Обработчик события нажатия на кнопку сброса значений
export const resetHandler = () => {
  resetValueGenerator()
  tableOutputUpdate()
  if (isSumCalculated) sumOutputUpdate()
}

// Обработчик события нажатия на кнопку расчёта суммы
export const criteriaSumCalculation = () => {
  isSumCalculated = true
  sumOutputUpdate()

  const sumButton = document.querySelector('.calculation')
  const normalizationButton = document.querySelector('.normalization')
  buttonDisabling(sumButton)
  buttonEnabling(normalizationButton)
}










export const AhpQCriteriaComparisonPage = () => {

  return (
    <div>
      <AhpCriteriaComparison />
      <AhpSidebar />
    </div>
  )
}
