import React from "react";
import './EnemyHeroBattleContainer.css'
import {Fighter} from "../../core/Figter";


const EnemyHeroBattleContainer = ({hero}: {hero: Fighter}) => {
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
        <div className="enemy-container">
            <div className="hero-border">
                <img className="hero-border-img" src='/assets/images/37563.svg'/>
                <div className="hero-inner-border">
                    <img id="hero-inner-border-img" src="src/pages/BattlePage/BattlePage"/>
                    <img className="hero-img" src={hero? `/assets/images/${hero.thumb_img_name}` : ''}/>
                </div>
            </div>
            <div className="hero-health-container">
                <div className="enemy-health-bar">
                    <img src="/assets/images/1925870.svg"/>
                </div>
            </div>
        </div>
    )
};

export default EnemyHeroBattleContainer