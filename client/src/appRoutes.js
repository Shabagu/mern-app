import { Switch, Route, Redirect } from 'react-router-dom'

import { LinksPage } from './pages/other/LinksPage'
import { CreatePage } from './pages/other/CreatePage'
import { DetailPage } from './pages/other/DetailPage'

import { AuthPage } from './pages/AuthPage'
import { ProfilePage } from './pages/ProfilePage'
import { AlternativesPage } from './pages/AlternativesPage'
import { InfoPage } from './pages/ahp/InfoPage'
import { NewResearchPage } from './pages/ahp/NewResearchPage'
import { ResearchesPage } from './pages/ahp/ResearchesPage'
import { ResearchPage } from './pages/ahp/ResearchPage'

import { AdminPage } from './pages/AdminPage'
import { TestPage } from './pages/other/TestPage'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>

        {/* ====================== */}
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/test">
          <TestPage />
        </Route>
        {/* ====================== */}


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
        
        <Route path="/alternatives">
          <AlternativesPage />
        </Route>

        <Route path="/admin">
          <AdminPage />
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
