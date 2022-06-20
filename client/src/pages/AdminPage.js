import { useCallback, useContext, useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/common/Loader'

import { AddAlternative } from '../components/admin/AddAlternative'
import { AlternativeCard } from '../components/admin/AlternativeCard'

import style from './AdminPage.module.scss'


export const AdminPage = () => {

  
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const [alternatives, setAlternatives] = useState([])

  const fetchAlternatives = useCallback( async () => {
    try {
      const fetched = await request('/api/admin/alternatives/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAlternatives(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchAlternatives()
  }, [fetchAlternatives])

  
  const [popupActive, setPopupActive] = useState(false)
  const [popupPurpose, setPopupPurpose] = useState('')
  const [popupArgument, setPopupArgument] = useState('')
  const [menuContent, setMenuContent] = useState('')
  const [alternativeI, setAlternativeI] = useState('')
  
  const popup = (purpose, argument) => {
    setPopupActive(true)
    setPopupPurpose(purpose)
    if (argument) {
      setPopupArgument(argument)
    }
  }

  const menu = (argument, i) => {
    setMenuContent(argument)
    setAlternativeI(i)
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
      <h5>Управление</h5>
      <div className={style.admin_container}>
        <div className={style.tables_container}>
          <div className={style.alternatives_table}>
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
                  {[...Array(alternatives.length)].map((x, i) => 
                    <tr key={i} onClick={() => {menu(alternatives[i], i)}}>
                      <td 
                        className={
                          alternatives[i].relevance ?
                          `${style.alternative_cell} ${style.relevant}` :
                          `${style.alternative_cell} ${style.irrelevant}`
                        }
                      >
                        {alternatives[i].name}
                      </td>
                      <td className={style.relevance}>
                        { alternatives[i].relevance &&
                          <span className={style.relevant}>
                            Актуально
                            <i className="material-icons left">check_circle</i>
                          </span>
                        }
                        { !(alternatives[i].relevance) &&
                          <span className={style.irrelevant}>
                            Неактуально
                            <i className="material-icons left">close</i>
                          </span>
                        }
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
          </div>
        </div>
        <div className={style.alternative_menu}>
          { menuContent &&
            <AlternativeCard
              alternative={menuContent}
              alternativesRefetch={fetchAlternatives}
              setMenuContent={setMenuContent}
              alternativeI={alternativeI}
            />
          }
        </div>
        <AdminPopup
          active={popupActive}
          setActive={setPopupActive}
          purpose={popupPurpose}
          argument={popupArgument}
          alternativesRefetch={fetchAlternatives}
        />
      </div>
    </>
  )
}



const AdminPopup = ({ active, setActive, purpose, argument, alternativesRefetch }) => {
  
  const close = () => {
    setActive(false)
  }

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
