import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { Loader } from '../../components/common/Loader'

import { ResearchList } from '../../components/researches/ResearchList'

import style from './ResearchesPage.module.scss'


export const ResearchesPage = () => {

  // Количество исследований на одной странице
  const N_RES = 5

  const H_TITILE = [
    '(все)',
    '(сегодня)',
    '(вчера)',
    '(эта неделя)',
    '(этот месяц)',
    '(этот год)',
  ]

  const [allResearches, setAllResearches] = useState([])
  const [actResearches, setActResearches] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()

  const logoutHandler = () => {
    auth.logout()
    history.push('/')
  }

  const fetchResearches = useCallback( async () => {
    try {
      const fetched = await request('/api/research/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAllResearches(fetched)
      setActResearches(fetched.slice(0, N_RES))
    } catch (e) {
      message(e.message)
      // setTimeout(logoutHandler, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, request])

  useEffect(() => {
    fetchResearches()
  }, [fetchResearches])

  const [tab, setTab] = useState(0)
  const tabSetter = (val) => {
    setTab(val)
  }

  const [pg, setPg] = useState(1)
  const pgSetter = (val) => {
    setPg(val)
  }


  if (loading) {
    return <Loader />
  }

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Мои исследования</title>
        </Helmet>
      </HelmetProvider>
      <div className={style.researches_box}>
        <h4 className={style.page_title}>Мои исследования {H_TITILE[tab]}</h4>
        <div className={style.pages}>
          <div className={pg === 1 ? `${style.pgb} ${style.active_pgb}` : style.pgb} onClick={() => pgSetter(1)}>
            <div className={style.number}>1</div>
          </div>
          <div className={pg === 2 ? `${style.pgb} ${style.active_pgb}` : style.pgb} onClick={() => pgSetter(2)}>
            <div className={style.number}>2</div>
          </div>
        </div>
        <div className={style.researches_subbox}>
          <div className={style.menu}>
            <div className={tab === 0 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(0)}>
              Все исследования
            </div>
            <div className={tab === 1 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(1)}>
              Сегодня
            </div>
            <div className={tab === 2 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(2)}>
              Вчера
            </div>
            <div className={tab === 3 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(3)}>
              Эта неделя
            </div>
            <div className={tab === 4 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(4)}>
              Этот месяц
            </div>
            <div className={tab === 5 ? `${style.tab} ${style.active_tab}` : style.tab} onClick={() => tabSetter(5)}>
              Этот год
            </div>
          </div>
          <div className={style.researches_list}>
            {!loading &&
              <ResearchList
                researches={actResearches}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
}



