import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/common/Loader'
import { ResearchList } from '../components/researches/ResearchList'

import style from './ProfilePage.module.scss'


export const ProfilePage = () => {

  const history = useHistory()
  const goToResearches = () => {
    history.push('/researches')
  }

  const [user, setUser] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchUser = useCallback( async () => {
    try {
      const fetched = await request('/api/profile/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUser(...fetched)

    } catch (e) {}
  }, [token, request])

  const [researches, setResearches] = useState([])
  const [isResearchesFetching, setIsResearchesFetching] = useState(false)
  const fetchResearches = useCallback( async () => {
    try {
      setIsResearchesFetching(true)
      const fetched = await request('/api/research', 'GET', null, {
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
    <div className={style.profile_container}>
      <div>
        <div>
          <h5>Мой профиль</h5>
        </div>
        {!loading &&
          <UserInfo user={user}/>
        }
        <button className="btn" onClick={goToResearches}>
          Все исследования
        </button>
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
      <div style={{display: 'flex', marginTop: '15px', width:'250px'}}>
        <div style={{marginRight: '20px'}}>
          <div style={{border: '2px solid #000', width: '200px'}} onClick={popup}>
            <img width='200'
              src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
              alt=''
              onClick={popup}
            />
          </div>
          <p>{user.email}</p>
          { user.tel === null && <p>телефон не указан</p> }
          { user.tel !== null && <p>{user.tel}</p> }
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
