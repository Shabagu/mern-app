import { useHistory } from 'react-router-dom'

export const ProfilePage = () => {

  const history = useHistory()

  const goToResearches = () => {
    history.push('/researches')
  }

  return(
    <>
      <p>
        Мой профиль
      </p>
      <button className="btn" onClick={goToResearches}>
        Мои исследования
      </button>
    </>
  )
}
