// import { useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook'
import './../style/styleFix.css';

export const AhpQueryPage = () => {

  const { loading } = useHttp()
  const history = useHistory()
  // const [queryOptions, setQueryOptions] = useState('')

  const checkboxChanging = (option) => {
    const checkboxes = document.querySelectorAll(`.${option}List input[type="checkbox"]`)
    const changingCondition = document.querySelector(`.${option}Changing`).checked
    checkboxes.forEach((item) => {
      if (changingCondition) item.checked = true
      else item.checked = false
    })
  }

  const checkboxControl = (option) => {
    const checkboxes = Array.from(document.querySelectorAll(`.${option}List input[type="checkbox"]`))
    const checkboxesConditions = []
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxesConditions[i] = checkboxes[i].checked
    }
    const checkboxChanger = document.querySelector(`.${option}Changing`)
    const isAllChecked = checkboxesConditions.reduce((acc, rec) => acc && rec)
    const isUnhecked = !checkboxesConditions.reduce((acc, rec) => acc * rec)
    if (isAllChecked) checkboxChanger.checked = true
    if (isUnhecked) checkboxChanger.checked = false
  }

  const pressHandler = async () => {
    history.push('/query/criteriacomparison')
  }

  return (
    <div>
      <h3>МАИ-запрос</h3>
      <div className="row">
        <div className="col s3 offset-s3">
          <h5>Альтернативы</h5>
          <ul className="AlternativesList">
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Египет</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Греция</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Турция</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Куба</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Тунис</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Швеция</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Италия</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Alternatives', e)} /><span>Гавайи</span></label></li>
          </ul>
          <label>
            <input type="checkbox" onClick={(e) => checkboxChanging('Alternatives', e)} disabled={loading} className="AlternativesChanging filled-in" />
            <span className="checkboxChangingText">Отметить все</span>
          </label>
        </div>
        <div className="col s3 ">
          <h5>Критерии</h5>
          <ul className="CriteriaList">
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Стоимость</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Климат</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Экология</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Безопасность</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Кухня</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Престиж</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Дорога</span></label></li>
            <li><label><input type="checkbox"  onClick={(e) => checkboxControl('Criteria', e)} /><span>Достопримечательности</span></label></li>
          </ul>
          <label>
            <input type="checkbox" onClick={(e) => checkboxChanging('Criteria', e)} disabled={loading} className="CriteriaChanging filled-in" />
            <span className="checkboxChangingText">Отметить все</span>
          </label>
        </div>
      </div>
      <div className='mybtn-container'>
        <button onClick={pressHandler} disabled={loading} className="btn mybtn">Сформировать запрос</button>
      </div>
    </div>
  )
}
