import React, {useState} from 'react';
import './App.css';
import StartPage from "./pages/StartPage";
import MenuPage from "./pages/MenuPage";
import BattlePage from "./pages/BattlePage";
import ResultsPage from "./pages/ResultsPage";

function App() {

  const [step, setStep] = useState('start');

  const toRoute = (step = 'start') => {
    setStep(step);
  };

  return (
    <div className="App">
        {step === 'start' && (<StartPage toRoute={toRoute} />)}
        {step === 'menu' && (<MenuPage toRoute={toRoute} />)}
        {step === 'battle' && (<BattlePage toRoute={toRoute} />)}
        {step === 'results' && (<ResultsPage toRoute={toRoute} />)}
    </div>
  );
}

export default App;
