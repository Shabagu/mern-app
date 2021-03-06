import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/common/Loader'

import { ResearchList } from '../components/researches/ResearchList'

import style from './ProfilePage.module.scss'


export const ProfilePage = () => {

  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [user, setUser] = useState([])
  
  const logoutHandler = () => {
    auth.logout()
    history.push('/')
  }

  const fetchUser = useCallback( async () => {
    try {
      const fetched = await request('/api/profile/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUser(...fetched)

    } catch (e) {
      message(e.message)
      setTimeout(logoutHandler, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, request])

  const [researches, setResearches] = useState([])
  const [isResearchesFetching, setIsResearchesFetching] = useState(false)
  const fetchResearches = useCallback( async () => {
    try {
      setIsResearchesFetching(true)
      const fetched = await request('/api/research/recent', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setResearches(fetched)
      setIsResearchesFetching(false)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchUser()
    fetchResearches()
  }, [fetchUser, fetchResearches])

  if (loading) {
    return <Loader />
  }

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Мой профиль</title>
        </Helmet>
      </HelmetProvider>
      <div className={style.profile_container}>
        <div>
          <div>
            <h5>Мой профиль</h5>
          </div>
          {!loading &&
            <UserInfo user={user}/>
          }
          <a className="btn" href="/researches">
            Все исследования
            <i className="material-icons right">dehaze</i>
          </a>
        </div>
        <div className={style.recent_researches_container}>
          {!loading && 
            <RecentResearches
              researches={researches}
              isFetching={isResearchesFetching}
            />
          }
        </div>
      </div>
    </>
  )
}

const RecentResearches = ({ researches, isFetching }) => {

  if (isFetching) {
    return <Loader />
  }
  
  return(
    <>
      <h5 className='center'>Недавние исследования</h5>
      {!isFetching && <ResearchList researches={researches} />}
    </>
  )
}



const UserInfo = ({ user }) => {

  const [popupActive, setPopupActive] = useState(false)

  const popup = () => {
    setPopupActive(true)
  }

  return(
    <>
      <div className={style.user_info_container}>
        <div className={style.subcontainer}>
          <div className={style.picture_box} onClick={popup}>
            <img
              width="204"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt=""
              onClick={popup}
            />
          </div>
          <div className={style.email}>
            <span>
              {user.email}
              <i className="material-icons left">mail_outline</i>
            </span>
          </div>
          { user.tel === null &&
            <div className={style.phone}>
              <span>
                телефон не указан
                <i className="material-icons left">phone</i>
              </span>
            </div>
          }
          { user.tel !== null &&
            <div className={style.phone}>
              <span>
                {user.tel}
                <i className="material-icons left">phone</i>
              </span>
            </div>
          }
        </div>
      </div>
      <ProfileImgPopup active={popupActive} setActive={setPopupActive}/>
    </>
  )
}



const ProfileImgPopup = ({ active, setActive }) => {
  return(
    <div
      className={ active ? `${style.popup} ${style.active}` : style.popup }
      onClick={() => setActive(false)}
    >
      <div
        className={ active ? `${style.popup_content} ${style.active}` : style.popup_content }
        onClick={e => e.stopPropagation()}
      >
        <p className="center">Изображение не загружено</p>
      </div>
    </div>
  )
}
