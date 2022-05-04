import { GlobalWeights } from './tabs/GlobalWeights'
import { GroupsWeights } from './tabs/GroupsWeights'
import { CriteriaRating } from './tabs/CriteriaRating'
import { AlternativesRating } from './tabs/AlternativesRating'

import style from './ResearchCard.module.scss'

export const ResearchCard = ({ research, tab, tabSetter }) => {

  const date = new Date(research.date).toLocaleDateString()
  const time = new Date(research.date).toLocaleTimeString()

  return (
    <div className={style.research_box}>
      <h4>Исследование №{research.index}</h4>
      <div className={style.research_subbox}>

        {/* <p>Сокращённая ссылка: <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p> */}
        {/* <p>Полная ссылка: <a href={link.from} target="_blank" rel="noreferrer">{link.from}</a></p> */}
        {/* <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p> */}
        {/* <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p> */}

        {/* ОСНОВНАЯ ИНФОРМАЦИЯ В ОТДЕЛЬНОЙ ВКЛАДКЕ!!!!! */}
        {/* <div>Дата исследования: {date}</div> */}
        {/* <div>Время исследования: {time}</div> */}
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
        {tab === 0 && <GlobalWeights research={research} /> }
        {tab === 1 && <GroupsWeights research={research} /> }
        {tab === 2 && <CriteriaRating research={research} /> }
        {tab === 3 && <AlternativesRating research={research} /> }
      </div>
    </div>
  )
}
