import { useState } from "react"
import { SelectionPhase } from "../../components/NewAhpResearch/Phases/SelectionPhase"
import { CriteriaRating } from "../../components/NewAhpResearch/Phases/CriteriaRating"
import { CriteriaWeights } from "../../components/NewAhpResearch/Phases/CriteriaWeights"
import { AlternativesRating } from "../../components/NewAhpResearch/Phases/AlternativesRating"
import { AlternativesWeights } from "../../components/NewAhpResearch/Phases/AlternativesWeights"
import { GroupsWeights } from "../../components/NewAhpResearch/Phases/GroupsWeights"
import { GlobalWeights } from "../../components/NewAhpResearch/Phases/GlobalWeights"
import { PhaseTitle } from "../../components/NewAhpResearch/PhaseTitle"
import { StateDisplay } from "../../components/NewAhpResearch/StateDisplay"

import style from "./NewResearchPage.module.scss"



export const ALL_CRITERIA = [
  'Стоимость',
  'Климат',
  'Экология',
  'Безопасность',
  'Кухня',
  'Престиж',
  'Дорога',
  'Достопримечательности',
]
  
export const ALL_ALTERNATIVES = [
  'Египет',
  'Греция',
  'Турция',
  'Куба',
  'Тунис',
  'Швеция',
  'Италия',
  'Гавайи',
]

export const DEFAULT_BUTTON_COLOR = '#26a69a'
export const HOT_CHANGES_BUTTON_COLOR = '#ff8e3a'

export const HOT_CHANGES_HANDLER = (HOT_CHANGES_BUTTON_COLOR) => {
  const NEXT_PHASE_TITLE_BUTTON = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
  NEXT_PHASE_TITLE_BUTTON.style.backgroundColor = HOT_CHANGES_BUTTON_COLOR
}


const NEXT_PHASE_TITLE_BUTTON_DEFAULT_COLOR = '#26a69a'
const NEXT_PHASE_TITLE_BUTTON_HOT_CHANGES_COLOR = '#ff8e3a'

export const HOT_CHANGES_EFFECT = () => {
  const button = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
  button.style.backgroundColor = NEXT_PHASE_TITLE_BUTTON_HOT_CHANGES_COLOR
} 
export const HOT_CHANGES_EFFECT_RESET = () => {
  const button = document.querySelector('.NEXT_PHASE_TITLE_BUTTON')
  button.style.backgroundColor = NEXT_PHASE_TITLE_BUTTON_DEFAULT_COLOR
} 



