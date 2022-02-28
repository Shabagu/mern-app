import { AhpCriteriaNormalization } from "../components/ahp/AhpCriteriaNormalization"
import { AhpSidebar } from "../components/ahp/AhpSidebar"
import { indexValueMatrix, valuesModel, criteriaSumArray } from './AhpQCriteriaComparisonPage'




// Заполнение матрицы значений таблицы (по индексам) значением по умолчанию - 1 (индекс: 8)
export let normalizedCriteriaMatrix = [[],[],[],[],[],[],[],[]]
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    normalizedCriteriaMatrix[i][j] = valuesModel[indexValueMatrix[i][j]].number / criteriaSumArray[i]
  }
}


export const AhpQCriteriaNormalizationPage = () => {

  return (
    <div>
      <AhpCriteriaNormalization />
      <AhpSidebar />
    </div>
  )
}
