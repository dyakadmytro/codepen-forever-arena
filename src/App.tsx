import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import StartPage from "./pages/StartPage/StartPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import BattlePage from "./pages/BattlePage/BattlePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import MainLobbyPage from "./pages/MainLobbyPage/MainLobbyPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import {Fighter} from "./core/Figter";
import useSound from "use-sound";


export type battlePageData = {
  player: Fighter
  enemy: Fighter
}
//@ts-ignore
const bgMusic = localStorage.getItem('music-sound')? parseInt(localStorage.getItem('music-sound')) / 100 : 0.3
//@ts-ignore
const effectSound = localStorage.getItem('effect-sound')? parseInt(localStorage.getItem('effect-sound')) / 100 : 0.45


function App() {
  const [BgMusic, { stop, sound}] = useSound("/assets/audio/music.mp3", {volume: bgMusic, loop: true});
  const [GlobalClickSound] = useSound("/assets/audio/click1.mp3", {volume: effectSound});
  const [ActionClickSound] = useSound("/assets/audio/click2.mp3", {volume: effectSound});
  const [DisableClickSound] = useSound("/assets/audio/click3.mp3", {volume: effectSound});
  const [step, setStep] = useState('start');
  const [data, setData] = useState<any>({});
  const [BgSoundStarted, SetBgSoundStarted] = useState(false)

    window.addEventListener('click', handleFirstClick);
    useEffect(() => {
        if (BgSoundStarted) {
            window.removeEventListener('click', handleFirstClick)
            BgMusic()
            window.addEventListener('click', handleClick);
        }
    }, [BgSoundStarted])

    function handleFirstClick() {
        if(!BgSoundStarted) {
            SetBgSoundStarted(true)
        }
    }

    function handleClick(e: any) {
        if(e.target.classList.contains('action-click')) {
            ActionClickSound()
        } else if(e.target.classList.contains('disable-action-click')) {
            DisableClickSound()
        } else {
            GlobalClickSound()
        }
    }


  const toRoute = (step = 'start', data = {}) => {
    setStep(step);
    setData(data);
  };

  return (
    <div className="App">
        {step === 'start' && (<StartPage toRoute={toRoute} key='StartPage'/>)}
        {step === 'main-lobby' && (<MainLobbyPage toRoute={toRoute} key='MainLobby'/>)}
        {step === 'menu' && (<MenuPage toRoute={toRoute} key='MenuPage'/>)}
        {step === 'settings' && (<SettingsPage toRoute={toRoute} key='SettingsPage'/>)}
        {step === 'battle' && (<BattlePage toRoute={toRoute} player={data.player} enemy={data.enemy} key='BattlePage'/>)}
        {step === 'results' && (<ResultsPage toRoute={toRoute} fighter={data.fighter} key='ResultsPage'/>)}
    </div>
  );
}

export default App;
