import React, {useEffect, useRef, useState} from "react";
import './PlayerHeroBattleContainer.css'
import {Fighter} from "../../core/Figter";

// USE abstract extending

const PlayerHeroBattleContainer = ({hero, health}: {hero: Fighter, health: number}) => {
    const heroHealthBar = useRef<any>(null)
    const [hitpoints, setHitpoints] = useState(hero.health)

    useEffect(function () {
        setHitpoints(hero.health)
    }, [])

    useEffect(function () {
        const tt = mapHitpointsToPercents(health, 100, 352)
        heroHealthBar.current.style.width = tt + 'px'
        heroHealthBar.current.style.animation = 'healthBounce 1s ease-out';
        heroHealthBar.current.addEventListener('animationend', function () {
            heroHealthBar.current.style.animation = '';
        })
    }, [health])


    function handleActionClick(e: any) {
        Array.from(e.target.parentElement.children).map((el: any) => {
            el.classList.remove('flip')
            el.classList.remove('active1')
        })
        e.target.classList.add('flip')
        e.target.addEventListener('animationend', (element: any) => {
            element.target.classList.add('active1')
        })
    }

    function mapHitpointsToPercents(hitpoints: number, maxHitpoints: number, healthBarLength: number) {
        hitpoints = Math.max(0, Math.min(hitpoints, maxHitpoints));
        return Math.round((healthBarLength * hitpoints) / maxHitpoints);
    }

    return (
        <div className="player-container">
            <div className="hero-border">
                <img className="hero-border-img" src='/assets/images/37563.svg'/>
                <div className="hero-inner-border">
                    <img id="hero-inner-border-img" src="src/pages/BattlePage/BattlePage"/>
                    <img className="hero-img" src={hero? `/assets/images/${hero.thumb_img_name}` : ''}/>
                </div>
            </div>
            {/*<div className="hero-actions-container">*/}
            {/*    <div id="act-1" onClick={handleActionClick}>Hit</div>*/}
            {/*    <div id="act-2" onClick={handleActionClick}>Cut</div>*/}
            {/*    <div id="act-3" onClick={handleActionClick}>Def</div>*/}
            {/*    <div id="act-4" onClick={handleActionClick}>Rar</div>*/}
            {/*</div>*/}
            <div className="health-container" title={health + '%'}>
                <div ref={heroHealthBar} className="hero-health-bar">
                    <img src="/assets/images/1925870.svg"/>
                </div>
                <div className="hero-health-bar">
                    <img style={{opacity: 0.4}} src="/assets/images/1925870.svg"/>
                </div>
            </div>
        </div>
    )
};

export default PlayerHeroBattleContainer