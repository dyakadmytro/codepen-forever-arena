import React, {useState} from 'react';
import './App.css';
import StartPage from "./pages/StartPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import BattlePage from "./pages/BattlePage/BattlePage";
import ResultsPage from "./pages/ResultsPage";
import {Fighter} from "./core/Figter";



export type battlePageData = {
  player: Fighter
  enemy: Fighter
}
function App() {
  const [step, setStep] = useState('start');
  const [data, setData] = useState({});

  const toRoute = (step = 'start', data = {}) => {
    setStep(step);
    setData(data);
  };

  return (
    <div className="App">
        {step === 'start' && (<StartPage toRoute={toRoute} />)}
        {step === 'menu' && (<MenuPage toRoute={toRoute} />)}
      {/*@ts-ignore*/}
        {step === 'battle' && (<BattlePage toRoute={toRoute} player={data.player} enemy={data.enemy}/>)}
        {step === 'results' && (<ResultsPage toRoute={toRoute} />)}
    </div>
  );
}

export default App;
