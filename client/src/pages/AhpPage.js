import { useState } from "react"

import style from "./AhpPage.module.scss"

import { AhpQPhaseN0Selection } from "../components/AhpQPhaseN0Selection"


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


export const AhpQPhaseN1CriteriaRating = () => {
  return(
  <p>Попарное сравнение критериев</p>
  )
}
export const AhpQPhaseN2CriteriaNormalization = () => {
  return(
  <p>Нормировка матрицы сравнения критериев</p>
  )
}
export const AhpQPhaseN3CriteriaWeight = () => {
  return(
  <p>Весовой столбец критериев</p>
  )
}
export const AhpQPhaseN4AlternativesRating = () => {
  return(
  <p>Попарное сравнение альтернатив по критериям</p>
  )
}
export const AhpQPhaseN5AlternativesNormalization = () => {
  return(
  <p>Нормировка матриц сравнения альтернатив</p>
  )
}
export const AhpQPhaseN6AlternativesWeight = () => {
  return(
  <p>Весовые столбцы альтернатив по критериям</p>
  )
}
export const AhpQPhaseN7AllСalculatedWeights = () => {
  return(
  <p>Определение глобальных весов альтернатив</p>
  )
}
export const AhpQPhaseN8GlobalWeightsCalculation = () => {
  return(
  <p>Глобальные веса альтернатив</p>
  )
}
