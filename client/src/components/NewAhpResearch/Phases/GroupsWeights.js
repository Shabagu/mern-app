import { useEffect } from "react"
import { HOT_CHANGES_EFFECT_RESET } from "../../../pages/ahp/NewResearchPage"

import style from "./GroupsWeights.module.scss"


export const GroupsWeights = ({
  criteria,
  criteriaWeights,
  alternatives,
  alternativesWeights,
  
  goToPhase,
}) => {

  useEffect(() => { HOT_CHANGES_EFFECT_RESET() }, [])

  return(
    <div className={style.phase_container}>
      <CriteriaWeightsTable
        criteria={criteria}
        criteriaWeights={criteriaWeights}
      />
      <AlternativesWeightsTable
        criteria={criteria}
        alternatives={alternatives}
        alternativesWeights={alternativesWeights}
      />
      <Menu
        goToPhase={goToPhase}
      />
    </div>
  )
}

const CriteriaWeightsTable = ({
  criteria,
  criteriaWeights,
}) => {

  class Weight {
    constructor(criteria, weight) {
      this.criteria = criteria
      this.weight = weight
    }
  }

  let defaultWeights = []
  for (let i = 0; i < criteria.length; i++) {
    defaultWeights[i] = new Weight(criteria[i], criteriaWeights[i])
  }

  const sortedWeights = criteriaSorting([...defaultWeights])



  return(
    <table className={style.criteria_weights_table}>
      <thead>
        <tr>
          <th className={style.heading} colSpan={2}>
            Веса критериев
          </th>
        </tr>
        <tr>
          <th className={style.subheading}>
            Критерий
          </th>
          <th className={style.subheading}>
            Вес
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(sortedWeights.length)].map((x, i) =>
          <tr key={i}>
            <td title={sortedWeights[i].criteria}>
              <div className={style.container}>
                {sortedWeights[i].criteria}
              </div>
            </td>
            {/* <td>{valAdduction(displayingWeights[i].weight)}</td> */}
            {/* <td>{percentsDisplay(displayingWeights[i].weight)}</td> */}
            <td>{sortedWeights[i].weight}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}


const AlternativesWeightsTable = ({
  criteria,
  alternatives,
  alternativesWeights,
}) => {

  return(
    <></>
  )
}







const Menu = ({
  goToPhase,
}) => {

  const goToGlobalWeights = () => {
    goToPhase(6)
  }

  return(
    <div className={style.menu}>
      <div className={style.top}>
      </div>
      <div className={style.bottom}>
        <button className="btn" onClick={goToGlobalWeights} style={{marginBottom: '40px'}}>
          Глобальные веса
        </button>
      </div>
    </div>
  )
}



// Сортировка критериев по значимости
const criteriaSorting = (weights) => {
  weights.sort((a, b) => {
    if (a.weight > b.weight) return -1
    if (a.weight < b.weight) return 1
    return 0
  })
  return weights
}