

import style from "./StateDisplay.module.scss"


export const StateDisplay = ({
    phase,
    phasesDone,
    criteria,
    alternatives,
    criteriaMTX,
    criteriaSum,
    criteriaNormMTX,
    criteriaWeights,
    alternativesMTX,
    alternativesSum,
    alternativesNormMTX,
    alternativesWeights,
    globalWeights,
  }) => {

  return(
    <div className={style.panel}>

      <div style={{textAlign: 'center'}}>=Стейты=</div>

      {phase >= 0 &&
        <>
          <div className={style.state}>Этапов выполнено: {phasesDone}</div>
          <div className={style.state}>Текущий этап: {phase}</div>
        </>

      }

      {phase >= 1 &&
        <>
          <div className={style.state}>Критерии: {criteria.join(', ')}</div>
          <div className={style.state}>Альтернативы: {alternatives.join(', ')}</div>
          <div className={style.state}> {/* Оценки критериев */}
          <details open>
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
          <div className={style.state}> {/* Суммы критериев */}
          <details open>
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
        </>
      }

      {phase >= 2 &&
        <>
          <div className={style.state}> {/* Нормализация критериев */}
            <details open>
              <summary>Нормализация критериев</summary>
              <table>
                <tbody>
                  {[...Array(criteria.length)].map((x, i) =>
                    <tr key={i}>
                      {[...Array(criteria.length)].map((x, j) =>
                        <td key={j}>
                          {criteriaNormMTX[i][j]}
                        </td>
                      )}
                    </tr>
                  )}
                </tbody>
              </table>
            </details>
          </div>
          <div className={style.state}> {/* Весовой столбец критериев */}
          <details open>
            <summary>Весовой столбец критериев</summary>
            <table>
              <tbody>
                <tr>
                  {[...Array(criteria.length)].map((x, i) =>
                    <td key={i}>
                      {criteriaWeights[i]}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </details>
          </div>
        </>
      }









    </div>
  )
}
