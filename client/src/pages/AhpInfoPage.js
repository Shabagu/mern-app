import { useHistory } from "react-router-dom"
// import './../style/styleFix.css';
import style from "./StyleAhpInfoPage.module.scss"

export const AhpInfoPage = () => {

  const history = useHistory()

  const pressHandler = async () => {
    history.push('/newquery')
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
      <p>
        Ла ла ла бла бла бла ...
      </p>
      <div className={style.button_container}>
        <div>
          <button onClick={pressHandler} className={`${style.button} btn`}>Найти лучший вариант для отдыха!</button>
        </div>
      </div>
    </div>
  )
}
