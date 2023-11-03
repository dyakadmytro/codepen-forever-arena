import React from "react";
import './PlayerHeroBattleContainer.css'


const PlayerHeroBattleContainer = () => {
    function handleActionClick(e: any) {
        Array.from(e.target.parentElement.children).map((el: any) => {
            console.log(el)
            el.classList.remove('flip')
            el.classList.remove('active1')
        })
        e.target.classList.add('flip')
        e.target.addEventListener('animationend', (element: any) => {
            element.target.classList.add('active1')
        })

    }

    return (
        <div className="player-container">
            <div className="hero-border">
                <img id="hero-border-img" src='/assets/images/37563.svg'/>
                <div className="hero-inner-border">
                    <img id="hero-inner-border-img" src="src/pages/BattlePage/BattlePage"/>
                    <img id="player-hero-img" src="/assets/images/1299482.png"/>
                </div>
            </div>
            <div className="hero-actions-container">
                <div id="act-1" onClick={handleActionClick}>Hit</div>
                <div id="act-2" onClick={handleActionClick}>Cut</div>
                <div id="act-3" onClick={handleActionClick}>Def</div>
                <div id="act-4" onClick={handleActionClick}>Rar</div>
            </div>
            <div id="health-container">
                <div id="hero-health-bar">
                    <img src="/assets/images/1925870.svg"/>
                </div>
            </div>
        </div>
    )
};

export default PlayerHeroBattleContainer