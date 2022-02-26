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
  //   0   1   2   3   4   5   6   7  8  9 10 11 12 13 14 15 16
  // 1/9 1/8 1/7 1/6 1/5 1/4 1/3 1/2  1  2  3  4  5  6  7  8  9
  const valuesModel = []
  for (let i = 0; i < 9; i++) {
    valuesModel[i] = new Value(1, 9 - i)
    valuesModel[16 - i] = new Value(9 - i, 1)
  }

  // Массив значений таблицы
  let values = [[],[],[],[],[],[],[],[]]
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      values[i][j] = 8
    }
  }

  // Функция увеличения значения оценки сравнения критериев
  const tuningIncreaseHandler = async (i, j) => {
    const currentValue = values[i][j]
    if (currentValue < 16) {
      const outputCell = document.querySelector(`.valueOutput${i}${j}`)
      const newValue = currentValue + 1
      values[i][j] = newValue
      outputCell.textContent = valuesModel[newValue].string
      
      const outputReversCell = document.querySelector(`.valueOutput${j}${i}`)
      if (newValue > 8) {
        const newReversValue = 9 - valuesModel[newValue].number
        values[j][i] = newReversValue
        outputReversCell.textContent = valuesModel[newReversValue].string
      } else {
        const newReversValue = 7 + Number(valuesModel[newValue].string.slice(-1))
        values[j][i] = newReversValue
        outputReversCell.textContent = valuesModel[newReversValue].string
      }
    }
  }

  // Функция уменьшения значения оценки сравнения критериев
  const tuningDecreaseHandler = async (i, j) => {
    const currentValue = values[i][j]
    if (currentValue > 0) {
      const outputCell = document.querySelector(`.valueOutput${i}${j}`)
      const newValue = currentValue - 1
      values[i][j] = newValue
      outputCell.textContent = valuesModel[newValue].string

      const outputReversCell = document.querySelector(`.valueOutput${j}${i}`)
      if (newValue < 8) {
        const newReversValue = 7 + Number(valuesModel[newValue].string.slice(-1))
        values[j][i] = newReversValue
        outputReversCell.textContent = valuesModel[newReversValue].string
      } else {
        const newReversValue = 9 - valuesModel[newValue].number
        values[j][i] = newReversValue
        outputReversCell.textContent = valuesModel[newReversValue].string
      }
    }
  }



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
                <div className={style.value_box}><span className="valueOutput01">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 1, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 1, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput02">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 2, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 2, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput03">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 3, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 3, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput04">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 4, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 4, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput05">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 5, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 5, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput06">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 6, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 6, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput07">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(0, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(0, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Климат</th>
            <td className={style.below}><span className="valueOutput10">1</span></td>
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput12">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(1, 2, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(1, 2, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput13">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(1, 3, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(1, 3, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput14">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(1, 4, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(1, 4, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput15">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(1, 5, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(1, 5, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput16">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(1, 6, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(1, 6, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput17">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(1, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(1, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Экология</th>
            <td className={style.below}><span className="valueOutput20">1</span></td>
            <td className={style.below}><span className="valueOutput21">1</span></td>
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput23">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(2, 3, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(2, 3, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput24">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(2, 4, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(2, 4, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput25">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(2, 5, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(2, 5, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput26">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(2, 6, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(2, 6, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput27">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(2, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(2, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Безопасность</th>
            <td className={style.below}><span className="valueOutput30">1</span></td>
            <td className={style.below}><span className="valueOutput31">1</span></td>
            <td className={style.below}><span className="valueOutput32">1</span></td>
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput34">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(3, 4, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(3, 4, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput35">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(3, 5, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(3, 5, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput36">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(3, 6, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(3, 6, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput37">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(3, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(3, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Кухня</th>
            <td className={style.below}><span className="valueOutput40">1</span></td>
            <td className={style.below}><span className="valueOutput41">1</span></td>
            <td className={style.below}><span className="valueOutput42">1</span></td>
            <td className={style.below}><span className="valueOutput43">1</span></td>
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput45">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(4, 5, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(4, 5, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput46">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(4, 6, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(4, 6, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput47">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(4, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(4, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Престиж</th>
            <td className={style.below}><span className="valueOutput50">1</span></td>
            <td className={style.below}><span className="valueOutput51">1</span></td>
            <td className={style.below}><span className="valueOutput52">1</span></td>
            <td className={style.below}><span className="valueOutput53">1</span></td>
            <td className={style.below}><span className="valueOutput54">1</span></td>
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput56">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(5, 6, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(5, 6, e)}>&#129144;</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput57">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(5, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(5, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Дорога</th>
            <td className={style.below}><span className="valueOutput60">1</span></td>
            <td className={style.below}><span className="valueOutput61">1</span></td>
            <td className={style.below}><span className="valueOutput62">1</span></td>
            <td className={style.below}><span className="valueOutput63">1</span></td>
            <td className={style.below}><span className="valueOutput64">1</span></td>
            <td className={style.below}><span className="valueOutput65">1</span></td>
            <td className={style.diagonal}>1</td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput67">1</span></div>
                <div className={style.cell_tuning}>
                  <button onClick={(e) => tuningIncreaseHandler(6, 7, e)}>&#129145;</button>
                  <button onClick={(e) => tuningDecreaseHandler(6, 7, e)}>&#129144;</button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Достопримечательности</th>
            <td className={style.below}><span className="valueOutput70">1</span></td>
            <td className={style.below}><span className="valueOutput71">1</span></td>
            <td className={style.below}><span className="valueOutput72">1</span></td>
            <td className={style.below}><span className="valueOutput73">1</span></td>
            <td className={style.below}><span className="valueOutput74">1</span></td>
            <td className={style.below}><span className="valueOutput75">1</span></td>
            <td className={style.below}><span className="valueOutput76">1</span></td>
            <td className={style.diagonal}>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
