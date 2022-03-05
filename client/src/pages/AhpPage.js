import { useState } from "react"

import { AhpQPhaseN0Selection } from "../components/AhpQPhaseN0Selection"
import { AhpQPhaseN1CriteriaRating } from "../components/AhpQPhaseN1CriteriaRating"
import { AhpQPhaseN2CriteriaNormalization } from "../components/AhpQPhaseN2CriteriaNormalization"
import { AhpQPhaseN3CriteriaWeight } from "../components/AhpQPhaseN3CriteriaWeight"
import { AhpQPhaseN4AlternativesRating } from "../components/AhpQPhaseN4AlternativesRating"
import { AhpQPhaseN5AlternativesNormalization } from "../components/AhpQPhaseN5AlternativesNormalization"
import { AhpQPhaseN6AlternativesWeight } from "../components/AhpQPhaseN6AlternativesWeight"
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



  const nextPhaseHandler = () => {
    if (phase < 8) { setPhase(phase + 1) }
  }
  const previousPhaseHandler = () => {
    if (phase > 0) { setPhase(phase - 1) }
  }



  return(
    <div className={style.query_box}>
      <h3 className={style.page_title}>Новый запрос</h3>
      <AhpQPhaseTitle phase={phase} nextPhase={nextPhaseHandler} previousPhase={previousPhaseHandler}/>

      {phase === 0 && <AhpQPhaseN0Selection />}
      {phase === 1 && <AhpQPhaseN1CriteriaRating />}
      {phase === 2 && <AhpQPhaseN2CriteriaNormalization />}
      {phase === 3 && <AhpQPhaseN3CriteriaWeight />}
      {phase === 4 && <AhpQPhaseN4AlternativesRating />}
      {phase === 5 && <AhpQPhaseN5AlternativesNormalization />}
      {phase === 6 && <AhpQPhaseN6AlternativesWeight />}
      {phase === 7 && <AhpQPhaseN7AllСalculatedWeights />}
      {phase === 8 && <AhpQPhaseN8GlobalWeightsCalculation />}

      <AhpQState phase={phase}/>
    </div>
  )
}