export const NewResearchPage = () => {

  const [phase, setPhase] = useState(0)
  const [phasesDone, setPhasesDone] = useState(0)

  const [criteria, setCriteria] = useState([])
  const [criteriaMTX, setCriteriaMTX] = useState([])
  const [criteriaSum, setCriteriaSum] = useState([])
  const [criteriaNormMTX, setCriteriaNormMTX] = useState([])
  const [criteriaWeights, setCriteriaWeights] = useState([])
  
  const [alternatives, setAlternatives] = useState([])
  const [alternativesMTX, setAlternativesMTX] = useState([])
  const [alternativesSum, setAlternativesSum] = useState([])
  const [alternativesNormMTX, setAlternativesNormMTX] = useState([])
  const [alternativesWeights, setAlternativesWeights] = useState([])
  const [globalWeights, setGlobalWeights] = useState([])




  const nextPhaseHandler = (skip) => {
    if (phase < 6) {
      setPhase(phase + skip)
    }
  }
  const previousPhaseHandler = (skip) => {
    if (phase > 0) {
      setPhase(phase - skip)
    }
  }
  const goToPhaseHandler = (phase) => {
    setPhase(phase)
  }
  const phasesDoneHandler = (phase) => {
    setPhasesDone(phase)
  }


  const setCriteriaHandler = (array) => {
    setCriteria(array)
  }
  const setCriteriaMTXHandler = (mtx) => {
    setCriteriaMTX(mtx)
  }
  const setCriteriaSumHandler = (array) => {
    setCriteriaSum(array)
  }
  const setCriteriaNormMTXHandler = (mtx) => {
    setCriteriaNormMTX(mtx)
  }
  const setCriteriaWeightsHandler = (array) => {
    setCriteriaWeights(array)
  }


  const setAlternativesHandler = (array) => {
    setAlternatives(array)
  }
  const setAlternativesMTXHandler = (mtx) => {
    setAlternativesMTX(mtx)
  }
  const setAlternativesSumHandler = (mtx) => {
    setAlternativesSum(mtx)
  }
  const setAlternativesNormMTXHandler = (mtx) => {
    setAlternativesNormMTX(mtx)
  }
  const setAlternativesWeightsHandler = (mtx) => {
    setAlternativesWeights(mtx)
  }


  const setGlobalWeightsHandler = (mtx) => {
    setGlobalWeights(mtx)
  }




  return(
    <div className={style.query_box}>
      <h3 className={style.page_title}>Новое исследование</h3>

      <PhaseTitle
        phase={phase}
        phasesDone={phasesDone}
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
      />



      {phase === 0 &&
        <SelectionPhase
          criteria={criteria}
          criteriaSetter={setCriteriaHandler}
          criteriaMTXSetter={setCriteriaMTXHandler}
          criteriaSumSetter={setCriteriaSumHandler}

          alternatives={alternatives}
          alternativesSetter={setAlternativesHandler}
          alternativesMTXSetter={setAlternativesMTXHandler}
          alternativesSumSetter={setAlternativesSumHandler}

          goToPhase={goToPhaseHandler}
          phaseDone={phasesDoneHandler}
        />
      }

      {phase === 1 &&
        <CriteriaRating
          criteria={criteria}
          criteriaMTX={criteriaMTX}
          criteriaMTXSetter={setCriteriaMTXHandler}
          criteriaSum={criteriaSum}
          criteriaSumSetter={setCriteriaSumHandler}
          criteriaNormMTXSetter={setCriteriaNormMTXHandler}
          criteriaWeightsSetter={setCriteriaWeightsHandler}
          
          goToPhase={goToPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 2 &&
        <CriteriaWeights
          criteria={criteria}
          criteriaNormMTX={criteriaNormMTX}
          criteriaWeights={criteriaWeights}

          goToPhase={goToPhaseHandler}
          phaseDone={phasesDoneHandler}
        />
      }

      {phase === 3 && 
        <AlternativesRating
          criteria={criteria}
          alternatives={alternatives}
          alternativesMTX={alternativesMTX}
          alternativesMTXSetter={setAlternativesMTXHandler}
          alternativesSum={alternativesSum}
          alternativesSumSetter={setAlternativesSumHandler}
          alternativesNormMTXSetter={setAlternativesNormMTXHandler}
          alternativesWeightsSetter={setAlternativesWeightsHandler}
          criteriaWeights={criteriaWeights}
          globalWeightsSetter={setGlobalWeightsHandler}

          goToPhase={goToPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 4 &&
        <AlternativesWeights
          criteria={criteria}
          alternatives={alternatives}
          alternativesNormMTX={alternativesNormMTX}
          alternativesWeights={alternativesWeights}

          goToPhase={goToPhaseHandler}
          phaseDone={phasesDoneHandler}
        />
      }

      {phase === 5 &&
        <GroupsWeights

          goToPhase={goToPhaseHandler}
        />
      }

      {phase === 6 &&
        <GlobalWeights
          globalWeights={globalWeights}

          goToPhase={goToPhaseHandler}
        />
      }



      {/* <StateDisplay
        phase={phase}
        phasesDone={phasesDone}
        criteria={criteria}
        alternatives={alternatives}
        criteriaMTX={criteriaMTX}
        criteriaSum={criteriaSum}
        criteriaNormMTX={criteriaNormMTX}
        criteriaWeights={criteriaWeights}

        // alternativesMTX={alternativesMTX}
        // alternativesSum={alternativesSum}
        // alternativesNormMTX={alternativesNormMTX}
        // alternativesWeights={alternativesWeights}
        // globalWeights={globalWeights}
      /> */}

    </div>
  )
}
