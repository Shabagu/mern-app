// import { Link } from 'react-router-dom'
import { VictoryChart, VictoryBar } from "victory"

import style from './ResearchList.module.scss'


export const ResearchList = ({ researches }) => {

  if (!researches.length) {
    return <p className='center'>Исследований пока нет...</p>
  }

  return(
    <div className={style.research_items}>

      { researches.map((research, index) => {
        return(
          <ResearchItem research={research} index={index} key={research._id} />
        )
      }) }
    </div>
  )
}

const ResearchItem = ({ research, index }) => {

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
  // console.log(sortedGlobalWeights)

  const date = new Date(research.date).toLocaleDateString()
  const time = new Date(research.date).toLocaleTimeString()

  return(
    <div className={style.research_item}>
      <div className={style.box}>
        <table className={style.research_item_table}>
          <thead>
            <tr>
              <th className={style.heading}>Ранг</th>
              <th className={style.heading}>Альт.</th>
              <th className={style.heading}>Вес</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(sortedGlobalWeights.length)].map((x, i) =>
              <tr key={i}>
                <td>
                  {i === 0 && <i className={`material-icons ${style.top_alternative}`}>whatshot</i>}
                  {i + 1}
                </td>
                <td>
                  <div>
                    {sortedGlobalWeights[i].alternative}
                  </div>
                </td>
                <td>{valAdduction(sortedGlobalWeights[i].weight)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={style.box}>
        <WeightChart weights={sortedGlobalWeights} />
      </div>
      <div className={style.box3}>
        <div className={style.time}>
          {`Сохранено ${date} в ${time}`}
        </div>
      </div>
    </div>
  )
}

const WeightChart = ({ weights }) => {
  class CharData {
    constructor(alternative, weight) {
      this.x = alternative
      this.y = weight
    }
  }

  let chartDataSet = []
  for (let i = 0; i < weights.length; i++) {
    chartDataSet[i] = new CharData(weights[i].alternative, weights[i].weight)
  }

  return(
    <div className={style.chart}>
      <div>
        <VictoryChart
          height={320}
          width={250}
          domainPadding={{ x: 20, y: [0, 10] }}
        >
          <VictoryBar
            barRatio={0.8}
            style={{data: {fill: '#26a69a'}}}
            data={chartDataSet}
          />
        </VictoryChart>
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