import { MainInfo } from './tabs/MainInfo'
import { GroupsWeights } from './tabs/GroupsWeights'
import { CriteriaRating } from './tabs/CriteriaRating'
import { AlternativesRating } from './tabs/AlternativesRating'

import style from './ResearchCard.module.scss'

export const ResearchCard = ({ research, user, tab, tabSetter }) => {

  const date = new Date(research.date).toLocaleDateString()
  const time = new Date(research.date).toLocaleTimeString()

  const saved = { date: date, time: time }

  return (
    <div className={style.research_box}>
      <h4>Исследование №{research.index}</h4>
      <div className={style.research_subbox}>
        <div className={style.tab_menu}>
          <div className={tab === 0 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(0)}>
            Основная информация
          </div>
          <div className={tab === 1 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(1)}>
            Другие веса
          </div>
          <div className={tab === 2 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(2)}>
            Сравнение критериев
          </div>
          <div className={tab === 3 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(3)}>
            Сравнение альтернатив
          </div>
        </div>
        { tab === 0 && <MainInfo research={research} saved={saved} user={user} /> }
        { tab === 1 && <GroupsWeights research={research} /> }
        { tab === 2 && <CriteriaRating research={research} /> }
        { tab === 3 && <AlternativesRating research={research} /> }
      </div>
    </div>
  )
}
