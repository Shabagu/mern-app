import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

import { AhpInfoPage } from './pages/AhpInfoPage'
import { AhpPage } from './pages/AhpPage'
import { MyQueriesPage } from './pages/MyQueriesPage'

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
        <Route path="/ahpinfo">
          <AhpInfoPage />
        </Route>
        <Route path="/newquery">
          <AhpPage />
        </Route>
        <Route path="/myqueries">
          <MyQueriesPage />
        </Route>



        {/* <Route path="/ahp/query/selection">
          <AhpQSelectionPage />
        </Route>
        <Route path="/ahp/query/criteriacomparison">
          <AhpQCriteriaComparisonPage />
        </Route>
        <Route path="/ahp/query/criterianormalization">
          <AhpQCriteriaNormalizationPage />
        </Route> */}



        <Route path="/test">
          <TestPage />
        </Route>



        <Redirect to="/ahpinfo" />
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
