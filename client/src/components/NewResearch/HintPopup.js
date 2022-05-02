import { SelectionPhaseHint } from '../../components/NewResearch/Phases/Hints/SelectionPhaseHint'
import { CriteriaRatingHint } from '../../components/NewResearch/Phases/Hints/CriteriaRatingHint'
import { CriteriaWeightsHint } from '../../components/NewResearch/Phases/Hints/CriteriaWeightsHint'
import { AlternativesRatingHint } from '../../components/NewResearch/Phases/Hints/AlternativesRatingHint'
import { AlternativesWeightsHint } from '../../components/NewResearch/Phases/Hints/AlternativesWeightsHint'
import { GroupsWeightsHint } from '../../components/NewResearch/Phases/Hints/GroupsWeightsHint'
import { GlobalWeightsHint } from '../../components/NewResearch/Phases/Hints/GlobalWeightsHint'

import style from './HintPopup.module.scss'


export const HintPopup = ({ phase, active, setActive }) => {
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
  </div>
  )
}
