import { useState } from 'react'

import style from './CriteriaRating.module.scss'

export const CriteriaRating = ({ research }) => {

  const [popupActive, setPopupActive] = useState(false)
  const [popupRow, setPopupRow] = useState(0)
  const [popupCol, setPopupCol] = useState(0)

  const popup = (row, col) => {
    setPopupActive(true)
    setPopupRow(row)
    setPopupCol(col)
  }

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
              popup={popup}
            />
          )}
        </tbody>
      </table>
      <RatingViewPopup
        active={popupActive}
        setActive={setPopupActive}
        research={research}
        row={popupRow}
        col={popupCol}
      />
    </div>
  )
}

const CellRow = ({ i, research, popup }) => {
  return(
    <tr>
      <th title={research.criteria[i]}>
        {research.criteria[i]}
      </th>
      {[...Array(research.criteria.length)].map((x, j) => {
        if (i < j) return (
          <td key={j} className={style.top} onClick={() => popup(i, j)}>
            {MARK_MODEL[research.criteriaRating[i][j]].string}
          </td>
        )
        else if (i > j) return (
          <td key={j} className={style.bot} onClick={() => popup(i, j)}>
            {MARK_MODEL[research.criteriaRating[i][j]].string}
          </td>
        )
        else if (i === j) return (
          <td key={j} className={style.diagonal}>
            {MARK_MODEL[research.criteriaRating[i][j]].string}
          </td>
        )
      })}
    </tr>
  )
}




const RatingViewPopup = ({
  active,
  setActive,
  research,
  row,
  col,
}) => {

  const confirmHandler = () => { setActive(false) }

  return(
    <div
      className={active ? `${style.popup} ${style.active}` : style.popup}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? `${style.popup_content} ${style.active}` : style.popup_content}
        onClick={e => e.stopPropagation()}
      >
        <p className="center">Сравнение критериев</p>
        <div className="center">{MARK_MODEL[research.criteriaRating[row][col]].string}</div>
        <div className={style.rating_box}>
          <div>{research.criteria[col]}</div>
          <div>{research.criteria[row]}</div>
        </div>
        <div className="range-field">
          <input
            type="range" id="criteria" name="criteria"
            min={0} max={16} value={[research.criteriaRating[row][col]]} readOnly={true} tabIndex={-1}
          />
        </div>
        <div className={style.popup_exit}>
          <i className="material-icons" onClick={confirmHandler}>close</i>
        </div>
      </div>
    </div>
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
