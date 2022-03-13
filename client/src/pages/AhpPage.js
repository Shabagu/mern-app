import { useState } from "react"
import { AhpQPhaseN0Selection } from "../components/AhpQPhaseN0Selection"
import { AhpQPhaseN1CriteriaRating } from "../components/AhpQPhaseN1CriteriaRating"
import { AhpQPhaseN2CriteriaNormalization } from "../components/AhpQPhaseN2CriteriaNormalization"
import { AhpQPhaseN3CriteriaWeight } from "../components/AhpQPhaseN3CriteriaWeights"
import { AhpQPhaseN4AlternativesRating } from "../components/AhpQPhaseN4AlternativesRating"
import { AhpQPhaseN5AlternativesNormalization } from "../components/AhpQPhaseN5AlternativesNormalization"
import { AhpQPhaseN6AlternativesWeight } from "../components/AhpQPhaseN6AlternativesWeights"
import { AhpQPhaseN7AllСalculatedWeights } from "../components/AhpQPhaseN7AllСalculatedWeights"
import { AhpQPhaseN8GlobalWeightsCalculation } from "../components/AhpQPhaseN8GlobalWeightsCalculation"
import { AhpQPhaseTitle } from "../components/AhpQPhaseTitle"
import { AhpQState } from "../components/AhpQState"


import style from "./StyleAhpPage.module.scss"



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



export const AhpPage = () => {

  const [phase, setPhase] = useState(0)
  const [phasesDone, setPhasesDone] = useState(0)

  const [criteria, setCriteria] = useState([])
  const [criteriaMTX, setCriteriaMTX] = useState([])
  const [criteriaSum, setCriteriaSum] = useState([])
  const [criteriaNormMTX, setCriteriaNormMtx] = useState([])
  const [criteriaWeights, setCriteriaWeights] = useState([])
  
  const [alternatives, setAlternatives] = useState([])
  // const [alternativesMTX, setAlternativesMTX] = useState([])
  // const [alternativesSum, setAlternativesSum] = useState([])
  // const [alternativesNormMTX, setAlternativesNormMTX] = useState([])
  // const [alternativesWeights, setAlternativesWeights] = useState([])
  // const [globalWeights, setGlobalWeights] = useState([])




  const nextPhaseHandler = () => {
    if (phase < 8) {
      setPhase(phase + 1)
    }
  }
  const previousPhaseHandler = () => {
    if (phase > 0) {
      setPhase(phase - 1)
    }
  }
  const phasesDoneFirst = () => {
    setPhasesDone(1)
  }
  const phasesDoneHandler = () => {
    setPhasesDone(phasesDone + 1)
  }


  const setCriteriaHandler = (array) => {
    setCriteria(array)
  }
  const setCriteriaMTXHandler = (array) => {
    setCriteriaMTX(array)
  }
  const setCriteriaSumHandler = (array) => {
    setCriteriaSum(array)
  }
  const setcriteriaNormMTXHandler = (array) => {
    setCriteriaNormMtx(array)
  }
  const setCriteriaWeightsHandler = (array) => {
    setCriteriaWeights(array)
  }


  const setAlternativesHandler = (array) => {
    setAlternatives(array)
  }





  return(
    <div className={style.query_box}>
      <h3 className={style.page_title}>Новый запрос</h3>

      <AhpQPhaseTitle
        phase={phase}
        phasesDone={phasesDone}
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
      />



      {phase === 0 &&
        <AhpQPhaseN0Selection
          criteria={criteria}
          criteriaSetter={setCriteriaHandler}
          criteriaMTXSetter={setCriteriaMTXHandler}
          criteriaSumSetter={setCriteriaSumHandler}

          alternatives={alternatives}
          alternativesSetter={setAlternativesHandler}

          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneFirst}
          phasesDone={phasesDone}
        />
      }

      {phase === 1 &&
        <AhpQPhaseN1CriteriaRating
          criteria={criteria}
          criteriaMTX={criteriaMTX}
          criteriaMTXSetter={setCriteriaMTXHandler}
          criteriaSum={criteriaSum}
          criteriaSumSetter={setCriteriaSumHandler}
          criteriaNormMTXSetter={setcriteriaNormMTXHandler}
          criteriaWeightsSetter={setCriteriaWeightsHandler}
          
          previousPhase={previousPhaseHandler}
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 2 &&
        <AhpQPhaseN2CriteriaNormalization
          criteria={criteria}
          criteriaNormMTX={criteriaNormMTX}
          criteriaWeights={criteriaWeights}

          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 3 && 
        <AhpQPhaseN3CriteriaWeight
          criteria={criteria}
          

          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 4 &&
        <AhpQPhaseN4AlternativesRating
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 5 &&
        <AhpQPhaseN5AlternativesNormalization
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 6 &&
        <AhpQPhaseN6AlternativesWeight
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 7 &&
        <AhpQPhaseN7AllСalculatedWeights
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 8 &&
        <AhpQPhaseN8GlobalWeightsCalculation
        
        />
      }



      <AhpQState
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
      />

    </div>
  )
}
