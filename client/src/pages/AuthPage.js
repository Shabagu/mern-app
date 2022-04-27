import { useContext, useEffect, useState } from 'react'
// import { useHistory } from "react-router-dom"
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

import style from './AuthPage.module.scss'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  // const history = useHistory()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
    // tel: '',
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
      if (data.message === 'Пользователь создан') {
        conditionHandler()
      }
    } catch (e) {}
  }
  
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  
  const registrationPressHandler = async event => {
    if (event.key === 'Enter') {
      registrationHandler()
    }
  }

  const loginPressHandler = async event => {
    if (event.key === 'Enter') {
      loginHandler()
    }
  }

  const conditionHandler = () => {
    form.email = ''
    form.password = ''
    // form.tel = ''

    if (condition === 'login') setCondition('registration')
    else setCondition('login')
  }

  return (
    <div className="row">
      <div className="col s4 offset-s4">
        <h1 className={style.title}>~Лучший~ ~отпуск~</h1>
        {condition === 'login' &&
          <LoginCard
            form={form}
            changeHandler={changeHandler}
            loginHandler={loginHandler}
            pressHandler={loginPressHandler}
            conditionHandler={conditionHandler}
            loading={loading}
          />
        }
        {condition === 'registration' &&
          <RegistrationCard
            form={form}
            changeHandler={changeHandler}
            registrationHandler={registrationHandler}
            pressHandler={registrationPressHandler}
            conditionHandler={conditionHandler}
            loading={loading}
          />
        }
      </div>
    </div>
  )
}

const LoginCard = ({
  form,
  changeHandler,
  loginHandler,
  pressHandler,
  conditionHandler,
  loading,
}) => {

  return(
    <div className="card">
    <div className={`card-content ${style.card}`}>
      <span className="card-title center">Вход</span>
      <div>
        <div className="input-field">
          <input
            id="email"
            type="text"
            name="email"
            value={form.email}
            onChange={changeHandler}
            onKeyPress={pressHandler}
            className="emailField"
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
            className="passwordField"
          />
          <label htmlFor="password" className="label-input">Пароль</label>
        </div>

      </div>
    </div>
    <div className={style.bottom}>
      <div className={style.mainbtn}>
        <button
          className="btn"
          onClick={loginHandler}
          disabled={loading}
        >
          Войти
        </button>
      </div>
      <div className={style.condition}>
        <div
          className={style.textbtn}
          onClick={conditionHandler}
          tabIndex={0}
          onKeyPress={conditionHandler}
        >
          Зарегистрироваться
        </div>
      </div>
    </div>
  </div>
  )
}

const RegistrationCard = ({
  form,
  changeHandler,
  registrationHandler,
  pressHandler,
  conditionHandler,
  loading,
}) => {

  return(
    <div className="card">
      <div className={`card-content ${style.card}`}>
        <span className="card-title center">Регистрация</span>
        <div>
          <div className="input-field">
            <input
              id="email"
              type="text"
              name="email"
              value={form.email}
              onChange={changeHandler}
              onKeyPress={pressHandler}
              className="emailField"
            />
            <label htmlFor="email" className="label-input">Email</label>
          </div>
          
          {/* <div className="input-field">
            <input
              id="tel"
              type="tel"
              name="tel"
              value={form.tel}
              onChange={changeHandler}
              onKeyPress={pressHandler}
              // className="emailField"
              maxLength={11}
            />
            <label htmlFor="tel" className="label-input">Телефон</label>
            <span className="helper-text" data-error="wrong" data-success="right" style={{marginBottom: '40px'}}>
              Формат ввода - 11 цифр (7XXXXXXXXXX)
            </span>
          </div> */}

          <div className="input-field">
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              onKeyPress={pressHandler}
              className="passwordField"
            />
            <label htmlFor="password" className="label-input">Пароль</label>
          </div>

        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.mainbtn}>
          <button
            className="btn"
            onClick={registrationHandler}
            disabled={loading}
          >
            Зарегистрироваться
          </button>
        </div>
        <div className={style.condition}>
          <div
            className={style.textbtn}
            onClick={conditionHandler}
            tabIndex={0}
            onKeyPress={conditionHandler}
          >
            У меня уже есть аккаунт
          </div>
        </div>

      </div>
    </div>
  )
}
