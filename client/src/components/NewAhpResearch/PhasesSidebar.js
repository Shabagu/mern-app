import style from './PhasesSidebar.module.scss'

export const PhasesSidebar = ({
  phase,
  phasesDone,
  goToPhase,
}) => {

  return(
    <div className={style.sidebar}>
      <Phase
        title={'Выбор критериев и альтернатив'}
        icon={'looks_one'}
        arrow={true}
        isActive={phase === 0}
        isDone={phasesDone >= 0 && phase !== 0}
        goToPhase={(e) => goToPhase(0, e)}
      />
      <Phase
        title={'Попарное сравнение критериев'}
        icon={'looks_two'}
        arrow={true}
        isActive={phase === 1}
        isDone={phasesDone >= 1 && phase !== 1}
        goToPhase={(e) => goToPhase(1, e)}
      />
      <Phase
        title={'Веса критериев'}
        arrow={true}
        isActive={phase === 2}
        isDone={phasesDone >= 2 && phase !== 2}
        goToPhase={(e) => goToPhase(2, e)}
      />
      <Phase
        title={'Попарное сравнение альтернатив'}
        icon={'looks_3'}
        arrow={true}
        isActive={phase === 3}
        isDone={phasesDone >= 3 && phase !== 3}
        goToPhase={(e) => goToPhase(3, e)}
      />
      <Phase
        title={'Веса альтернатив'}
        arrow={true}
        isActive={phase === 4}
        isDone={phasesDone >= 4 && phase !== 4}
        goToPhase={(e) => goToPhase(4, e)}
      />
      <Phase
        title={'Веса критериев и альтернатив'}
        arrow={true}
        isActive={phase === 5}
        isDone={phasesDone >= 5 && phase !== 5}
        goToPhase={(e) => goToPhase(5, e)}
      />
      <Phase
        title={'Глобальные веса'}
        icon={'looks_4'}
        isActive={phase === 6}
        isDone={phasesDone >= 6 && phase !== 6}
        goToPhase={(e) => goToPhase(6, e)}
      />
    </div>
  )
}

const Phase = ({ title, icon, arrow, isActive, isDone, goToPhase }) => {

  function noop() {}

  return(
    <>
      { isActive &&
        <div className={style.active_phase}>
          <PhaseContent title={title} icon={icon} arrow={arrow} goToPhase={noop} />     
        </div>
      }
      { isDone &&
        <div className={style.done_phase}>
          <PhaseContent title={title} icon={icon} arrow={arrow} goToPhase={goToPhase} />     
        </div>
      }
      { !isDone && !isActive &&
        <div className={style.undone_phase}>
          <PhaseContent title={title} icon={icon} arrow={arrow} goToPhase={noop} />     
        </div>
      }
    </>
  )
}

const PhaseContent = ({ title, icon, arrow, goToPhase }) => {

  return(
    <>
      <div className={style.phase_title_container} onClick={goToPhase}>
        {title}
      </div>
      {icon &&
        <i className={`small material-icons ${style.index}`}>{icon}</i>
      }
      {arrow &&
      <div className={style.arrow_container}>
        <i className={`small material-icons ${style.arrow}`}>arrow_drop_down</i>
      </div>
      }
    </>
  )
}
