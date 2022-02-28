import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

import { AhpInfoPage } from './pages/AhpInfoPage'
import { AhpQSelectionPage } from './pages/AhpQSelectionPage'
import { AhpQCriteriaComparisonPage } from './pages/AhpQCriteriaComparisonPage'
import { AhpQCriteriaNormalizationPage } from './pages/AhpQCriteriaNormalizationPage'

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
        <Route path="/ahp/info">
          <AhpInfoPage />
        </Route>
        <Route path="/ahp/query/selection">
          <AhpQSelectionPage />
        </Route>
        <Route path="/ahp/query/criteriacomparison">
          <AhpQCriteriaComparisonPage />
        </Route>
        <Route path="/ahp/query/criterianormalization">
          <AhpQCriteriaNormalizationPage />
        </Route>


        <Redirect to="/ahp/info" />
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
