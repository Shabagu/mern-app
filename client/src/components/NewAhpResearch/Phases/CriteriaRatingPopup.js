import { useState } from 'react'
import style from './CriteriaRatingPopup.module.scss'

export const CriteriaRatingPopup = ({
  active,
  setActive,
  criteriaA,
  criteriaB,
  value,
  mm,

}) => {

  const [localValue, setLocalValue] = useState(8)

  const changeHandler = event => {
    setLocalValue({ value: event.target.value})
  }

  const confirmHandler = () => {
    setActive(false)
  }



  return(
    <div
      className={ active ? `${style.popup} ${style.active}` : style.popup }
      onClick={() => setActive(false)}
    >
      <div
        className={ active ? `${style.popup_content} ${style.active}` : style.popup_content }
        onClick={e => e.stopPropagation()}
      >
        <p className='center'>Сравнение критериев</p>
        <div className='center'>{mm[value].string} ({value})</div>
        <div className={style.rating_box}>
          <div>{criteriaA}</div>
          <div>{criteriaB}</div>
        </div>
        <div className='range-field'>
          <input
            type='range' id='criteria' name='criteria'
            min={0} max={16} value={value}
            onChange={changeHandler}
          />
        </div>
        <div className='center'>
          <button className='btn' onClick={confirmHandler}>ОК</button>
        </div>
      </div>
    </div>
  )
}
