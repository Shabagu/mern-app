import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../../components/Loader'
import { ResearchCard } from '../../components/ResearchCard'

export const ResearchPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [research, setResearch] = useState(null)
  const researchId = useParams().id

  const getResearch = useCallback( async () => {
    try {
      const fetched = await request(`/api/research/${researchId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setResearch(fetched)
    } catch (e) {}
  }, [token, researchId, request])

  useEffect(() => {
    getResearch()
  }, [getResearch])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && research &&
        <ResearchCard research={research} />
      }
    </>
  )
}



