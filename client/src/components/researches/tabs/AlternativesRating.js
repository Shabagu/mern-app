import { useEffect, useState } from 'react' 

import style from './AlternativesRating.module.scss'

export const AlternativesRating = ({ research }) => {

  useEffect(() => {
    const firstCriterionCheckbox = document.querySelector('input[name="criteria"]:first-child')
    firstCriterionCheckbox.checked = true
  }, [])

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

  return(
    <div className={style.alternatives_rating_container}>
      <div className={style.criterion_box}>
        <div className={style.title}>
          Критерий
          <i className="material-icons">arrow_drop_down</i>
        </div>
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
      <AlternativesRatingPopup
        active={popupActive}
        setActive={setPopupActive}
        research={research}
        cc={popupCriterion}
        row={popupRow}
        col={popupCol}
      />
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
          <td key={j} className={style.diagonal}>
            {MARK_MODEL[research.alternativesRating[cc][i][j]].string}
          </td>
        )
      })}
    </tr>
  )
}



const AlternativesRatingPopup = ({
  active,
  setActive,
  research,
  cc,
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
        <p className="center">Сравнение альтернатив по критерию</p>
        <p className="center">{research.criteria[cc]}</p>
        <div className="center">{MARK_MODEL[research.alternativesRating[cc][row][col]].string}</div>
        <div className={style.rating_box}>
          <div>{research.alternatives[col]}</div>
          <div>{research.alternatives[row]}</div>
        </div>
        <div className="range-field">
          <input
            type="range" id="alternatives" name="alternatives"
            min={0} max={16} value={[research.alternativesRating[cc][row][col]]} readOnly={true} tabIndex={-1}
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
