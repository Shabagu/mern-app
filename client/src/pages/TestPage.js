import { useState } from "react"
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

import style from './TestPage.module.scss'



export const TestPage = () => {




  const [phase, setPhase] = useState(0)
  const [condition, setCondition] = useState('Значение отсутствует')

  const nextPhaseHandler = () => {
    if (phase <5) {
      setPhase(phase + 1)
    }
  }
  const previousPhaseHandler = () => {
    if (phase > 0) {
      setPhase(phase - 1)
    }
  }


  const handleConditionChange = (condition) => {
    setCondition(condition)
  }


  return(
    <>
      <h1>TestPage</h1>

      <div className={style.container}>
        <div className={style.column}>
          <button className="btn" onClick={previousPhaseHandler}>&lt;</button>
          <button className="btn" onClick={nextPhaseHandler}>&gt;</button>
          
          <p>{phase}</p>
          <p>{condition}</p>

        </div>
        <div>
          {phase === 0 && <Component0 />}
          {phase === 1 && <Component1 conditionChange={handleConditionChange} />}
          {phase === 2 && <Component2 conditionChange={handleConditionChange} />}
          {phase === 3 && <Component3 />}
          {phase === 4 && <Component4 />}
          {phase === 5 && <Component5 />}
        </div>
      </div>
    </>
  )
}



const Component0 = () => {

  // const {loading, request, error, clearError} = useHttp()
  const {request} = useHttp()
  const message = useMessage()

  const [fields, setFields] = useState({
    fieldA: '', fieldB: ''
  })
  const setFieldsHandler = () => {
    setFields({ ...fields, fieldA: 'ABC', fieldB: 'DEF' })
  }
  const logFieldsHandler = () => {
    console.log(fields)
  }
  const fieldsToMongoHandler = async () => {
    try {
      const data = await request('/api/test/test', 'POST', {...fields})
      message(data.message)
    } catch (e) {}
  }

  return(
  <div className={style.column}>
    <p>Компонент 0</p>
    <button className="btn" onClick={setFieldsHandler}>setState1</button>
    <button className="btn" onClick={logFieldsHandler}>logState</button>
    <button className="btn" onClick={fieldsToMongoHandler}>createMongo</button>
  </div>
  )
}

const Component1 = ({ conditionChange }) => {

  const conditionChangeHandler = () => {
    conditionChange('123')
  }

  return(
    <>
      <p>Компонент 1</p>
      <button className="btn" onClick={conditionChangeHandler}>
        condition change to '123'
      </button>
    </>
  )
}
const Component2 = ({ conditionChange }) => {

  const conditionChangeHandler = () => {
    conditionChange('abcdef')
  }
  
  return(
    <>
      <p>Компонент 2</p>
      <button className="btn" onClick={conditionChangeHandler}>
        condition change to 'abcdef'
      </button>
    </>
  )
}
const Component3 = () => {
  return(
    <><p>Компонент 3</p></>
  )
}
const Component4 = () => {
  return(
    <><p>Компонент 4</p></>
  )
}
const Component5 = () => {
  return(
    <><p>Компонент 5 FJFJFJFJFJF</p></>
  )
}
