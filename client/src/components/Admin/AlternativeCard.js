import { useEffect, useContext} from "react"
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'

import style from './AlternativeCard.module.scss'


export const AlternativeCard = ({
  alternative,
  closePopup,
  alternativesRefetch,
  // isChange,
  // change,
  // changes,
  // changesSetter,
}) => {

  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const {token} = useContext(AuthContext)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const name = alternative.name

  const changeHandler = async () => {
    try {
      const data = await request('/api/admin/alternatives/changerelevance', 'POST', {name}, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      closePopup()
      alternativesRefetch()
    } catch (e) {}
  }

  const saveHandler = () => {

  }

  const deleteHandler = async () => {
    try {
      const data = await request('/api/admin/alternatives/delete', 'DELETE', {name}, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      closePopup()
      alternativesRefetch()
    } catch (e) {}
  }


  return(
    <div className={style.alternative_card}>
      <div className={style.content}>
        <h6 className="center">
          Карточка альтернативы
        </h6>
        <div className={style.title}>
          <strong>{alternative.name}</strong>
        </div>
        <div>
          <div className="switch">
            Актуальность:
            <label>
              <input
                type="checkbox"
                checked={alternative.relevance}
                onChange={(e) => changeHandler(e)}
              />
              <span className="lever" />
            </label>
          </div>
        </div>

      </div>

      <div className={style.menu}>
        <button
          className={`btn ${style.saving}`}
          onClick={saveHandler}
          disabled={loading}
        >
          Сохранить
        </button>
        <button
          className={`btn ${style.deletion}`}
          onClick={deleteHandler}
          disabled={loading}
        >
          Удалить
        </button>
      </div>
    </div>
  )
}
