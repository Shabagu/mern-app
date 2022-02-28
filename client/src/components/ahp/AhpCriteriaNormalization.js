import {
  AhpCriteriaNormalizationCell
} from './AhpCriteriaNormalizationCells'

import style from './../../style/quickStyleFix.module.scss'

export const AhpCriteriaNormalization = () => {

  return(
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
            <AhpCriteriaNormalizationCell row={0} col={0} />
            <AhpCriteriaNormalizationCell row={0} col={1} />
            <AhpCriteriaNormalizationCell row={0} col={2} />
            <AhpCriteriaNormalizationCell row={0} col={3} />
            <AhpCriteriaNormalizationCell row={0} col={4} />
            <AhpCriteriaNormalizationCell row={0} col={5} />
            <AhpCriteriaNormalizationCell row={0} col={6} />
            <AhpCriteriaNormalizationCell row={0} col={7} />
          </tr>
          <tr>
            <th>Климат</th>
            <AhpCriteriaNormalizationCell row={1} col={0} />
            <AhpCriteriaNormalizationCell row={1} col={1} />
            <AhpCriteriaNormalizationCell row={1} col={2} />
            <AhpCriteriaNormalizationCell row={1} col={3} />
            <AhpCriteriaNormalizationCell row={1} col={4} />
            <AhpCriteriaNormalizationCell row={1} col={5} />
            <AhpCriteriaNormalizationCell row={1} col={6} />
            <AhpCriteriaNormalizationCell row={1} col={7} />
          </tr>
          <tr>
            <th>Экология</th>
            <AhpCriteriaNormalizationCell row={2} col={0} />
            <AhpCriteriaNormalizationCell row={2} col={1} />
            <AhpCriteriaNormalizationCell row={2} col={2} />
            <AhpCriteriaNormalizationCell row={2} col={3} />
            <AhpCriteriaNormalizationCell row={2} col={4} />
            <AhpCriteriaNormalizationCell row={2} col={5} />
            <AhpCriteriaNormalizationCell row={2} col={6} />
            <AhpCriteriaNormalizationCell row={2} col={7} />
          </tr>
          <tr>
            <th>Безопасность</th>
            <AhpCriteriaNormalizationCell row={3} col={0} />
            <AhpCriteriaNormalizationCell row={3} col={1} />
            <AhpCriteriaNormalizationCell row={3} col={2} />
            <AhpCriteriaNormalizationCell row={3} col={3} />
            <AhpCriteriaNormalizationCell row={3} col={4} />
            <AhpCriteriaNormalizationCell row={3} col={5} />
            <AhpCriteriaNormalizationCell row={3} col={6} />
            <AhpCriteriaNormalizationCell row={3} col={7} />
          </tr>
          <tr>
            <th>Кухня</th>
            <AhpCriteriaNormalizationCell row={4} col={0} />
            <AhpCriteriaNormalizationCell row={4} col={1} />
            <AhpCriteriaNormalizationCell row={4} col={2} />
            <AhpCriteriaNormalizationCell row={4} col={3} />
            <AhpCriteriaNormalizationCell row={4} col={4} />
            <AhpCriteriaNormalizationCell row={4} col={5} />
            <AhpCriteriaNormalizationCell row={4} col={6} />
            <AhpCriteriaNormalizationCell row={4} col={7} />
          </tr>
          <tr>
            <th>Престиж</th>
            <AhpCriteriaNormalizationCell row={5} col={0} />
            <AhpCriteriaNormalizationCell row={5} col={1} />
            <AhpCriteriaNormalizationCell row={5} col={2} />
            <AhpCriteriaNormalizationCell row={5} col={3} />
            <AhpCriteriaNormalizationCell row={5} col={4} />
            <AhpCriteriaNormalizationCell row={5} col={5} />
            <AhpCriteriaNormalizationCell row={5} col={6} />
            <AhpCriteriaNormalizationCell row={5} col={7} />
          </tr>
          <tr>
            <th>Дорога</th>
            <AhpCriteriaNormalizationCell row={6} col={0} />
            <AhpCriteriaNormalizationCell row={6} col={1} />
            <AhpCriteriaNormalizationCell row={6} col={2} />
            <AhpCriteriaNormalizationCell row={6} col={3} />
            <AhpCriteriaNormalizationCell row={6} col={4} />
            <AhpCriteriaNormalizationCell row={6} col={5} />
            <AhpCriteriaNormalizationCell row={6} col={6} />
            <AhpCriteriaNormalizationCell row={6} col={7} />
          </tr>
          <tr>
            <th>Достопримечательности</th>
            <AhpCriteriaNormalizationCell row={7} col={0} />
            <AhpCriteriaNormalizationCell row={7} col={1} />
            <AhpCriteriaNormalizationCell row={7} col={2} />
            <AhpCriteriaNormalizationCell row={7} col={3} />
            <AhpCriteriaNormalizationCell row={7} col={4} />
            <AhpCriteriaNormalizationCell row={7} col={5} />
            <AhpCriteriaNormalizationCell row={7} col={6} />
            <AhpCriteriaNormalizationCell row={7} col={7} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}
