import { useState } from "react"

export const TestPage = () => {

  const [val, setVal] = useState(1)
  const changeHandler = (value) => {
    console.log(value)
    setVal(value)
  }
  
  return(
    <div>
      <div className='range-field'>
        <input
          type='range' id='criteria' name='criteria'
          min={0} max={16}
          value={val}
          // onChange={val => changeHandler(e)}
          onChange={() => changeHandler()}
        />
      </div>
      <input type={"tel"} onChange={(e) => changeHandler(e)}></input>
      <div>
        {val}
      </div>
    </div>
  )
}
