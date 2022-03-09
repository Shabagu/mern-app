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
import style from "./AhpPage.module.scss"



export const ALL_CRITERIA =
  [
    'Стоимость',
    'Климат',
    'Экология',
    'Безопасность',
    'Кухня',
    'Престиж',
    'Дорога',
    'Достопримечательности',
  ]
  
export const ALL_ALTERNATIVES =
  [
    'Египет',
    'Греция',
    'Турция',
    'Куба',
    'Тунис',
    'Швеция',
    'Италия',
    'Гавайи',
  ]



export const AhpPage = () => {

  const [phase, setPhase] = useState(0)
  const [phasesDone, setPhasesDone] = useState(0)

  const [criteria, setCriteria] = useState([])
  const [alternatives, setAlternatives] = useState([])

  const [criteriaMTX, setCriteriaMTX] = useState([])
  const [criteriaSum, setCriteriaSum] = useState([])
  const [criteriaNormMTX, setCriteriaNormMtx] = useState([])
  
  const [criteriaWeights, setCriteriaWeights] = useState([])


  const [alternativesMTX, setAlternativesMTX] = useState([])
  const [alternativesSum, setAlternativesSum] = useState([])
  const [alternativesNormMTX, setAlternativesNormMTX] = useState([])
  const [alternativesWeights, setAlternativesWeights] = useState([])
  
  const [globalWeights, setGlobalWeights] = useState([])




  const nextPhaseHandler = () => {
    if (phase < 8) { setPhase(phase + 1) }
  }
  const previousPhaseHandler = () => {
    if (phase > 0) { setPhase(phase - 1) }
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
  const setAlternativesHandler = (array) => {
    setAlternatives(array)
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





  return(
    <div className={style.query_box}>
      <h3 className={style.page_title}>Новый запрос</h3>

      <AhpQPhaseTitle
        phase={phase}
        nextPhase={nextPhaseHandler}
        previousPhase={previousPhaseHandler}
      />



      {phase === 0 &&
        <AhpQPhaseN0Selection
          criteriaSetter={setCriteriaHandler}
          alternativesSetter={setAlternativesHandler}
          criteriaMTXSetter={setCriteriaMTXHandler}

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
          criteriaWeightsSetter={setCriteriaWeightsHandler}

          nextPhase={nextPhaseHandler}
          phaseDone={phasesDoneHandler}
          phasesDone={phasesDone}
        />
      }

      {phase === 3 && 
        <AhpQPhaseN3CriteriaWeight

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
      />

    </div>
  )
}
