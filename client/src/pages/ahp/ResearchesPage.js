import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../../components/common/Loader'
import { ResearchList } from '../../components/researches/ResearchList'

import style from './ResearchesPage.module.scss'

export const ResearchesPage = () => {

  const [researches, setResearches] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchResearches = useCallback( async () => {
    try {
      const fetched = await request('/api/research/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setResearches(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchResearches()
  }, [fetchResearches])


  if (loading) {
    return <Loader />
  }

  return(
    <div className={style.researches_box}>
      <h3 className={style.page_title}>Мои исследования</h3>
        {!loading &&
          <ResearchList
            researches={researches}
          />
        }
    </div>
  )
}
