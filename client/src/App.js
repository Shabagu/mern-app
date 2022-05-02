import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './appRoutes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Loader } from './components/common/Loader';
import 'materialize-css'

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter forceRefresh>
      { isAuthenticated && <Navbar /> }
        <div className='container'>
          { routes }
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
