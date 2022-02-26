import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import './quickStyleFix.css';

export const AhpPage = () => {

  const { loading } = useHttp()
  const history = useHistory()

  const pressHandler = async () => {
    history.push('/query/selection')
  }

  return (
    <div>
      <h3>Метод анализа иерархий</h3>
      <p>
        Что же такое Метод Анализа Иерархий (МАИ)? МАИ - это ла ла ла...
      </p>
      <p>
        На этой странице вы можете воспользоваться МАИ для поиска наилучшего отдыха индивидуально для вас!
      </p>
      <div className='mybtn-container'>
        <button onClick={pressHandler} disabled={loading} className='btn mybtn'>Найти лучший вариант для отдыха!</button>
      </div>
    </div>
  )
}
