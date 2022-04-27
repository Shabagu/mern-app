import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

// import { ResearchList } from '../components/ResearchList'
import { ResearchesPage } from './ahp/ResearchesPage'

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
    <div>
      <p>
        Мой профиль
      </p>
      {!loading &&
        <UserInfo user={user}/>
      }
      <button className="btn" onClick={goToResearches}>
        Мои исследования
      </button>
    </div>
  )
}

const UserInfo = ({ user }) => {

  return(
    <div style={{display: 'flex'}}>
      <div style={{marginRight: '20px'}}>
        <div style={{border: '2px solid #000', width: '200px'}}>
          <img width='200' src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'/>
        </div>
        <p>{user.email}</p>
        { user.tel === null && <p>телефон не указан</p> }
        { user.tel !== null && <p>{user.tel}</p> }
      </div>
      <div>
        <ResearchesPage />
      </div>
    </div>
  )
}
