import style from '../../pages/quickStyleFix.module.scss'

export const TableTuning = () => {
  return(
    <div className={style.cell}>
      <div className={style.value_box}><span className="valueOutput">1</span></div>
        <div className={style.cell_tuning}>
        <button onClick={tuningIncreaseHandler}>&#129145;</button>
        <button onClick={tuningDecreaseHandler}>&#129144;</button>
      </div>
    </div>
  )
}
