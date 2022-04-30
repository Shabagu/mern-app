import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

import { InfoPage } from './pages/ahp/InfoPage'
import { NewResearchPage } from './pages/ahp/NewResearchPage'
import { ProfilePage } from './pages/ProfilePage'
import { ResearchesPage } from './pages/ahp/ResearchesPage'
import { ResearchPage } from './pages/ahp/ResearchPage'

import { AdminPage } from './pages/AdminPage'
// import { TestPage } from './pages/TestPage'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>


        {/* ========================== */}

        <Route path="/info">
          <InfoPage />
        </Route>
        <Route path="/newresearch">
          <NewResearchPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/researches">
          <ResearchesPage />
        </Route>
        <Route path="/research/:id">
          <ResearchPage />
        </Route>

        <Route path="/admin">
          <AdminPage />
        </Route>

        {/* ========================== */}


        <Route path="/test">
          {/* <TestPage /> */}
        </Route>


        <Redirect to="/info" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
