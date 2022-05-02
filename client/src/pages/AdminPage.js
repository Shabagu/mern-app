import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { AddAlternative } from "../components/Admin/AddAlternative"

import style from "./AdminPage.module.scss"

export const AdminPage = () => {

  const [allCriteria, setAllCriteria] = useState([])
  const [allAlternatives, setAllAlternatives] = useState([])

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchAllCriteria = useCallback( async () => {
    try {
      const fetched = await request('/api/research/criteria', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAllCriteria(fetched)
    } catch (e) {}
  }, [token, request])

  const fetchAllAlternatives = useCallback( async () => {
    try {
      const fetched = await request('/api/research/alternatives', 'GET', null, {
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
  
  const popup = () => {
    setPopupActive(true)
  }

  if (loading) {
    return <Loader />
  }

  return(
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
                    <td>{allAlternatives[i].name}</td>
                    <td>
                      <label>
                        <input type="checkbox" checked readOnly/>
                        <span>Актуально</span>
                      </label>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          <div className={style.adding_box}>
            <a
              className="waves-effect waves-light btn"
              onClick={popup}
            >
              Добавить
              <i className="material-icons right">add</i>
            </a>
          </div>
        </details>
        <details open>
          <summary>Критерии</summary>
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
                {[...Array(allCriteria.length)].map((x, i) => 
                  <tr key={i}>
                    <td>{allCriteria[i].name}</td>
                    <td>
                      <label>
                        <input type="checkbox" defaultChecked/>
                        <span>Актуально</span>
                      </label>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </details>
      </div>
      <AdminPopup
        active={popupActive}
        setActive={setPopupActive}
      />
    </div>
  )
}



const AdminPopup = ({ active, setActive }) => {

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
        <AddAlternative />
      </div>
      <div className={style.popup_exit}>
        <i className="small material-icons" onClick={close}>close</i>
      </div>
    </div>
  )
}
