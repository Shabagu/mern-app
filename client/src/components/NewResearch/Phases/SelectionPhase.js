import { useEffect } from "react"
import { useMessage } from '../../../hooks/message.hook'
import { DEFAULT_BUTTON_COLOR, HOT_CHANGES_BUTTON_COLOR, HOT_CHANGES_HANDLER } from "../../../pages/ahp/NewResearchPage"

import style from "./SelectionPhase.module.scss"


export const SelectionPhase = ({
  allCriteria,
  criteria,
  criteriaSetter,
  criteriaMTXSetter,
  criteriaSumSetter,
  
  allAlternatives,
  alternatives,
  alternativesSetter,
  alternativesMTXSetter,
  alternativesSumSetter,
  
  goToPhase,
  phaseDone,
}) => {

  useEffect(() => {
    const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
    NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = DEFAULT_BUTTON_COLOR
  }, [])

  useEffect(() => {
    const checkAllCriteriaCheckbox = document.querySelector('.criteria_checkAll')
    const checkAllAlternativesCheckbox = document.querySelector('.alternatives_checkAll')
    if (criteria.length === allCriteria.length && criteria.length !== 0) {
      checkAllCriteriaCheckbox.checked = true
    }
    if (alternatives.length === allAlternatives.length && alternatives.length !== 0) {
      checkAllAlternativesCheckbox.checked = true
    }    
  }, [criteria, alternatives, allCriteria, allAlternatives])

  const message = useMessage()

  const groups = {
    criteria: {
      ru: "Критерии",
      en: "criteria",
      ens: "criterion",
    },
    alternatives: {
      ru: "Альтернативы",
      en: "alternatives",
      ens: "alternative",
    },
  }



  const selectHandler = () => {
    const criteriaCheckboxes = document.querySelectorAll(`.${groups.criteria.ens}`)
    const alternativesCheckboxes = document.querySelectorAll(`.${groups.alternatives.ens}`)
    const selectedCriteria = []
    const selectedAlternatives = []
    const defaultCriteriaMTX = []
    const defaultCriteriaSum = []
    const defaultAlternativesMTX = []
    const defaultAlternativesSum = []

    let j = 0
    for (let i = 0; i < criteriaCheckboxes.length; i++) {
      if (criteriaCheckboxes[i].checked) {
        selectedCriteria[j] = allCriteria[Number(
          criteriaCheckboxes[i].value.slice(-2))
        ].name
        j++
      }
    }
    let k = 0
    for (let i = 0; i < alternativesCheckboxes.length; i++) {
      if (alternativesCheckboxes[i].checked) {
        selectedAlternatives[k] = allAlternatives[Number(
          alternativesCheckboxes[i].value.slice(-2))
        ].name
        k++
      }
    }
    console.log(selectedCriteria)
    console.log(selectedAlternatives)

    if (selectedCriteria.length < 2 && selectedAlternatives.length < 2) {
      message('Выберите хотя бы два критерия и две альтернативы!')
    }
    else if (selectedCriteria.length < 2) {
      message('Выберите хотя бы два критерия!')
    }
    else if (selectedAlternatives.length < 2) {
      message('Выберите хотя бы две альтернативы!')
    }
    else {

      criteriaSetter(selectedCriteria)
      alternativesSetter(selectedAlternatives)

      const criteriaN = selectedCriteria.length
      const alternativesN = selectedAlternatives.length
  
      for (let i = 0; i < criteriaN; i++) {
        defaultCriteriaMTX[i] = []
        for (let j = 0; j < criteriaN; j++) {
          defaultCriteriaMTX[i][j] = 8
        }
      }
      criteriaMTXSetter(defaultCriteriaMTX)

      for (let i = 0; i < criteriaN; i++) {
        defaultCriteriaSum[i] = criteriaN
      }
      criteriaSumSetter(defaultCriteriaSum)

      for (let i = 0; i < criteriaN; i++) {
        defaultAlternativesMTX[i] = []
        for (let j = 0; j < alternativesN; j++) {
          defaultAlternativesMTX[i][j] = []
          for (let k = 0; k < alternativesN; k++) {
            defaultAlternativesMTX[i][j][k] = 8
          }
        }
      }
      alternativesMTXSetter(defaultAlternativesMTX)

      for (let i = 0; i < criteriaN; i++) {
        defaultAlternativesSum[i] = []
        for (let j = 0; j < alternativesN; j++) {
          defaultAlternativesSum[i][j] = alternativesN
        }
      }
      alternativesSumSetter(defaultAlternativesSum)

      message('Исследование начато!')
      phaseDone(1)
      goToPhase(1)
    }
  }

  return(
    <div className={style.phase_container}>
      <div className={style.selections_container}>
        <Selection set={allCriteria} group={groups.criteria} selected={criteria}/>
        <Selection set={allAlternatives} group={groups.alternatives} selected={alternatives} />
      </div>
      
      <div className={style.button_container}>
        <div>
          <button className="btn" onClick={selectHandler}>
            Сформировать запрос
            <i className="material-icons right">fast_forward</i>
          </button>
        </div>
      </div>
    </div>
  )
}



const Selection = ({ set, group, selected }) => {

  const checkAll = (group) => {
    const checkboxes = document.querySelectorAll(`.${group}_list input`)
    const isAllChecked = document.querySelector(`.${group}_checkAll`).checked
    checkboxes.forEach((item) => {
      if (isAllChecked) item.checked = true
      else item.checked = false
    })
    
    HOT_CHANGES_HANDLER(HOT_CHANGES_BUTTON_COLOR)
  }

  return(
    <div className={style.selection}>
      <fieldset>
        <legend>{group.ru}</legend>
        <ul className={`${group.en}_list`}>
          {[...Array(set.length)].map((x, i) => 
            <Option key={i} i={i} opt={set[i].name} group={group} selected={selected} />
          )}
        </ul>
        <hr />
        <label>
          <input
            type="checkbox"
            className={`${group.en}_checkAll filled-in`}
            onClick={(e) => checkAll(group.en, e)}
          />
          <span className={style.check_all}>Отметить все</span>
        </label>
      </fieldset>
    </div>
  )
}



const Option = ({ i, opt, group, selected }) => {

  const checkboxControl = (option) => {
    const checkboxes = Array.from(document.querySelectorAll(`.${option}_list input`))
    const checkboxesConditions = []
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxesConditions[i] = checkboxes[i].checked
    }
    const checkAllCheckbox = document.querySelector(`.${option}_checkAll`)
    const isAllChecked = checkboxesConditions.reduce((acc, rec) => acc && rec)
    const isUnhecked = !checkboxesConditions.reduce((acc, rec) => acc * rec)
    if (isAllChecked) checkAllCheckbox.checked = true
    if (isUnhecked) checkAllCheckbox.checked = false

    HOT_CHANGES_HANDLER(HOT_CHANGES_BUTTON_COLOR)
  }

  let indexValue = i
  if (indexValue < 10) {
    indexValue = '0' + indexValue 
  }

  return(
    <li>
      <label>
        <input
          type="checkbox"
          value={`${group.ens}${indexValue}`}
          className={group.ens}
          onChange={(e) => checkboxControl(group.en, e)}
          defaultChecked={selected.includes(`${opt}`)}
        />
        <span>{opt}</span>
      </label>
    </li>
  )
}
