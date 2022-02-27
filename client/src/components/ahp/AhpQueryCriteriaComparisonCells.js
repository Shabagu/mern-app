import {
  tuningIncreaseHandler,
  tuningDecreaseHandler,
  tuningMaxHandler,
  tuningMinHandler,
  wheelTuning,

  indexValueMatrix,
  valuesModel
} from '../../pages/AhpQueryCriteriaComparisonPage'

import style from './../../style/quickStyleFix.module.scss'


// Компонент ячейки таблицы попарного сравнения критериев для ввода (над диагональю)
export const AhpQueryCriteriaComparisonCellInput = ({ row, col }) => {
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
          <button className={`btn b${row}${col}inc`}
            onClick={(e) => tuningIncreaseHandler(row, col, e)}
          >
            &#129145;
          </button>
          <button className={`btn b${row}${col}dec`}
            onClick={(e) => tuningDecreaseHandler(row, col, e)}
          >
            &#129144;
          </button>
        </div>
        <div className={style.cell_tuning_minmax}>
          <button className={`btn b${row}${col}max`}
            onClick={(e) => tuningMaxHandler(row, col, e)}
          >
            MAX
          </button>
          <button className={`btn b${row}${col}min`}
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
