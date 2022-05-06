import { useState, useEffect, useContext } from "react"
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'



export const AddAlternative = ({ closePopup, alternativesRefetch }) => {
  // const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const {token} = useContext(AuthContext)

  const [form, setForm] = useState({
    name: '',
    relevance: true,
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const addHandler = async () => {
    try {
      const data = await request('/api/admin/alternatives/add', 'POST', {...form}, {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
      closePopup()
      alternativesRefetch()
    } catch (e) {}
  }

  return(
    <div>
      <div className="center">Добавление альтернативы</div>
      <div className="input-field">
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        <label htmlFor="name" className="label-input">Наименование</label>
      </div>
      <button
          className="btn"
          onClick={addHandler}
          disabled={loading}
      >
        Добавить
      </button>
    </div>
  )
}
