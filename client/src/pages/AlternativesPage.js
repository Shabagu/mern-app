import { useCallback, useContext, useEffect, useState } from 'react'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

import { Loader } from '../components/common/Loader'
import { Link } from 'react-router-dom'


// import style from './AlternativesPage.module.scss'


export const AlternativesPage = () => {

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const [relevantAlternatives, setRelevantAlternatives] = useState([])
  const [irrelevantAlternatives, setIrrelevantAlternatives] = useState([])

  const fetchRelevantAlternatives = useCallback( async () => {
    try {
      const fetched = await request('/api/alternative/allrelevant', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setRelevantAlternatives(fetched)
    } catch (e) {}
  }, [token, request])

  const fetchIrrelevantAlternatives = useCallback( async () => {
    try {
      const fetched = await request('/api/alternative/allirrelevant', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setIrrelevantAlternatives(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchRelevantAlternatives()
    fetchIrrelevantAlternatives()
  }, [fetchRelevantAlternatives, fetchIrrelevantAlternatives])


  if (loading) {
    return <Loader />
  }

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Обзор альтернатив</title>
        </Helmet>
      </HelmetProvider>
    
      <div>
        <h3>Обзор альтератив</h3>
        <p>Актуальные алтернативы:</p>
        <ol>
          {[...Array(relevantAlternatives.length)].map((x, i) => 
            <li key={i}>
              {/* {relevantAlternatives[i].name} */}
              <Link to={`/alternative/${relevantAlternatives[i]._id}`}>
                {relevantAlternatives[i].name}
              </Link>
            </li>
          )}
        </ol>
        <p>Неактуальные алтернативы:</p>
        <ol>
          {[...Array(irrelevantAlternatives.length)].map((x, i) => 
            <li key={i}>
              <Link to={`/alternative/${irrelevantAlternatives[i]._id}`}>
                {irrelevantAlternatives[i].name}
              </Link>
            </li>
          )}
        </ol>
      </div>
    </>
  )
}
