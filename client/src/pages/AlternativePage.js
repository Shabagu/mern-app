import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/common/Loader'

import style from './AlternativePage.module.scss'


export const AlternativePage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  
  const alternativeId = useParams().id
  const [alternative, setAlternative] = useState(null)

  const fetchAlternative = useCallback( async () => {
    try {
      const fetched = await request(`/api/alternative/${alternativeId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAlternative(fetched)
    } catch (e) {}
  }, [token, alternativeId, request])

  useEffect(() => {
    fetchAlternative()
  }, [fetchAlternative])

  if (loading) {
    return <Loader />
  }
  
  return(
    <>

      { !loading && alternative &&
        <AlternativeCard alternative={alternative} />
      }
      {
        !loading && !alternative &&
        <h5>Альтернатива не найдена</h5>
      }
    </>
  )
}


const AlternativeCard = ({ alternative }) => {

  return(
    <div>
      <h5 className={style.title}>
        Обзор альтеративы
      </h5>
      <p>
        {alternative.name}
      </p>
      <p>
        {alternative.relevance.toString()}
      </p>
    </div>
  )
}
