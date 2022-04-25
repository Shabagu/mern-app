import { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

import style from './AuthPage.module.scss'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  
  const [condition, setCondition] = useState('login')

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

  const registrationHandler = async () => {
    try {
      const data = await request('/api/auth/registration', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      loginHandler()
    }
  }

  return (
    <div className="row">
      <div className="col s4 offset-s4">
        <h1 className={style.title}>~Лучший~ ~отпуск~</h1>
          <div className="card">
          <div className={`card-content ${style.card}`}>
            <span className="card-title center">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="email" className="label-input">Email</label>
              </div>

              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="password" className="label-input">Пароль</label>
              </div>

            </div>
          </div>
          <div className={style.bottom}>
            <div className={style.login}>
              <button onClick={loginHandler} disabled={loading} className="btn">
                Войти
              </button>
            </div>
            {/* <div className={style.registration}>
              <button onClick={registrationHandler} disabled={loading} className="btn">
                Регистрация
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
