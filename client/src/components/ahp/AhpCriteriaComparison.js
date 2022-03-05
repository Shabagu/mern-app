import {
  AhpCriteriaComparisonCellInput,
  AhpCriteriaComparisonCellOutput,
  AhpCriteriaComparisonCellDiagonal
} from './AhpCriteriaComparisonCells'

import style from './AhpCriteriaComparison.module.scss'



export const AhpCriteriaComparison = () => {  

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
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={0} col={1} />
            <AhpCriteriaComparisonCellInput row={0} col={2} />
            <AhpCriteriaComparisonCellInput row={0} col={3} />
            <AhpCriteriaComparisonCellInput row={0} col={4} />
            <AhpCriteriaComparisonCellInput row={0} col={5} />
            <AhpCriteriaComparisonCellInput row={0} col={6} />
            <AhpCriteriaComparisonCellInput row={0} col={7} />
          </tr>
          <tr>
            <th>Климат</th>
            <AhpCriteriaComparisonCellOutput row={1} col={0} />
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={1} col={2} />
            <AhpCriteriaComparisonCellInput row={1} col={3} />
            <AhpCriteriaComparisonCellInput row={1} col={4} />
            <AhpCriteriaComparisonCellInput row={1} col={5} />
            <AhpCriteriaComparisonCellInput row={1} col={6} />
            <AhpCriteriaComparisonCellInput row={1} col={7} />
          </tr>
          <tr>
            <th>Экология</th>
            <AhpCriteriaComparisonCellOutput row={2} col={0} />
            <AhpCriteriaComparisonCellOutput row={2} col={1} />
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={2} col={3} />
            <AhpCriteriaComparisonCellInput row={2} col={4} />
            <AhpCriteriaComparisonCellInput row={2} col={5} />
            <AhpCriteriaComparisonCellInput row={2} col={6} />
            <AhpCriteriaComparisonCellInput row={2} col={7} />
          </tr>
          <tr>
            <th>Безопасность</th>
            <AhpCriteriaComparisonCellOutput row={3} col={0} />
            <AhpCriteriaComparisonCellOutput row={3} col={1} />
            <AhpCriteriaComparisonCellOutput row={3} col={2} />
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={3} col={4} />
            <AhpCriteriaComparisonCellInput row={3} col={5} />
            <AhpCriteriaComparisonCellInput row={3} col={6} />
            <AhpCriteriaComparisonCellInput row={3} col={7} />
          </tr>
          <tr>
            <th>Кухня</th>
            <AhpCriteriaComparisonCellOutput row={4} col={0} />
            <AhpCriteriaComparisonCellOutput row={4} col={1} />
            <AhpCriteriaComparisonCellOutput row={4} col={2} />
            <AhpCriteriaComparisonCellOutput row={4} col={3} />
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={4} col={5} />
            <AhpCriteriaComparisonCellInput row={4} col={6} />
            <AhpCriteriaComparisonCellInput row={4} col={7} />
          </tr>
          <tr>
            <th>Престиж</th>
            <AhpCriteriaComparisonCellOutput row={5} col={0} />
            <AhpCriteriaComparisonCellOutput row={5} col={1} />
            <AhpCriteriaComparisonCellOutput row={5} col={2} />
            <AhpCriteriaComparisonCellOutput row={5} col={3} />
            <AhpCriteriaComparisonCellOutput row={5} col={4} />
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={5} col={6} />
            <AhpCriteriaComparisonCellInput row={5} col={7} />
          </tr>
          <tr>
            <th>Дорога</th>
            <AhpCriteriaComparisonCellOutput row={6} col={0} />
            <AhpCriteriaComparisonCellOutput row={6} col={1} />
            <AhpCriteriaComparisonCellOutput row={6} col={2} />
            <AhpCriteriaComparisonCellOutput row={6} col={3} />
            <AhpCriteriaComparisonCellOutput row={6} col={4} />
            <AhpCriteriaComparisonCellOutput row={6} col={5} />
            <AhpCriteriaComparisonCellDiagonal />
            <AhpCriteriaComparisonCellInput row={6} col={7} />
          </tr>
          <tr>
            <th>Достопримечательности</th>
            <AhpCriteriaComparisonCellOutput row={7} col={0} />
            <AhpCriteriaComparisonCellOutput row={7} col={1} />
            <AhpCriteriaComparisonCellOutput row={7} col={2} />
            <AhpCriteriaComparisonCellOutput row={7} col={3} />
            <AhpCriteriaComparisonCellOutput row={7} col={4} />
            <AhpCriteriaComparisonCellOutput row={7} col={5} />
            <AhpCriteriaComparisonCellOutput row={7} col={6} />
            <AhpCriteriaComparisonCellDiagonal />
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
    </div>
  )
}
