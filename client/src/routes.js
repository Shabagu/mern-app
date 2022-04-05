import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

import { InfoPage } from './pages/ahp/InfoPage'
import { NewResearchPage } from './pages/ahp/NewResearchPage'
import { ResearchesPage } from './pages/ahp/ResearchesPage'

import { TestPage } from './pages/TestPage'


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

        <Route path="/info">
          <InfoPage />
        </Route>
        <Route path="/research">
          <NewResearchPage />
        </Route>
        <Route path="/researches">
          <ResearchesPage />
        </Route>

        <Route path="/test">
          <TestPage />
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
