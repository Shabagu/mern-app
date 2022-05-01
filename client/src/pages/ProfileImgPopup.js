
import style from './ProfileImgPopup.module.scss'

export const ProfileImgPopup = ({ active, setActive }) => {
  return(
    <div
      className={ active ? `${style.popup} ${style.active}` : style.popup }
      onClick={() => setActive(false)}
    >
      <div
        className={ active ? `${style.popup_content} ${style.active}` : style.popup_content }
        onClick={e => e.stopPropagation()}
      >
        <p className="center">Изображение не загружено</p>
      </div>
    </div>
  )
}
