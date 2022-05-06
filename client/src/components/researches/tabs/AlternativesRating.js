import { useEffect, useState } from 'react' 

import style from './AlternativesRating.module.scss'

export const AlternativesRating = ({ research }) => {

  const [currentCriterion, setCurrentCriterion] = useState(0)
  
  const currentCriterionSetter = (criterion) => {
    setCurrentCriterion(criterion)
  }

  const [popupActive, setPopupActive] = useState(false)
  const [popupCriterion, setPopupCriterion] = useState(0)
  const [popupRow, setPopupRow] = useState(0)
  const [popupCol, setPopupCol] = useState(0)

  const popup = (cc, row, col) => {
    setPopupActive(true)
    setPopupCriterion(cc)
    setPopupRow(row)
    setPopupCol(col)
  }

  // useEffect(() => {
  //   console.log(research)
  // }, [])

  return(
    <div className={style.alternatives_rating_container}>
      <div className={style.criterion_box}>
        <div className={style.title}>Критерий</div>
        {[...Array(research.criteria.length)].map((x, i) => 
          <label key={i} title={research.criteria[i]}>
            <input
              type="radio"
              name="criteria"
              className="with-gap"
              onChange={(e) => currentCriterionSetter(i, e)}
            />
            <span>{research.criteria[i]}</span>
          </label>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Критерий: </th>
            <th colSpan={research.alternatives.length}>{research.criteria[currentCriterion]}</th>
          </tr>
          <tr>
            <th className={style.initial}></th>
            {[...Array(research.alternatives.length)].map((x, i) => 
              <th key={i} title={research.alternatives[i]}>
                {research.alternatives[i]}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...Array(research.alternatives.length)].map((x, i) => 
            <CellRow 
              key={i}
              i={i}
              cc={currentCriterion}
              research={research}
              popup={popup}
            />
          )}
        </tbody>
      </table>
      {/* <AlternativesRatingPopup
        active={popupActive}
        setActive={setPopupActive}
        research={research}
        cc={popupCriterion}
        row={popupRow}
        col={popupCol}
      /> */}
    </div>
  )
}

const CellRow = ({ i, cc, research, popup }) => {
  return(
    <tr>
      <th title={research.alternatives[i]}>
        {research.alternatives[i]}
      </th>
      {[...Array(research.alternatives.length)].map((x, j) => {
        if (i < j) return (
          <td key={j} className={style.top} onClick={() => popup(cc, i, j)}>
            {MARK_MODEL[research.alternativesRating[cc][i][j]].string}
          </td>
        )
        if (i > j) return (
          <td key={j} className={style.bot} onClick={() => popup(cc, i, j)}>
            {MARK_MODEL[research.alternativesRating[cc][i][j]].string}
          </td>
        )
        if (i === j) return (
          <td key={j} className={style.diagonal} onClick={() => popup(cc, i, j)}>
            {MARK_MODEL[research.alternativesRating[cc][i][j]].string}
          </td>
        )
      })}
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
