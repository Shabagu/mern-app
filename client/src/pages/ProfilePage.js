import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

import { ResearchList } from '../components/ResearchList'

import { ProfileImgPopup } from './ProfileImgPopup'

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

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) {
    return <Loader />
  }

  return(
    <div style={{display: 'flex'}}>
      <div>
        <h5>
          Мой профиль
        </h5>
        {!loading &&
          <UserInfo user={user}/>
        }
        <button className="btn" onClick={goToResearches}>
          Все исследования
        </button>
      </div>
      <div style={{width: '100%'}}>
        {!loading && 
          <LatestResearches />
        }
      </div>
    </div>
  )
}

const LatestResearches = () => {

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const [researches, setResearches] = useState([])

  const fetchResearches = useCallback( async () => {
    try {
      const fetched = await request('/api/research', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setResearches(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchResearches()
  }, [fetchResearches])

  if (loading) {
    return <Loader />
  }
  
  return(
    <>
      <h5 className='center'>Недавние исследования</h5>
      {!loading && <ResearchList researches={researches} />}
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
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '20px'}}>
          <div style={{border: '2px solid #000', width: '200px'}} onClick={popup}>
            <img width='200' src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt='' onClick={popup}/>
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
