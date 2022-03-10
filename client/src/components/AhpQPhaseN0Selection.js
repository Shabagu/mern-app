import { ALL_CRITERIA, ALL_ALTERNATIVES } from "../pages/AhpPage"


import style from "./StyleAhpQPhases.module.scss"



export const AhpQPhaseN0Selection = ({
    criteriaSetter,
    alternativesSetter,
    criteriaMTXSetter,
    
    nextPhase,
    phaseDone,
    phasesDone
  }) => {

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


  const checkboxConditionsSetter = () => {

  }

  const selectHandler = () => {
    const criteriaCheckboxes = document.querySelectorAll(`.${groups.criteria.ens}`)
    const alternativesCheckboxes = document.querySelectorAll(`.${groups.alternatives.ens}`)
    const selectedCriteria = []
    const selectedAlternatives = []
    const defaultCriteriaMTX = []


    let j = 0
    for (let i = 0; i < criteriaCheckboxes.length; i++) {
      if (criteriaCheckboxes[i].checked) {
        selectedCriteria[j] = ALL_CRITERIA[criteriaCheckboxes[i].value.slice(-1)]
        j++
      }
    }
    criteriaSetter(selectedCriteria)

    let k = 0
    for (let i = 0; i < alternativesCheckboxes.length; i++) {
      if (alternativesCheckboxes[i].checked) {
        selectedAlternatives[k] = ALL_ALTERNATIVES[alternativesCheckboxes[i].value.slice(-1)]
        k++
      }
    }
    alternativesSetter(selectedAlternatives)

    for (let i = 0; i < selectedCriteria.length; i++) {
      defaultCriteriaMTX[i] = []
      for (let j = 0; j < selectedCriteria.length; j++) {
        defaultCriteriaMTX[i][j] = 8
      }
    }
    criteriaMTXSetter(defaultCriteriaMTX)

    phaseDone()
    nextPhase()
  }

  return(
    <div className={style.phase_container}>
      <div className={style.selections_container}>
        <Selection set={ALL_CRITERIA} group={groups.criteria} />
        <Selection set={ALL_ALTERNATIVES} group={groups.alternatives} />
      </div>
      
      <div className={style.button_container}>
        <div><button className="btn" onClick={selectHandler}>Сформировать запрос</button></div>
      </div>
    </div>
  )
}



const Selection = ({ set, group }) => {

  const checkAll = (group) => {
    const checkboxes = document.querySelectorAll(`.${group}_list input`)
    const isAllChecked = document.querySelector(`.${group}_checkAll`).checked
    checkboxes.forEach((item) => {
      if (isAllChecked) item.checked = true
      else item.checked = false
    })
  }

  return(
    <div className={style.selection}>
      <fieldset>
        <legend>{group.ru}</legend>
        <ul className={`${group.en}_list`}>
          {[...Array(set.length)].map((x, i) => 
            <Option key={i} i={i} opt={set[i]} group={group} />
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



const Option = ({ i, opt, group }) => {

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
  }

  return(
    <li>
      <label>
        <input
          type="checkbox"
          value={`${group.ens}${i}`}
          className={group.ens}
          onClick={(e) => checkboxControl(group.en, e)}
        />
        <span>{opt}</span>
      </label>
    </li>
  )
}
