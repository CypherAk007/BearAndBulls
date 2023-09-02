import React,{useState} from 'react';
import logo from './assets/investment-calculator-logo.png';

import InputForm from './components/InputForm/InputForm';
import ResultTable from './components/ResultTable/ResultTable';
import Header from './components/Header/Header';

function App() {

  const [userInput,setUserInput] = useState(null)

  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    console.log(userInput);
    setUserInput(userInput)
  };
  const yearlyData = []; // per-year results

  if (userInput){

    let currentSavings = userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = userInput['expected-return'] / 100;
    const duration = userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
    console.log(yearlyData);
  }

  return (
    <div>
      <Header logo={logo}></Header>

      <InputForm onStateUpUserInput={calculateHandler}></InputForm>
      {/* onStateUpUserInput HERE 'ON' DETERMINES THAT WE HAVE FUNCTION PASSED AS A VALUE FOR THIS PROP */}
      {!userInput && <p style={{textAlign:'center'}}>No Investment Calculated Yet...</p>}
      {userInput && <ResultTable data={yearlyData} initialInvestment={userInput['current-savings']}></ResultTable>}
      
    </div>
  );
}

export default App;
