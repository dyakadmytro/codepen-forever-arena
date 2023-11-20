import React, { useState, useEffect, useRef } from 'react';
import * as paper from 'paper'
import './BattlePage..css'
import PlayerHeroBattleContainer from "../../components/PlayerHeroBattleContainer/PlayerHeroBattleContainer";
import EnemyHeroBattleContainer from "../../components/EnemyHeroBattleContainer/EnemyHeroBattleContainer";
import {Fighter} from "../../core/Figter";


/*TODO
*   selectors names
*   class or id selector
*   how to calculate interface positions by screen
*   how to proper animate
* */


const RADIUS = 90;
const DISPLAY_DURATION = 3000;
const SVG_PATH = '/assets/images/1746206.svg';

const BattlePage = ({ toRoute, player, enemy }: {toRoute: any, player: Fighter, enemy: Fighter}) => {
    const canvasRef = useRef(null);
    const timerRef = useRef(null);
    const rollingSkullRef = useRef(null);
    const [accuracy, setAccuracy] = useState(0);
    const [playerHealthPercent, setPlayerHealthPercent] = useState(100);
    const [enemyHealthPercent, setEnemyHealthPercent] = useState(100);
    const [playerDamage, setPlayerDamage] = useState(0);
    const [enemyDamage, setEnemyDamage] = useState(0);
    const [playing, setPlaying] = useState(0);
    const [tm, setTM] = useState(false);
    const [tmRolling, setTMRolling] = useState(false);
    const [skulls, setSkulls] = useState([]);
    const [taps, setTaps] = useState([]);
    const tapsRef = useRef(taps);

    useEffect(() => {
        // rollingSkull()
    }, []);

    function rollingSkull() {
        //@ts-ignore
        rollingSkullRef.current.classList.add('rolling-skull')
        //@ts-ignore
        rollingSkullRef.current.style.display = 'block'
        //@ts-ignore
        rollingSkullRef.current.addEventListener('animationend', function() {
           rollingSkullStop()
        });
    }

    function rollingSkullStop() {
        //@ts-ignore
        rollingSkullRef.current.style.display = 'none';
        //@ts-ignore
        rollingSkullRef.current.classList.remove('rolling-skull');
    }

    useEffect(() => {
        //@ts-ignore
        if(playing) setTM(setTimeout(result, DISPLAY_DURATION))
    }, [playing]);

    useEffect(() => {
        tapsRef.current = taps;
        if(taps.length >= skulls.length) {
            //@ts-ignore
            clearTimeout(tm)
            result()
        }
    }, [taps]);

    useEffect(() => {
        const tt = mapHitpointsToPercents(player.health - playerDamage, player.health, 100);
        setPlayerHealthPercent(tt)
    }, [playerDamage]);

    useEffect(() => {
        const tt = mapHitpointsToPercents(enemy.health - enemyDamage, enemy.health, 100);
        setPlayerHealthPercent(tt)
    }, [enemyDamage]);

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

    function makeRect(img: any) {
        const topLeft1 =  new paper.Point(parseInt(img.props.style.left), parseInt(img.props.style.top));
        const rectSize1 = new paper.Size(RADIUS, RADIUS);
        return new paper.Rectangle(topLeft1, rectSize1);
    }

    function doElementsIntersect(img1: any, img2: any) {
         return makeRect(img1).intersects(makeRect(img2), 1);
    }

    function generateRandomSkull(index: string, xMax:  number, yMax: number) {
        const x = Math.random() * xMax;
        const y = Math.random() * yMax;
        const rt = Math.random() * 360
        const ms = Math.random() * 500
        return (
            <img
                key={index}
                id={index}
                src={SVG_PATH}
                style={{
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: `rotate(${rt}deg)`,
                    animation: `fadeIn ${ms}ms ease-in`
                }}
            />
        );
    }

    function generateSkulls(amount: number) {
        console.log('generateRandomSkulls', playing)
        if(playing) return
        const newSkulls: any[] = [];
        do {
            const id = Math.random() * 100;
            const img = generateRandomSkull(id + '', 420, 270)
            newSkulls.push(img)
        } while (newSkulls.every((skull, index) => {
                newSkulls.every((s: any) => {
                    if (s == skull) return false
                    if(doElementsIntersect(s, skull)) newSkulls.splice(index,1)
                    return true
                });
                return true;
            }) && newSkulls.length < amount )

        setPlaying(1)
        setTaps([]);
        //@ts-ignore
        setSkulls(newSkulls);

        //@ts-ignore
        timerRef.current.style.display = 'block'
        //@ts-ignore
        timerRef.current.style.animation = `${DISPLAY_DURATION}ms spin linear`
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = `${DISPLAY_DURATION}ms spinBack backwards`
    }

    function handleGenerateClick() {
        console.log('handleGenerateClick')
        setPlaying(0)
        //@ts-ignore
        if(tmRolling) clearTimeout(tmRolling)
        // rollingSkullStop()
        generateSkulls(5)
    }

    function handleImageClick(e: any) {
        if(!playing) return
        if (e.target.id == 'gameCanvas'){
            //@ts-ignore
            setTaps( [...taps, 0]);
            return;
        }

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const center = new paper.Point(rect.width / 2, rect.height / 2)
        const click = new paper.Point(x, y)
        const distance = center.getDistance(click);
        const accuracy = 100 - distance;
        //@ts-ignore
        setTaps( [...taps, accuracy]);

        e.target.style.animation = '';
        e.target.classList.add('cracked-skull')
        e.target.addEventListener('animationend', function() {
            e.target.style.pointerEvents = 'none';
            e.target.style.opacity = 0;
        });
    }

    function result() {
        console.log('result', playing)
        if(!playing) return;
        setPlaying(0);

        //@ts-ignore
        timerRef.current.style.animation = '';
        //@ts-ignore
        timerRef.current.addEventListener('animationend', function() {
            //@ts-ignore
            timerRef.current.style.display = 'none';
        });
        //@ts-ignore
        timerRef.current.style.animation = 'fadeOut 1s ease-in';
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = ''
        const averageAccuracy = tapsRef.current.reduce((a, b) => a + b, 0) / skulls.length; // Use tapsRef.current here
        //@ts-ignore
        setAccuracy(parseFloat(averageAccuracy.toFixed(2)));
        //@ts-ignore
        setPlayerDamage(playerDamage + processHit())
        if (playerDamage >= player.health){
            alert('Yo DIED!')
        }
        // rollingSkull()
    }

    function processHit() {
        return Math.round((enemy.power + enemy.agility * (100 - accuracy))/ 100 - (player.defence * accuracy)/100)
    }

    function mapHitpointsToPercents(hitpoints: number, maxHitpoints: number, healthBarLength: number) {
        hitpoints = Math.max(0, Math.min(hitpoints, maxHitpoints));
        return Math.round((hitpoints / maxHitpoints) * healthBarLength);
    }

    function handleAccuracyClick(e: any) {
        e.target.style.animation = "accuracyClick .2s ease-out"
        e.target.addEventListener('animationend', function() {
            e.target.style.animation = '';
        });
        const skySkull = document.createElement('img')
        skySkull.src = "/assets/images/2807482.svg"
        skySkull.classList.add('sky-skull-img')
        skySkull.style.animation = 'skySkull 2s linear'
        skySkull.addEventListener('animationend', function() {
            skySkull.style.display = 'none';
        });
        e.target.parentNode.appendChild(skySkull)
    }

    return (
        <div className='page'>
            <img id="bg-skeleton-7" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-8" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-10" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-11" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-12" src="/assets/images/148050.svg"/>
            <div className='timer'>
                <img id="bg-skeleton-9" src="/assets/images/1320762.png"/>
                <img ref={timerRef} id="clock" src='/assets/images/1007698.png'/>
            </div>
            <div className="canvas-container">
                {/*<div ref={rollingSkullRef}>*/}
                {/*    <img src="/assets/images/1531576.svg"/>*/}
                {/*</div>*/}
                <div ref={canvasRef} id="gameCanvas" onClick={handleImageClick}>
                    {skulls.map(skull => skull)}
                </div>
            </div>
            <div id="accuracy-interface" >
                <img id="accuracy-interface-img" onClick={handleAccuracyClick} src='/assets/images/2029570.png'/>
                <p>{accuracy}</p>
            </div>
            {/*@ts-ignore*/}
            <PlayerHeroBattleContainer health={playerHealthPercent} hero={player} />
            <EnemyHeroBattleContainer health={enemyHealthPercent} hero={enemy} />
            <p className='ready-button' onClick={handleGenerateClick}>Ready</p>
        </div>
    );
};

export default BattlePage;
