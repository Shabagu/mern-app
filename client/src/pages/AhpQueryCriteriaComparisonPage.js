// import { useHistory } from "react-router-dom"
// import { useHttp } from "../hooks/http.hook"
import style from './quickStyleFix.module.scss'

export const AhpQueryCriteriaComparisonPage = () => {
  
  // Создание класса значений
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

  // Заполнение массива значений
  const values = []
  for (let i = 0; i < 9; i++) {
    values[i] = new Value(1, 9 - i)
    values[16 - i] = new Value(9 - i, 1)
  }
  console.log(values)





  return (
    <div>
      <h3>Попарное сравнение критериев</h3>
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
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <input /><div className={style.cell_tuning}><button>&#129145;</button><button>&#129144;</button></div>
              </div>
            </td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Климат</th>
            <td className={style.below}></td>
            <td className={style.diagonal}>1</td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Экология</th>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.diagonal}>1</td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Безопасность</th>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.diagonal}>1</td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Кухня</th>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.diagonal}>1</td>
            <td><input /></td>
            <td><input /></td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Престиж</th>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.diagonal}>1</td>
            <td><input /></td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Дорога</th>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.diagonal}>1</td>
            <td><input /></td>
          </tr>
          <tr>
            <th>Достопримечательности</th>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
            <td className={style.below}></td>
              <td className={style.diagonal}>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
