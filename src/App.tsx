import React, {useState} from 'react';
import './App.css';
import StartPage from "./pages/StartPage/StartPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import BattlePage from "./pages/BattlePage/BattlePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import {Fighter} from "./core/Figter";


export type battlePageData = {
  player: Fighter
  enemy: Fighter
}
function App() {
  const [step, setStep] = useState('start');
  const [data, setData] = useState<any>({});

  const toRoute = (step = 'start', data = {}) => {
    setStep(step);
    setData(data);
  };

  return (
    <div className="App">
        {step === 'start' && (<StartPage toRoute={toRoute} key='StartPage'/>)}
        {step === 'menu' && (<MenuPage toRoute={toRoute} key='MenuPage'/>)}
        {step === 'battle' && (<BattlePage toRoute={toRoute} player={data.player} enemy={data.enemy} key='BattlePage'/>)}
        {step === 'results' && (<ResultsPage toRoute={toRoute} fighter={data.fighter} key='ResultsPage'/>)}
    </div>
  );
}

export default App;
