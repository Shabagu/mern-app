import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../../components/common/Loader'

import { ResearchCard } from '../../components/researches/ResearchCard'

import style from './ResearchPage.module.scss'
import not_found_picture from '../../pictures/not_found.png'


export const ResearchPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()

  const [user, setUser] = useState([])
  const [research, setResearch] = useState(null)
  const researchId = useParams().id

  const [tab, setTab] = useState(0)
  const tabSetter = (val) => {
    setTab(val)
  }

  const fetchResearch = useCallback( async () => {
    try {
      const user = await request('/api/profile/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      const research = await request(`/api/research/${researchId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUser(...user)
      setResearch(research)

    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, researchId, request])

  useEffect(() => {
    fetchResearch()
  }, [fetchResearch])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          { research && <title>{`Исследование №${research.index}`}</title> }
          { !research && <title>{`Исследование ...`}</title> }
        </Helmet>
      </HelmetProvider>
      
      { !loading && research &&
        <ResearchCard
          research={research}
          user={user}
          tab={tab}
          tabSetter={tabSetter}
        />
      }
      { !loading && !research &&
        <div className={style.no_content}>
          <h5>Исследование не найдено</h5>
          <div className={style.picture}>
            <img src={not_found_picture} alt="" width={100}/>
          </div>
          <p>
            Проверьте правильность написания адреса страницы исследования или перейдите по прямой ссылке на него:
          </p>
          <ul>
            <li>
              <span className={style.li_number}>1) </span>
              со <Link to={'/profile'}>страницы профиля</Link>
            </li>
            <li>
              <span className={style.li_number}>2) </span>
              со <Link to={'/researches'}>страницы всех исследований</Link>
            </li>
          </ul>
        </div>
      }
    </>
  )
}
