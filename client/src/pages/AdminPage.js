import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'

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
  }, [fetchAllCriteria])

  if (loading) {
    return <Loader />
  }

  return(
    <div>
      <p>Управление</p>
      <details open>
        <summary>Альтернативы</summary>
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
                      <input type="checkbox" checked/>
                      <span>Актуально</span>
                    </label>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
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
                      <input type="checkbox" checked/>
                      <span>Актуально</span>
                    </label>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </details>
    </div>

  )
}
