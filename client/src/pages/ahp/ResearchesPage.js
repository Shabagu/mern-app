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
      setTimeout(logoutHandler, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, request])

  useEffect(() => {
    fetchResearches()
  }, [fetchResearches])


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
        <h4 className={style.page_title}>Мои исследования</h4>
        <div className={style.researches_subbox}>
          <div className={style.menu}>
            <a className="btn" href="/profile">
              Назад
              <i className="material-icons left">arrow_back</i>
            </a>
          </div>
          <div className={style.researches_list}>
            {!loading &&
              <ResearchList
                researches={researches}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
}
