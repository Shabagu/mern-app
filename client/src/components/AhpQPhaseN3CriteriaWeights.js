import style from "./AhpQPhases.module.scss"


export const AhpQPhaseN3CriteriaWeight = ({

    nextPhase,
    phaseDone,
    phasesDone,
  }) => {

  const nextPhaseHandler = () => {
    nextPhase()
  }

  return(
    <div className={style.phase_container}>
      <p>Весовой столбец критериев</p>
      <Menu
        nextPhase={nextPhaseHandler}
        phaseDone={phaseDone}
        phasesDone={phasesDone}
      />
    </div>
  )
}

const Menu = ({

    nextPhase,
    phasesDone,
    phaseDone,
  }) => {

  const continueHandler = () => {

    if (phasesDone <= 3) {
      phaseDone()
    }

    nextPhase()
  }

  return(
    <div className={style.panel}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn"
          onClick={continueHandler}
        >
          Продолжить&nbsp;&nbsp;&nbsp;&gt;&gt;&gt;
        </button>
      </div>
    </div>
  )
}
