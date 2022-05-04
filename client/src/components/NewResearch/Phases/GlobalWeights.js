import { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { VictoryChart, VictoryBar, VictoryLabel } from "victory"
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from "../../../hooks/message.hook"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./GlobalWeights.module.scss"


export const GlobalWeights = ({
  criteria,
  criteriaMTX,
  criteriaSum,
  criteriaNormMTX,
  criteriaWeights,
  alternatives,
  alternativesMTX,
  alternativesSum,
  alternativesNormMTX,
  alternativesWeights,
  globalWeights,

  goToPhase,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  const researchData = {
    criteria: criteria,
    criteriaRating: criteriaMTX,
    criteriaSum: criteriaSum,
    criteriaNorm: criteriaNormMTX,
    criteriaWeights: criteriaWeights,
    alternatives: alternatives,
    alternativesRating: alternativesMTX,
    alternativesSum: alternativesSum,
    alternativesNorm: alternativesNormMTX,
    alternativesWeights: alternativesWeights,
    globalWeights: globalWeights,
  }

  class Weight {
    constructor(alternative, weight) {
      this.alternative = alternative
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < alternatives.length; i++) {
    defaultWeights[i] = new Weight(alternatives[i], globalWeights[i])
  }
  
  const sortedGlobalWeights = weightsSorting([...defaultWeights])


  return(
    <div className={style.phase_container}>
      <div className={style.tables_container}>
        <GlobalWeightsTable
          displayingWeights={sortedGlobalWeights}
        />
        <GlobalWeightsChart
          weights={sortedGlobalWeights}
        />
      </div>
      <Menu
        researchData={researchData}

        goToPhase={goToPhase}
      />
    </div>
  )
}

const GlobalWeightsTable = ({
  displayingWeights,
}) => {

  return(
    <table className={style.global_weights_table}>
      <colgroup>
        <col className={style.first} />
        <col className={style.second} />
      </colgroup>
      <thead>
        <tr>
          <th className={style.heading} colSpan={4}>
            Глобальные веса альтернатив
          </th>
        </tr>
        <tr>
          <th className={style.subheading}>
            Ранг
          </th>
          <th className={style.subheading}>
            Альтернатива
          </th>
          <th className={style.subheading}>
            Вес (в долях)
          </th>
          <th className={style.subheading}>
            Вес (в %)
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(displayingWeights.length)].map((x, i) =>
          <tr key={i}>
            <td className={style.top_alternative_cell}>
              {i === 0 && <i className="material-icons" id={style.top_alternative}>whatshot</i>}
              {i + 1}
            </td>
            <td title={displayingWeights[i].alternative}>
              <div className={style.container}>
                {displayingWeights[i].alternative}
              </div>
            </td>
            <td>{valAdduction(displayingWeights[i].weight)}</td>
            <td>{percentsDisplay(displayingWeights[i].weight)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const GlobalWeightsChart = ({
  weights,
}) => {

  class CharData {
    constructor(alternative, weight) {
      this.x = alternative
      this.y = weight
    }
  }

  let chartDataSet = []
  let chartLegendSet = []
  for (let i = 0; i < weights.length; i++) {
    let chartIndex = (i + 1).toString()

    chartDataSet[i] = new CharData(chartIndex, weights[i].weight)
    chartLegendSet[i] = weights[i].alternative
  }

  return(
    <div className={style.global_weights_chart}>
      <div>
        <VictoryChart
          height={475}
          width={575}
          domainPadding={{ x: 75, y: [0, 75] }}
        >
          <VictoryBar
            barRatio={0.8}
            style={{
              data: { fill: '#26a69a'},
              labels: { fill: "black" }
            }}
            data={chartDataSet}
            labels={({ datum }) => datum.x}
            labelComponent={<VictoryLabel dy={-10}/>}
          />
        </VictoryChart>
      </div>
      <div className={style.legend}>
        {[...Array(chartLegendSet.length)].map((x, i) =>
          <div className={style.legend_item} key={i}>
            <span>{i + 1} - {chartLegendSet[i]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

const Menu = ({
  researchData,

  goToPhase,
}) => {

  const {request} = useHttp()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()



  const mongoDBsavingHandler = async () => {
    try {
      const data = await request('/api/research/new', 'POST', {researchData}, {
        Authorization: `Bearer ${auth.token}`
      })
      message(data.message)
    } catch (e) {}
    history.push('/researches')
  }

  const goToGroupsWeights = () => {
    goToPhase(5)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToGroupsWeights}>
          Другие веса
          <i className="material-icons right">info_outline</i>
        </button>
        <button className="btn" onClick={mongoDBsavingHandler}>
          Сохранить
          <i className="material-icons right">cloud_upload</i>
        </button>
      </div>
    </div>
  )
}

// Приведение значений 
const valAdduction = (value) => {
  value = value.toFixed(3)
  value = value * 1
  return(value)
}

// Отображние весов в процентах
const percentsDisplay = (value) => {
  value = value * 100
  value = value.toFixed(1)
  value = value * 1
  value = `${value}%`
  return (value)
}

// Сортировка критериев по значимости
const weightsSorting = (weights) => {
  weights.sort((a, b) => {
    if (a.weight > b.weight) return -1
    if (a.weight < b.weight) return 1
    return 0
  })
  return weights
}
