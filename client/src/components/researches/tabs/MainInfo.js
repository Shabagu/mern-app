import { VictoryChart, VictoryBar, VictoryLabel } from 'victory'

import style from './MainInfo.module.scss'

export const MainInfo = ({ research, saved, user }) => {

  class Weight {
    constructor(alternative, weight) {
      this.alternative = alternative
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < research.alternatives.length; i++) {
    defaultWeights[i] = new Weight(research.alternatives[i], research.globalWeights[i])
  }
  const sortedGlobalWeights = weightsSorting([...defaultWeights])

  return(
    <div className={style.global_weights_container}>
      <div className={style.left_box}>
        <div className={style.table_box}>
          <table>
            <colgroup>
              <col className={style.first} />
              <col className={style.second} />
            </colgroup>
            <thead>
              <tr>
                <th colSpan={4} className={style.table_name}>
                  Глобальные веса альтернатив
                </th>
              </tr>
              <tr>
                <th className={style.heading}>Ранг</th>
                <th className={style.heading}>Альтернатива</th>
                <th className={style.heading}>Вес (доли)</th>
                <th className={style.heading}>Вес (%)</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(research.alternatives.length)].map((x, i) =>
                <tr key={i}>
                  <td>
                    {i === 0 && <i className={`material-icons ${style.top_alternative}`}>whatshot</i>}
                    {i + 1}
                  </td>
                  <td title={sortedGlobalWeights[i].alternative}>
                    <div>
                      {sortedGlobalWeights[i].alternative}
                    </div>
                  </td>
                  <td>{valAdduction(sortedGlobalWeights[i].weight)}</td>
                  <td>{percentsDisplay(sortedGlobalWeights[i].weight)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={style.info}>
          <table>
            <tbody>
              <tr>
                <th>Дата:</th>
                <td>{saved.date}</td>
              </tr>
              <tr>
                <th>Время:</th>
                <td>{saved.time}</td>
              </tr>
              <tr>
                <th>Автор:</th>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.chart_box}>
        <GlobalWeightsChart weights={sortedGlobalWeights} />
      </div>
    </div>
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
          height={460}
          width={520}
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
