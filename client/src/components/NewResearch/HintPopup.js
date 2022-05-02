import { SelectionPhaseHint } from '../../components/newResearch/Phases/Hints/SelectionPhaseHint'
import { CriteriaRatingHint } from '../../components/newResearch/Phases/Hints/CriteriaRatingHint'
import { CriteriaWeightsHint } from '../../components/newResearch/Phases/Hints/CriteriaWeightsHint'
import { AlternativesRatingHint } from '../../components/newResearch/Phases/Hints/AlternativesRatingHint'
import { AlternativesWeightsHint } from '../../components/newResearch/Phases/Hints/AlternativesWeightsHint'
import { GroupsWeightsHint } from '../../components/newResearch/Phases/Hints/GroupsWeightsHint'
import { GlobalWeightsHint } from '../../components/newResearch/Phases/Hints/GlobalWeightsHint'

import style from './HintPopup.module.scss'


export const HintPopup = ({ phase, active, setActive }) => {

  const close = () => { setActive(false) }

  return(
    <div
    className={ active ? `${style.popup} ${style.active}` : style.popup }
    onClick={() => setActive(false)}
    >
      <div
        className={ active ? `${style.popup_content} ${style.active}` : style.popup_content }
        onClick={e => e.stopPropagation()}
      >
        <div className="center">
          Подсказка №{phase + 1}
        </div>
        { phase === 0 && <SelectionPhaseHint /> }
        { phase === 1 && <CriteriaRatingHint /> }
        { phase === 2 && <CriteriaWeightsHint /> }
        { phase === 3 && <AlternativesRatingHint /> }
        { phase === 4 && <AlternativesWeightsHint /> }
        { phase === 5 && <GroupsWeightsHint /> }
        { phase === 6 && <GlobalWeightsHint /> }
      </div>
      <div className={style.popup_exit}>
        <i className="small material-icons" onClick={close}>close</i>
      </div>
    </div>
  )
}
