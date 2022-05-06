import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { Loader } from '../../components/common/Loader'

import { ResearchList } from '../../components/researches/ResearchList'

import style from './ResearchesPage.module.scss'

export const ResearchesPage = () => {

  const [researches, setResearches] = useState([])
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
      setResearches(fetched)
    } catch (e) {
      message(e.message)
      logoutHandler()
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

  if (loading) {
    return <Loader />
  }


  return(
    <div className={style.researches_box}>
      <h3 className={style.page_title}>Мои исследования</h3>
      <div className={style.researches_subbox}>
        <div className={style.menu}>
          {/* <div className={style.button_box}>
            <span className="waves-effect waves-light btn">
              button
            </span>
          </div> */}
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
          {!loading &&
            <ResearchList
              researches={researches}
            />
          }
      </div>
    </div>
  )
}
