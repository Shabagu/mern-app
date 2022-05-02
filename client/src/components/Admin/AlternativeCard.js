import { useEffect, useContext} from "react"
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'


export const AlternativeCard = ({ alternative, closePopup, alternativesRefetch }) => {

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

  const deleteHandler = async () => {
    try {
      const data = await request('/api/admin/deletealternative', 'DELETE', {name}, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      closePopup()
      alternativesRefetch()
    } catch (e) {}
  }


  return(
    <div>
      <p className="center">Карточка альтернативы</p>
      <p className="center">
        <strong>{alternative.name}</strong>
      </p>
      <button
        className="btn"
        onClick={deleteHandler}
        disabled={loading}
      >
        Удалить
      </button>
    </div>
  )
}
