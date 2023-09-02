import React,{useState} from "react";
import classes from './InputForm.module.css'

// CODE REUSEABILITY FOR INIT USER INPUT
// WE WRITE OUTSIDE THE InputForm as this need not run when useState changes
const initUserInput = {
  'current-savings':10000, //Default Value
  'yearly-contribution':1200,
  'expected-return':12,
  duration:5, //no Quotes ~ " duration " as its single word and no " - "    

}


const InputForm = (props)=>{
  // INSTEAD OF SEPRATE STATES WE USE STATE OBJECT 
  // const [currentSavings,setCurrentSavings] = useState('')
  // const[ yearlyContribution,setYearlyContribution] = useState(0)
  // const [expectedReturn,setExpectedReturn] = useState(0)
  // const [duration,setDuration]= useState(0)

  // const [userInput,setUserInput] = useState({
  //   'current-savings':10000, //Default Value
  //   'yearly-contribution':1200,
  //   'expected-return':12,
  //   duration:5, //no Quotes ~ " duration " as its single word and no " - "    

  // })

  // CODE REUSEABILITY OF ABOVE
  const [userInput,setUserInput] = useState(initUserInput)

  const submitHandler = (event)=>{
    event.preventDefault()
    props.onStateUpUserInput(userInput)
  }

  const resetHandler = ()=>{
    console.log("reset!!!");
    setUserInput(initUserInput)
  }

  // INSTEAD OF WRITING SEPRATE HANDLERS FOR EACH INPUT WE WRITE GENERIC HANDLER
  // const currentSavingsHandler = (event)=>{
  //   // console.log(parseInt(event.target.value));
  //   setCurrentSavings(parseInt(event.target.value))
  //   console.log(currentSavings)
  // }

  const inputChangeHandler = (input,value)=>{
    console.log(input,value)
    setUserInput((prevInput)=>{
      return {
        ...prevInput,
        // [] - > this js dynamic way to access the input(here its id) param and set its value
        [input]:+value
      }
    })
  }

  return(
    <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes["input-group"]}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input value = {userInput['current-savings']} type="number" id="current-savings" onChange={(event)=>{inputChangeHandler("current-savings",event.target.value)}} />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input value = {userInput['yearly-contribution']} type="number" id="yearly-contribution" onChange={(event)=>{inputChangeHandler("yearly-contribution",event.target.value)}}  />
          </p>
        </div>
        <div className={classes["input-group"]}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input value = {userInput['expected-return']} type="number" id="expected-return" onChange={(event)=>{inputChangeHandler("expected-return" ,event.target.value)}}  />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input value = {userInput['duration']} type="number" id="duration" onChange={(event)=>{inputChangeHandler("duration",event.target.value)}} />
          </p>
        </div>
        <p className={classes.actions}>
          <button onClick={resetHandler} type="reset" className={classes.buttonAlt}>
            Reset
          </button>
          <button type="submit" className={classes.button}>
            Calculate
          </button>
        </p>
      </form>
  )
}

export default InputForm;