import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

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
    <div>
      <p key={user._id}>{user.email}</p>
    </div>
  )
}
