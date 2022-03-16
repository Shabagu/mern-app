import { useMessage } from "../../hooks/message.hook"

import style from "./PhaseTitle.module.scss"


export const PhaseTitle = ({
  phase,
  phasesDone,
  nextPhase,
  previousPhase
}) => {

  const PHASE_TITLES = [
    'Выбор критериев и альтернатив',
    'Попарное сравнение критериев',
    'Весовой столбец критериев по цели',
    'Попарное сравнение альтернатив по критериям',
    'Весовые столбцы альтернатив по критериям',
    'Веса критериев и альтернатив',
    'Глобальные веса альтернатив',
  ]

  const message = useMessage()

  const HELP_TIPS = [
    'Подсказка 0',
    'Подсказка 1',
    'Подсказка 2',
    'Подсказка 3',
    'Подсказка 4',
    'Подсказка 5',
    'Подсказка 6',
  ]

  const helpHandler = () => {
    message(HELP_TIPS[phase])
  }

  const nextPhaseHandler = () => {
    nextPhase(1)
  }
  const previousPhaseHandler = () => {
    previousPhase(1)
  }

  return(
    <div className={style.title_box}>
      <div>
        <span
          className="waves-effect waves-light btn"
          onClick={previousPhaseHandler}
          disabled={phase <= 0}
          title={PHASE_TITLES[phase - 1]}
        >
          <i className="material-icons">navigate_before</i>
        </span>
      </div>
      <div className={style.title_subbox}>
        <div>
          <h4 className={style.title}>{PHASE_TITLES[phase]}</h4>
        </div>
        <div className={style.help}>
          <span
            className="waves-effect waves-light btn"
            onClick={helpHandler}
            title="Помощь"
          >
            <i className="material-icons">help_outline</i>
          </span>
        </div>
      </div>
      <div>
        <span
          className="waves-effect waves-light btn NEXT_PHASE_TITLE_BUTTON"
          onClick={nextPhaseHandler}
          disabled={phase >= 6 || phasesDone <= phase}
          title={PHASE_TITLES[phase + 1]}
        >
          <i className="material-icons">navigate_next</i>
        </span>
      </div>
    </div>
  )
}
