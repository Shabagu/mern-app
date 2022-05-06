import { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/common/Loader'

import { AddAlternative } from '../components/admin/AddAlternative'
import { AlternativeCard } from '../components/admin/AlternativeCard'

import style from './AdminPage.module.scss'


export const AdminPage = () => {

  
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()

  const logoutHandler = () => {
    auth.logout()
    history.push('/')
  }

  const [allCriteria, setAllCriteria] = useState([])
  const [allAlternatives, setAllAlternatives] = useState([])

  const fetchAllCriteria = useCallback( async () => {
    try {
      const fetched = await request('/api/admin/criteria/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAllCriteria(fetched)
    } catch (e) {
      message(e.message)
      setTimeout(logoutHandler, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, request])

  const fetchAllAlternatives = useCallback( async () => {
    try {
      const fetched = await request('/api/admin/alternatives/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAllAlternatives(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchAllCriteria()
    fetchAllAlternatives()
  }, [fetchAllCriteria, fetchAllAlternatives])

  
  const [popupActive, setPopupActive] = useState(false)
  const [popupPurpose, setPopupPurpose] = useState('')
  const [popupArgument, setPopupArgument] = useState('')
  
  const popup = (purpose, argument) => {
    setPopupActive(true)
    setPopupPurpose(purpose)
    if (argument) {
      setPopupArgument(argument)
    }
  }

  if (loading) {
    return <Loader />
  }

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>Управление</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <h5>Управление</h5>
        <div className={style.tables_container}>
          <details open>
            <summary className="center">Альтернативы</summary>
            <table className={style.manage}>
              <thead>
                <tr>
                  <th colSpan={2}>Альтернативы</th>
                </tr>
                <tr>
                  <th>Название</th>
                  <th>Актуальность</th>
                </tr>
              </thead>
              <tbody>
                  {[...Array(allAlternatives.length)].map((x, i) => 
                    <tr key={i}>
                      <td 
                        className={style.alternative_cell}
                        onClick={() => {popup('alternative_card', allAlternatives[i])}}
                      >
                        {allAlternatives[i].name}
                      </td>
                      <td>
                        <div className={style.relevance_box}>
                          { allAlternatives[i].relevance &&
                            <div className={style.relevance_subbox}>
                              <div><i className="material-icons">check_circle</i></div>
                              <div><span>Актуально</span></div>
                            </div>
                          }
                          { !(allAlternatives[i].relevance) &&
                            <div className={style.relevance_subbox}>
                              <div><i className="material-icons">close</i></div>
                              <div><span>Неактуально</span></div>
                            </div>
                          }
                        </div>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
            <div className={style.adding_box}>
              <span
                className="waves-effect waves-light btn"
                onClick={() => popup('adding_alternative', null)}
              >
                Добавить
                <i className="material-icons right">add</i>
              </span>
            </div>
          </details>
          <details open>
            <summary>Критерии</summary>
            <table className={style.manage}>
              <thead>
                <tr>
                  <th colSpan={2}>Критерии</th>
                </tr>
                <tr>
                  <th>Название</th>
                  {/* <th>Актуальность</th> */}
                </tr>
              </thead>
              <tbody>
                  {[...Array(allCriteria.length)].map((x, i) => 
                    <tr key={i}>
                      <td>{allCriteria[i].name}</td>
                      {/* <td>
                        <label>
                          <input type="checkbox" defaultChecked/>
                          <span>Актуально</span>
                        </label>
                      </td> */}
                    </tr>
                  )}
              </tbody>
            </table>
          </details>
        </div>
        <AdminPopup
          active={popupActive}
          setActive={setPopupActive}
          purpose={popupPurpose}
          argument={popupArgument}
          alternativesRefetch={fetchAllAlternatives}
        />
      </div>
    </>
  )
}



const AdminPopup = ({ active, setActive, purpose, argument, alternativesRefetch }) => {

  const close = () => { setActive(false) }

  return(
    <div
    className={ active ? `${style.popup} ${style.active}` : style.popup }
    onClick={() => setActive(false)}
    >
      <div
        className={ active ? `${style.popup_content} ${style.active}` : style.popup_content }
        onClick={e => e.stopPropagation()}
      >
        {purpose === 'adding_alternative' &&
          <AddAlternative
            closePopup={close}
            alternativesRefetch={alternativesRefetch}
            />
          }
        {purpose === 'alternative_card' &&
          <AlternativeCard
            alternative={argument}
            closePopup={close}
            alternativesRefetch={alternativesRefetch}
          />
        }
        
      </div>
      <div className={style.popup_exit}>
        <i className="small material-icons" onClick={close}>close</i>
      </div>
    </div>
  )
}
