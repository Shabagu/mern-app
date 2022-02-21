import { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    // console.log('Error', error)
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registrationHandler = async () => {
    try {
      const data = await request('/api/auth/registration', 'POST', {...form})
      // console.log('Data', data)
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      // console.log('Data', data)
      // message(data.message)
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s4 offset-s4">
        <h1>~Лучший~ ~отпуск~</h1>
          <div className="card">
          <div className="card-content">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  // placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email" className="label-input">Email</label>
              </div>

              <div className="input-field">
                <input
                  // placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password" className="label-input">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action registration">
            <button onClick={loginHandler} disabled={loading} className="btn"> Войти</button>
            <button onClick={registrationHandler} disabled={loading} className="btn"> Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  )
}
