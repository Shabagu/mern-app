import { normalizedCriteriaMatrix } from '../../pages/AhpQCriteriaNormalizationPage'
import style from './../../style/quickStyleFix.module.scss'

// Компонент ячейки нормированной таблицы попарного сравнения критериев
export const AhpCriteriaNormalizationCell = ({ row, col }) => {
  return(
    <td className={style.normalized}>
      <span className={`cell${row}${col}`}>
        {normalizedCriteriaMatrix[row][col]}
      </span>
    </td>
  )
}
