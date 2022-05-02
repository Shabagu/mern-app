import { useContext } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const logoClickHandler = () => {
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal lighten-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo" style={{
          userSelect: 'none', cursor: 'pointer'}} onClick={logoClickHandler}>
          ~Лучший отдых~
        </span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">

          <li><NavLink to="/info">О МАИ</NavLink></li>
          <li><NavLink to="/newresearch">Новое исследование</NavLink></li>

          {/* <li><NavLink to="/researches">Мои исследования</NavLink></li> */}
          <li><NavLink to="/profile">Мой профиль</NavLink></li>

          
          <li><NavLink to="/admin">Управление</NavLink></li>
          
          {/* <li><NavLink to="/test">'' Test Page ''</NavLink></li> */}

          {/* <li><s><NavLink to="/create">|New-link|</NavLink></s></li> */}
          {/* <li><s><NavLink to="/links">|Links-list|</NavLink></s></li> */}

          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}