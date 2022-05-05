import style from './CriteriaRating.module.scss'

export const CriteriaRating = ({ research }) => {

  return(
    <div className={style.criteria_rating_container}>
      <table>
        <thead>
          <tr>
            <th className={style.initial}></th>
            {[...Array(research.criteria.length)].map((x, i) =>
              <th key={i} title={research.criteria[i]}>
                {research.criteria[i]}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(research.criteria.length)].map((x, i) => 
            <CellRow
              key={i}
              i={i}
              research={research}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

const CellRow = ({ i, research }) => {
  return(
    <tr>
      <th title={research.criteria[i]}>
        {research.criteria[i]}
      </th>
      {[...Array(research.criteria.length)].map((x, j) =>
        <td>
          {MARK_MODEL[research.criteriaRating[i][j]].string}
        </td>
      )}
    </tr>
  )
}

// Модель оценок 
class Mark {
  constructor(numerator, denominator) {
    if (denominator === 1) { this.string = `${numerator}` }
    else { this.string = `${numerator}/${denominator}` }
    this.number = numerator / denominator
  }
}
let markModel = []
for (let i = 0; i < 9; i++) {
  markModel[i] = new Mark(1, 9 - i)
  markModel[16 - i] = new Mark(9 - i, 1)
}
const MARK_MODEL = markModel
