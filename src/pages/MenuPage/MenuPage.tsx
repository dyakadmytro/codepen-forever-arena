import React, {useRef, useState} from "react";
import FighterThumb from "../../components/FighterThumb/FighterThumb";
import config from "../../config/config.json"
import './MenuPage.css'
import FighterFactory from "../../core/FighterFactory";
import {Fighter} from "../../core/Figter";

const fighters = config.fighters.map((data) => FighterFactory.make(data))

const MenuPage = ({ toRoute }: { toRoute: any }) => {
    const PlayButton = useRef<any>()
    const menuHeaderRef = useRef<any>(null)
    const [player, setPlayer] = useState<Fighter|null>(null);
    const [enemy, setEnemy] = useState<Fighter|null>(null);

    async function randomSelectEnemy() {
        //@ts-ignore
        const availableFighters = fighters.filter(el => el.id != player.id);
        const randomIndex = Math.floor(Math.random() * availableFighters.length);
        return availableFighters[randomIndex];
    }

    function handleFighterSelection(fighter: Fighter) {
        return setPlayer(fighter)
    }

    function handlePlayClick() {
        if(!player) {
            menuHeaderRef.current.style.animation = 'shortBounce .5s ease-in-out'
            menuHeaderRef.current.addEventListener('animationend', function() {
                menuHeaderRef.current.style.animation = ''
            });
            return;
        }

        PlayButton.current.classList.remove('disable-action-click')
        PlayButton.current.classList.add('action-click')

        randomSelectEnemy().then(selectedEnemy => {
            setEnemy(selectedEnemy);
            toRoute('battle', {
                player: player, enemy: selectedEnemy
            });
        });
    }

    return (
        <div id="menu-page" className="page">
            <img id="bg-skeleton-6" src="/assets/images/1296587.png"/>
            <img id="bg-skeleton-1" src="/assets/images/1296578.svg"/>
            <img id="bg-skeleton-3" src="/assets/images/1299482.png"/>
            <img id="bg-skeleton-4" src="/assets/images/41599.png"/>
            <img id="bg-skeleton-5" src="/assets/images/41599.png"/>
            <div ref={menuHeaderRef} className="menu-header"><h1>Select your fighter</h1></div>
            <div className="menu-container">
                <div className="left-menu-container">
                    <div className="stats-container">
                        <div className="fighter-name">{player?.name?? 'dsf'}</div>
                        <div className="stats-column">
                            <div className="stat-item">
                                <span className="attribute">Health:</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">Power:</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">Agility:</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">Defence:</span>
                            </div>
                        </div>
                        <div className="stats-column">
                            <div className="stat-item">
                                <span className="attribute">{player?.health?? '00'}</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">{player?.power?? '00'}</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">{player?.agility?? '00'}</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">{player?.defence?? '00'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-menu-container">
                    {config.fighters.map((fighter, index) => (
                        <FighterThumb fighter={fighter} onFighterSelect={handleFighterSelection} key={'sumb-' + index}/>
                    ))}
                </div>
            </div>
            <div ref={PlayButton} onClick={handlePlayClick} className="play-button disable-action-click">play</div>
        </div>
    );
};


export default MenuPage;