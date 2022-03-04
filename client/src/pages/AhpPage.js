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

import style from "./AhpPage.module.scss"



export const AhpPage = () => {

  const [phase, setPhase] = useState(0)
  const phaseTitles = [
    'Выбор критериев и альтернатив',
    'Попарное сравнение критериев',
    'Нормировка матрицы сравнения критериев',
    'Весовой столбец критериев',
    'Попарное сравнение альтернатив по критериям',
    'Нормировка матриц сравнения альтернатив',
    'Весовые столбцы альтернатив по критериям',
    'Определение глобальных весов альтернатив',
    'Глобальные веса альтернатив'
  ]


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

  return(
    <div>
      <h3>Новый запрос</h3>
      <h4>
        <button className={`${style.phase} btn`} onClick={previousPhaseHandler}>&lt;</button>
        {phaseTitles[phase]}
        <button className={`${style.phase} btn`} onClick={nextPhaseHandler}>&gt;</button>
      </h4>
      <p>{phase}</p>
      {phase === 0 && <AhpQPhaseN0Selection />}
      {phase === 1 && <AhpQPhaseN1CriteriaRating />}
      {phase === 2 && <AhpQPhaseN2CriteriaNormalization />}
      {phase === 3 && <AhpQPhaseN3CriteriaWeight />}
      {phase === 4 && <AhpQPhaseN4AlternativesRating />}
      {phase === 5 && <AhpQPhaseN5AlternativesNormalization />}
      {phase === 6 && <AhpQPhaseN6AlternativesWeight />}
      {phase === 7 && <AhpQPhaseN7AllСalculatedWeights />}
      {phase === 8 && <AhpQPhaseN8GlobalWeightsCalculation />}
    </div>
  )
}
