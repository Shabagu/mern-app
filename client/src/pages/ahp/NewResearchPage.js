import { useState } from "react"
import { N0Selection } from "../../components/NewAhpResearch/Phases/N0Selection"
import { N1CriteriaRating } from "../../components/NewAhpResearch/Phases/N1CriteriaRating"
import { N2CriteriaWeights } from "../../components/NewAhpResearch/Phases/N2CriteriaWeights"
import { N3AlternativesRating } from "../../components/NewAhpResearch/Phases/N3AlternativesRating"
import { N4AlternativesWeights } from "../../components/NewAhpResearch/Phases/N4AlternativesWeights"
import { N5AllСalculatedWeights } from "../../components/NewAhpResearch/Phases/N5AllСalculatedWeights"
import { N6GlobalWeights } from "../../components/NewAhpResearch/Phases/N6GlobalWeights"
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



export const NewResearchPage = () => {

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
      <h3 className={style.page_title}>Новое исследование</h3>

      <PhaseTitle
        phase={phase}
        phasesDone={phasesDone}
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
      />



      {phase === 0 &&
        <N0Selection
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
        <N1CriteriaRating
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
        <N2CriteriaWeights
          criteria={criteria}
          criteriaNormMTX={criteriaNormMTX}
          criteriaWeights={criteriaWeights}

          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 3 && 
        <N3AlternativesRating
          criteria={criteria}
          

          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 4 &&
        <N4AlternativesWeights
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 5 &&
        <N5AllСalculatedWeights
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 6 &&
        <N6GlobalWeights
        
          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }



      <StateDisplay
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
