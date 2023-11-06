import React, {useEffect, useRef, useState} from "react";
import './PlayerHeroBattleContainer.css'
import {Fighter} from "../../core/Figter";


const PlayerHeroBattleContainer = ({hero, childref}: {hero: Fighter, childref: any}) => {
    const heroHealthBar = useRef(null)
    const [hitpoints, setHitpoints] = useState(hero.health)
    const [healthBarLength, setHealthBarLength] = useState(352)

    useEffect(function () {

        setHitpoints(hero.health)
        console.log(hitpoints)
        childref.hit = hit1
    }, [])

    useEffect(function () {
        console.log(heroHealthBar.current, healthBarLength)
        //@ts-ignore
        heroHealthBar.current.width = healthBarLength + 'px'
    }, [healthBarLength])


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

    function mapHitpointsToHealthBar(hitpoints: number, maxHitpoints: number, healthBarLength: number) {
        hitpoints = Math.max(0, Math.min(hitpoints, maxHitpoints));
        return (hitpoints / maxHitpoints) * healthBarLength;
    }

    function hit1(value: number) {
        setHitpoints(hitpoints - value)
        const ttt = mapHitpointsToHealthBar(hitpoints, hero.health, 352)
        setHealthBarLength(ttt)
        console.log(hero.health,ttt, hitpoints, value)
        if (hitpoints <= 0 ) {
            alert('You died')
            return;
        }
    }

    return (
        <div className="player-container">
            <div className="hero-border">
                <img className="hero-border-img" src='/assets/images/37563.svg'/>
                <div className="hero-inner-border">
                    <img id="hero-inner-border-img" src="src/pages/BattlePage/BattlePage"/>
                    <img className="hero-img" src={`/assets/images/${hero.thumb_img_name}`}/>
                </div>
            </div>
            <div className="hero-actions-container">
                <div id="act-1" onClick={handleActionClick}>Hit</div>
                <div id="act-2" onClick={handleActionClick}>Cut</div>
                <div id="act-3" onClick={handleActionClick}>Def</div>
                <div id="act-4" onClick={handleActionClick}>Rar</div>
            </div>
            <div className="health-container">
                <div ref={heroHealthBar} className="hero-health-bar">
                    <img src="/assets/images/1925870.svg"/>
                </div>
            </div>
        </div>
    )
};

export default PlayerHeroBattleContainer