import {
  // Functions
  tuningIncreaseHandler, tuningDecreaseHandler, tuningMaxHandler, tuningMinHandler, wheelTuning,
  // Constans
  indexValueMatrix, valuesModel } from '../../pages/AhpQueryCriteriaComparisonPage'

import style from './../../style/quickStyleFix.module.scss'


// Компонент ячейки таблицы попарного сравнения критериев для ввода (над диагональю)
export const AhpQueryCriteriaComparisonCellInput = ({ row, col }) => {

  const btnDisableCondition = {}
  if (indexValueMatrix[row][col] === 16) {
    btnDisableCondition.incMax = 'disabled'
    btnDisableCondition.decMin = ''
  } else if (indexValueMatrix[row][col] === 0) {
    btnDisableCondition.incMax = ''
    btnDisableCondition.decMin = 'disabled'
  } else {
    btnDisableCondition.incMax = ''
    btnDisableCondition.decMin = ''
  }

  return(
    <td>
      <div className={style.cell}
        onWheel={(e) => wheelTuning(row, col, e)}
      >
        <div className={style.value_box}>
          <span className={`valueOutput${row}${col}`}>
            {valuesModel[indexValueMatrix[row][col]].string}
          </span>
        </div>
        <div className={style.cell_tuning}>
          <button
            className={`btn b${row}${col}inc ${btnDisableCondition.incMax}`}
            onClick={(e) => tuningIncreaseHandler(row, col, e)}
          >
            &#129145; {/* Increase arrow */}
          </button>
          <button
            className={`btn b${row}${col}dec ${btnDisableCondition.decMin}`}
            onClick={(e) => tuningDecreaseHandler(row, col, e)}
          >
            &#129144; {/* Decrease arrow */}
          </button>
        </div>
        <div className={style.cell_tuning_minmax}>
          <button
            className={`btn b${row}${col}max ${btnDisableCondition.incMax}`}
            onClick={(e) => tuningMaxHandler(row, col, e)}
          >
            MAX
          </button>
          <button
            className={`btn b${row}${col}min ${btnDisableCondition.decMin}`}
            onClick={(e) => tuningMinHandler(row, col, e)}
          >
            MIN
          </button>
        </div>
      </div>
    </td>
  )
}


// Компонент ячейки таблицы попарного сравнения критериев для вывода (под диагональю)
export const AhpQueryCriteriaComparisonCellOutput = ({ row, col }) => {
  return(
    <td className={style.below}>
      <span className={`valueOutput${row}${col}`}>
        {valuesModel[indexValueMatrix[row][col]].string}
      </span>
    </td>
  )
}

// Компонент диагональной ячейки таблицы попарного сравнения критериев
export const AhpQueryCriteriaComparisonCellDiagonal = () => {
  return(
    <td className={style.diagonal}>1</td>
  )
}
