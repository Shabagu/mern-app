import { useEffect, useContext} from "react"
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'

import style from './AlternativeCard.module.scss'


export const AlternativeCard = ({
  alternative,
  closePopup,
  alternativesRefetch,
  setMenuContent,
  alternativeI,
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
      // closePopup()
      alternativesRefetch()
      setMenuContent(alternativeI)
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
        <div>
          <div className={style.description}>
            <b>Описание:</b>
            <p>
            Горнолыжный курорт Дизин расположен недалеко от Шемшака на высоте 2650 м. Он был построен в 1969 году. Сейчас это самый популярный и самый высокий горнолыжный курорт страны и самый большой горнолыжный курорт Ближнего Востока. Площадь катания - 469 га. Перепад высот в пределах курорта составляет 965 м. Дизин больше подойдёт для подготовленных горнолыжников и экстремалов. На курорте оборудовано 12 трасс и 8 подъёмников. Глубина снега здесь может достигать 3 м, однако склоны обрабатываются не очень хорошо и поэтому их поверхность бугристая. Отдых в Дизине достаточно дешёвый по сравнению с альтернативными горнолыжными курортами, скипасс на один день стоит около пятиста рублей, а прокат оборудования - максимум две тысячи рублей. Туристам предлагаются прокат современного оборудования, горнолыжная школа, два отеля, 19 коттеджей и 5 ресторанов. В летнее время здесь можно кататься на лыжах по траве.
            </p>
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
