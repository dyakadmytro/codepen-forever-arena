import React, { useState, useEffect, useRef } from 'react';
import * as paper from 'paper'
import './BattlePage..css'
import PlayerHeroBattleContainer from "../../components/PlayerHeroBattleContainer/PlayerHeroBattleContainer";
import EnemyHeroBattleContainer from "../../components/EnemyHeroBattleContainer/EnemyHeroBattleContainer";
import {Fighter} from "../../core/Figter";
import GameLog from "../../components/GameLog/GameLog";


/*TODO
*   selectors names
*   class or id selector
*   how to calculate interface positions by screen
*   how to proper animate
* */


const RADIUS = 90;
const DISPLAY_DURATION = 3000;
const SVG_PATH = '/assets/images/1746206.svg';

enum GameStatus {
    GAME_START = 'game_start',
    PREP_START = 'prep_start',
    PREP_END = 'prep_start',
    TURN_START = 'turn_start',
    TURN_END = 'turn_end',
    GAME_END = 'game_end'
}

const BattlePage = ({ toRoute, player, enemy }: {toRoute: any, player: Fighter, enemy: Fighter}) => {
    const canvasRef = useRef(null);
    const readyCircleRef = useRef(null);
    const timerRef = useRef(null);
    const rollingSkullRef = useRef(null);
    const [accuracy, setAccuracy] = useState(0);
    const [log, setLog] = useState<any[]>([]);
    const [playerHealthPercent, setPlayerHealthPercent] = useState(100);
    const [enemyHealthPercent, setEnemyHealthPercent] = useState(100);
    const [playerDamage, setPlayerDamage] = useState(0);
    const [enemyDamage, setEnemyDamage] = useState(0);
    const [gameStatus, setGameStatus] = useState(GameStatus.GAME_START);
    const [tm, setTM] = useState(false);
    const [tmRolling, setTMRolling] = useState(false);
    const [skulls, setSkulls] = useState([]);
    const [taps, setTaps] = useState([]);
    const tapsRef = useRef(taps);

    useEffect(() => {
        setLog([...log, (<span>Lets BATTLE begin!</span>)])
        // rollingSkull()
    }, []);

    useEffect(() => {
        if (playerDamage >= player.health){
            setLog([...log, (<p>*** <strong>{enemy.name}</strong> WINs *** <br/> <span>you defeated</span> </p>)])
            alert('You DIED!')
        } else if (enemyDamage >= enemy.health) {
            setLog([...log, (<p>*** <strong>{player.name}</strong> WINs *** <br/> <span>Congratulations!!</span> </p>)])
            alert ('You WIN!')
        }
    }, [playerDamage, enemyDamage]);

    useEffect(() => {
        if (accuracy > 0) processHit()
    }, [accuracy])

    function rollingSkull() {
        return new Promise(resolve => {
            //@ts-ignore
            rollingSkullRef.current.classList.add('rolling-skull')
            //@ts-ignore
            rollingSkullRef.current.style.display = 'block'
            //@ts-ignore
            rollingSkullRef.current.addEventListener('animationend', function() {
                rollingSkullStop()
            });
            setTimeout(() => {
                //@ts-ignore
                resolve();
            }, 2000); // 2000 milliseconds = 2 seconds
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
        if(gameStatus == GameStatus.TURN_START) setTM(setTimeout(turnEnd, DISPLAY_DURATION))
    }, [gameStatus]);

    useEffect(() => {
        tapsRef.current = taps;
        if(taps.length >= skulls.length) {
            //@ts-ignore
            clearTimeout(tm)
            turnEnd()
        }
    }, [taps]);

    useEffect(() => {
        const tt = mapHitpointsToPercents(player.health - playerDamage, player.health, 100);
        setPlayerHealthPercent(tt)
    }, [playerDamage]);

    useEffect(() => {
        const tt = mapHitpointsToPercents(enemy.health - enemyDamage, enemy.health, 100);
        setEnemyHealthPercent(tt)
    }, [enemyDamage]);

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

        setGameStatus(GameStatus.TURN_START)
        setTaps([]);
        //@ts-ignore
        setSkulls(newSkulls);
        return newSkulls;
    }

    function turnStart() {
        if(gameStatus == GameStatus.PREP_END) return

        setGameStatus(GameStatus.TURN_START)

        generateSkulls(5)

        //@ts-ignore
        timerRef.current.style.display = 'block'
        //@ts-ignore
        timerRef.current.style.animation = `${DISPLAY_DURATION}ms spin linear`
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = `${DISPLAY_DURATION}ms spinBack backwards`
    }

    function turnEnd() {
        if(gameStatus !== GameStatus.TURN_START) return
        setGameStatus(GameStatus.TURN_END);
        result()
    }

    function result() {
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
        const averageAccuracy = tapsRef.current.reduce((a, b) => a + b, 0) / skulls.length;
        //@ts-ignore
        setAccuracy(parseFloat(averageAccuracy.toFixed(2)));
        // rollingSkull()
    }

    function hitChance(agility: number, accuracy: number) {
        return ((accuracy * agility) + 10) / Math.random() * 100
    }

    function doHit(aggressor: Fighter, victim: Fighter, aggressorAccuracy: number, victimAccuracy: number) {
        const effectivePower = aggressor.power * (1 + aggressorAccuracy / 100);
        const effectiveDefense = victim.defence

        let damage = Math.round(effectivePower - effectiveDefense);
        return Math.max(0, damage);
    }

    function processHit() {
        const enemyAccuracy = getRandomBetween(50, 90)
        const playerChance = hitChance(player.agility, accuracy)
        const enemyChance = hitChance(enemy.agility, enemyAccuracy)
        let logMassage = null;
        if (playerChance >= enemyChance) {
            const damage = doHit(player, enemy, accuracy, enemyAccuracy)
            logMassage =( <span>💀 <strong>{player.name}</strong> made {damage} dmg, *accuracy <strong>{accuracy}</strong>/ against <strong>{enemyAccuracy}</strong></span> )
            setEnemyDamage(enemyDamage + damage)
        } else {
            const damage = doHit(enemy, player, enemyAccuracy, accuracy)
            logMassage =(<span>💀 <strong>{enemy.name}</strong> made <strong>{damage}</strong>dmg, *accuracy <strong>{enemyAccuracy}</strong>/ against <strong>{accuracy}</strong></span>)
            setPlayerDamage(playerDamage + damage)
        }
        setLog([...log, logMassage])
    }

    function mapHitpointsToPercents(hitpoints: number, maxHitpoints: number, healthBarLength: number) {
        hitpoints = Math.max(0, Math.min(hitpoints, maxHitpoints));
        return Math.round((hitpoints / maxHitpoints) * healthBarLength);
    }

    function getRandomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    function handleImageClick(e: any) {
        if(gameStatus != GameStatus.TURN_START) return
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

    function handleReadyClick() {
        //@ts-ignore
        if(gameStatus !== GameStatus.GAME_START && gameStatus !== GameStatus.TURN_END) return;
        setSkulls([]);

        //@ts-ignore
        readyCircleRef.current.style.animation = 'clickBounce .5s ease-out';
        //@ts-ignore
        readyCircleRef.current.addEventListener('animationend', function () {
            //@ts-ignore
            readyCircleRef.current.style.animation = '';
        })
        setGameStatus(GameStatus.PREP_START)
        rollingSkull().then(() => {
            setGameStatus(GameStatus.PREP_END)
            turnStart()
        })
    }

    return (
        <div className='page'>
            <img id="bg-skeleton-7" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-8" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-10" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-11" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-12" src="/assets/images/148050.svg"/>
            <div className='timer'>
                <img ref={readyCircleRef} id="bg-skeleton-9" src="/assets/images/1320762.png" onClick={handleReadyClick}/>
                <img ref={timerRef} id="clock" src='/assets/images/1007698.png'/>
            </div>
            <div className="canvas-container">
                <div ref={rollingSkullRef} style={{display: "none"}}>
                    <img src="/assets/images/1531576.svg"/>
                </div>
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
            <GameLog log={log}/>
        </div>
    );
};

export default BattlePage;
