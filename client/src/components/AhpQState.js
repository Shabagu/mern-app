import style from "./AhpQState.module.scss"


export const AhpQState = ({ phase, criteria, alternatives, criteriaMTX, criteriaSum }) => {

  return(
    <div className={style.panel}>

      <div style={{textAlign: 'center'}}>=Стейты=</div>

      <div className={style.state}>Этап: {phase}</div>
      <div className={style.state}>Критерии: {criteria.join(', ')}</div>
      <div className={style.state}>Альтернативы: {alternatives.join(', ')}</div>
      <div className={style.state}>
        <details>
          <summary>Оценки критериев</summary>
          <table>
            <tbody>
              {[...Array(criteria.length)].map((x, i) =>
                <tr key={i}>
                  {[...Array(criteria.length)].map((x, j) =>
                    <td key={j}>
                      {criteriaMTX[i][j]}
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </details>
      </div>
      <div className={style.state}>
        <details>
          <summary>Суммы критериев</summary>
          <table>
            <tbody>
              <tr>
                {[...Array(criteria.length)].map((x, i) =>
                  <td key={i}>
                    {criteriaSum[i]}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </details>
      </div>
    </div>


    
  )
}
