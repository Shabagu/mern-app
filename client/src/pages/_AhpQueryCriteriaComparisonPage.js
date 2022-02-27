// import { useHistory } from "react-router-dom"
// import { useHttp } from "../hooks/http.hook"
import style from './../style/quickStyleFix.module.scss'
import style2 from './../style/AhpSidebar.module.scss'

export const AhpQueryCriteriaComparisonPage = () => {

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
  const valuesModel = []
  for (let i = 0; i < 9; i++) {
    valuesModel[i] = new Value(1, 9 - i)
    valuesModel[16 - i] = new Value(9 - i, 1)
  }
  //    VVV Массив сопоставления индексов и значений оценок ЛПР                  VVV 
  //    >>> index:   0   1   2   3   4   5   6   7  '8'  9 10 11 12 13 14 15 16    <<<
  //    >>> value: 1/9 1/8 1/7 1/6 1/5 1/4 1/3 1/2  '1'  2  3  4  5  6  7  8  9    <<<

  // Заполнение матрицы значений таблицы (по индексам) значением по умолчанию - 1 (индекс: 8)
  let indexValueMatrix = [[],[],[],[],[],[],[],[]]
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      indexValueMatrix[i][j] = 8
    }
  }

  // Функция увеличения значения оценки сравнения критериев (+)
  const tuningIncreaseHandler = async (i, j) => {
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
  const tuningDecreaseHandler = async (i, j) => {
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
    const tuningMaxHandler = async (i, j) => {

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
    const tuningMinHandler = async (i, j) => {

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
  






    // Функция случайной генерации значений оценок сравнения критериев
    // ???












  const AhpSidebar = () => {
    return(
      <div className={style2.sidebar}>
        <div className={style2.top}>
          <button className="btn">Случ. значения</button>
          <button className="btn">Перевыбор</button>
        </div>
  
        <div className={style2.bottom}>
          <button className="btn">Посчитать суммы</button>
          <button className="btn">Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;</button>
        </div>
      </div>
    )
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
                  <button className="btn b01inc" onClick={(e) => tuningIncreaseHandler(0, 1, e)}>&#129145;</button>
                  <button className="btn b01dec" onClick={(e) => tuningDecreaseHandler(0, 1, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b01max" onClick={(e) => tuningMaxHandler(0, 1, e)}>MAX</button>
                  <button className="btn b01min" onClick={(e) => tuningMinHandler(0, 1, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput02">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b02inc" onClick={(e) => tuningIncreaseHandler(0, 2, e)}>&#129145;</button>
                  <button className="btn b02dec" onClick={(e) => tuningDecreaseHandler(0, 2, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b02max" onClick={(e) => tuningMaxHandler(0, 2, e)}>MAX</button>
                  <button className="btn b02min" onClick={(e) => tuningMinHandler(0, 2, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput03">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b03inc" onClick={(e) => tuningIncreaseHandler(0, 3, e)}>&#129145;</button>
                  <button className="btn b03dec" onClick={(e) => tuningDecreaseHandler(0, 3, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b03max" onClick={(e) => tuningMaxHandler(0, 3, e)}>MAX</button>
                  <button className="btn b03min" onClick={(e) => tuningMinHandler(0, 3, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput04">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b04inc" onClick={(e) => tuningIncreaseHandler(0, 4, e)}>&#129145;</button>
                  <button className="btn b04dec" onClick={(e) => tuningDecreaseHandler(0, 4, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b04max" onClick={(e) => tuningMaxHandler(0, 4, e)}>MAX</button>
                  <button className="btn b04min" onClick={(e) => tuningMinHandler(0, 4, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput05">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b05inc" onClick={(e) => tuningIncreaseHandler(0, 5, e)}>&#129145;</button>
                  <button className="btn b05dec" onClick={(e) => tuningDecreaseHandler(0, 5, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b05max" onClick={(e) => tuningMaxHandler(0, 5, e)}>MAX</button>
                  <button className="btn b05min" onClick={(e) => tuningMinHandler(0, 5, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput06">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b06inc" onClick={(e) => tuningIncreaseHandler(0, 6, e)}>&#129145;</button>
                  <button className="btn b06dec" onClick={(e) => tuningDecreaseHandler(0, 6, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b06max" onClick={(e) => tuningMaxHandler(0, 6, e)}>MAX</button>
                  <button className="btn b06min" onClick={(e) => tuningMinHandler(0, 6, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput07">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b07inc" onClick={(e) => tuningIncreaseHandler(0, 7, e)}>&#129145;</button>
                  <button className="btn b07dec" onClick={(e) => tuningDecreaseHandler(0, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b07max" onClick={(e) => tuningMaxHandler(0, 7, e)}>MAX</button>
                  <button className="btn b07min" onClick={(e) => tuningMinHandler(0, 7, e)}>MIN</button>
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
                  <button className="btn b12inc" onClick={(e) => tuningIncreaseHandler(1, 2, e)}>&#129145;</button>
                  <button className="btn b12dec" onClick={(e) => tuningDecreaseHandler(1, 2, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b12max" onClick={(e) => tuningMaxHandler(1, 2, e)}>MAX</button>
                  <button className="btn b12min" onClick={(e) => tuningMinHandler(1, 2, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput13">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b13inc" onClick={(e) => tuningIncreaseHandler(1, 3, e)}>&#129145;</button>
                  <button className="btn b13dec" onClick={(e) => tuningDecreaseHandler(1, 3, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b13max" onClick={(e) => tuningMaxHandler(1, 3, e)}>MAX</button>
                  <button className="btn b13min" onClick={(e) => tuningMinHandler(1, 3, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput14">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b14inc" onClick={(e) => tuningIncreaseHandler(1, 4, e)}>&#129145;</button>
                  <button className="btn b14dec" onClick={(e) => tuningDecreaseHandler(1, 4, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b14max" onClick={(e) => tuningMaxHandler(1, 4, e)}>MAX</button>
                  <button className="btn b14min" onClick={(e) => tuningMinHandler(1, 4, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput15">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b15inc" onClick={(e) => tuningIncreaseHandler(1, 5, e)}>&#129145;</button>
                  <button className="btn b15dec" onClick={(e) => tuningDecreaseHandler(1, 5, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b15max" onClick={(e) => tuningMaxHandler(1, 5, e)}>MAX</button>
                  <button className="btn b15min" onClick={(e) => tuningMinHandler(1, 5, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput16">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b16inc" onClick={(e) => tuningIncreaseHandler(1, 6, e)}>&#129145;</button>
                  <button className="btn b16dec" onClick={(e) => tuningDecreaseHandler(1, 6, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b16max" onClick={(e) => tuningMaxHandler(1, 6, e)}>MAX</button>
                  <button className="btn b16min" onClick={(e) => tuningMinHandler(1, 6, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput17">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b17inc" onClick={(e) => tuningIncreaseHandler(1, 7, e)}>&#129145;</button>
                  <button className="btn b17dec" onClick={(e) => tuningDecreaseHandler(1, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b17max" onClick={(e) => tuningMaxHandler(1, 7, e)}>MAX</button>
                  <button className="btn b17min" onClick={(e) => tuningMinHandler(1, 7, e)}>MIN</button>
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
                  <button className="btn b23inc" onClick={(e) => tuningIncreaseHandler(2, 3, e)}>&#129145;</button>
                  <button className="btn b23dec" onClick={(e) => tuningDecreaseHandler(2, 3, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b23max" onClick={(e) => tuningMaxHandler(2, 3, e)}>MAX</button>
                  <button className="btn b23min" onClick={(e) => tuningMinHandler(2, 3, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput24">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b24inc" onClick={(e) => tuningIncreaseHandler(2, 4, e)}>&#129145;</button>
                  <button className="btn b24dec" onClick={(e) => tuningDecreaseHandler(2, 4, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b24max" onClick={(e) => tuningMaxHandler(2, 4, e)}>MAX</button>
                  <button className="btn b24min" onClick={(e) => tuningMinHandler(2, 4, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput25">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b25inc" onClick={(e) => tuningIncreaseHandler(2, 5, e)}>&#129145;</button>
                  <button className="btn b25dec" onClick={(e) => tuningDecreaseHandler(2, 5, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b25max" onClick={(e) => tuningMaxHandler(2, 5, e)}>MAX</button>
                  <button className="btn b25min" onClick={(e) => tuningMinHandler(2, 5, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput26">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b26inc" onClick={(e) => tuningIncreaseHandler(2, 6, e)}>&#129145;</button>
                  <button className="btn b26dec" onClick={(e) => tuningDecreaseHandler(2, 6, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b26max" onClick={(e) => tuningMaxHandler(2, 6, e)}>MAX</button>
                  <button className="btn b26min" onClick={(e) => tuningMinHandler(2, 6, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput27">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b27inc" onClick={(e) => tuningIncreaseHandler(2, 7, e)}>&#129145;</button>
                  <button className="btn b27dec" onClick={(e) => tuningDecreaseHandler(2, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b27max" onClick={(e) => tuningMaxHandler(2, 7, e)}>MAX</button>
                  <button className="btn b27min" onClick={(e) => tuningMinHandler(2, 7, e)}>MIN</button>
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
                  <button className="btn b34inc" onClick={(e) => tuningIncreaseHandler(3, 4, e)}>&#129145;</button>
                  <button className="btn b34dec" onClick={(e) => tuningDecreaseHandler(3, 4, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b34max" onClick={(e) => tuningMaxHandler(3, 4, e)}>MAX</button>
                  <button className="btn b34min" onClick={(e) => tuningMinHandler(3, 4, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput35">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b35inc" onClick={(e) => tuningIncreaseHandler(3, 5, e)}>&#129145;</button>
                  <button className="btn b35dec" onClick={(e) => tuningDecreaseHandler(3, 5, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b35max" onClick={(e) => tuningMaxHandler(3, 5, e)}>MAX</button>
                  <button className="btn b35min" onClick={(e) => tuningMinHandler(3, 5, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput36">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b36inc" onClick={(e) => tuningIncreaseHandler(3, 6, e)}>&#129145;</button>
                  <button className="btn b36dec" onClick={(e) => tuningDecreaseHandler(3, 6, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b36max" onClick={(e) => tuningMaxHandler(3, 6, e)}>MAX</button>
                  <button className="btn b36min" onClick={(e) => tuningMinHandler(3, 6, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput37">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b37inc" onClick={(e) => tuningIncreaseHandler(3, 7, e)}>&#129145;</button>
                  <button className="btn b37dec" onClick={(e) => tuningDecreaseHandler(3, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b37max" onClick={(e) => tuningMaxHandler(3, 7, e)}>MAX</button>
                  <button className="btn b37min" onClick={(e) => tuningMinHandler(3, 7, e)}>MIN</button>
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
                  <button className="btn b45inc" onClick={(e) => tuningIncreaseHandler(4, 5, e)}>&#129145;</button>
                  <button className="btn b45dec" onClick={(e) => tuningDecreaseHandler(4, 5, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b45max" onClick={(e) => tuningMaxHandler(4, 5, e)}>MAX</button>
                  <button className="btn b45min" onClick={(e) => tuningMinHandler(4, 5, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput46">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b46inc" onClick={(e) => tuningIncreaseHandler(4, 6, e)}>&#129145;</button>
                  <button className="btn b46dec" onClick={(e) => tuningDecreaseHandler(4, 6, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b46max" onClick={(e) => tuningMaxHandler(4, 6, e)}>MAX</button>
                  <button className="btn b46min" onClick={(e) => tuningMinHandler(4, 6, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput47">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b47inc" onClick={(e) => tuningIncreaseHandler(4, 7, e)}>&#129145;</button>
                  <button className="btn b47dec" onClick={(e) => tuningDecreaseHandler(4, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b47max" onClick={(e) => tuningMaxHandler(4, 7, e)}>MAX</button>
                  <button className="btn b47min" onClick={(e) => tuningMinHandler(4, 7, e)}>MIN</button>
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
                  <button className="btn b56inc" onClick={(e) => tuningIncreaseHandler(5, 6, e)}>&#129145;</button>
                  <button className="btn b56dec" onClick={(e) => tuningDecreaseHandler(5, 6, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b56max" onClick={(e) => tuningMaxHandler(5, 6, e)}>MAX</button>
                  <button className="btn b56min" onClick={(e) => tuningMinHandler(5, 6, e)}>MIN</button>
                </div>
              </div>
            </td>
            <td>
              <div className={style.cell}>
                <div className={style.value_box}><span className="valueOutput57">1</span></div>
                <div className={style.cell_tuning}>
                  <button className="btn b57inc" onClick={(e) => tuningIncreaseHandler(5, 7, e)}>&#129145;</button>
                  <button className="btn b57dec" onClick={(e) => tuningDecreaseHandler(5, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b57max" onClick={(e) => tuningMaxHandler(5, 7, e)}>MAX</button>
                  <button className="btn b57min" onClick={(e) => tuningMinHandler(5, 7, e)}>MIN</button>
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
                  <button className="btn b67inc" onClick={(e) => tuningIncreaseHandler(6, 7, e)}>&#129145;</button>
                  <button className="btn b67dec" onClick={(e) => tuningDecreaseHandler(6, 7, e)}>&#129144;</button>
                </div>
                <div className={style.cell_tuning_minmax}>
                  <button className="btn b67max" onClick={(e) => tuningMaxHandler(6, 7, e)}>MAX</button>
                  <button className="btn b67min" onClick={(e) => tuningMinHandler(6, 7, e)}>MIN</button>
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
