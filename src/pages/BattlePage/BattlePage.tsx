import React, { useState, useEffect, useRef } from 'react';
import * as paper from 'paper'
import './BattlePage..css'
import PlayerHeroBattleContainer from "../../components/PlayerHeroBattleContainer/PlayerHeroBattleContainer";
import EnemyHeroBattleContainer from "../../components/EnemyHeroBattleContainer/EnemyHeroBattleContainer";
import {Fighter} from "../../core/Figter";
import GameLog from "../../components/GameLog/GameLog";
import MoleSkull from "../../components/MoleSkull/MoleSkull";
import {Layer, Stage} from "react-konva";
import '../../components/Chronus/Chronos.css'
import useSound from "use-sound";


/*TODO
*   selectors names
*   class or id selector
*   how to calculate interface positions by screen
*   how to proper animate
* */


const RADIUS = 80;
const DISPLAY_DURATION = 8500;

enum GameStatus {
    GAME_START = 'game_start',
    PREP_START = 'prep_start',
    TURN_START = 'turn_start',
    TURN_END = 'turn_end',
    GAME_END = 'game_end'
}
type ScullData = {
    id: string,
    key: string,
    x: number,
    y: number,
    rt: number,
    dr: number
}

//@ts-ignore
const effectSound = localStorage.getItem('effect-sound')? parseInt(localStorage.getItem('effect-sound')) / 100 : 0.45

const BattlePage = ({ toRoute, player, enemy }: {toRoute: any, player: Fighter, enemy: Fighter}) => {
    const [SkullScreamerSound] = useSound('/assets/audio/screamingskull1.mp3', {volume: effectSound});
    const [SkullScreamerSound2] = useSound('/assets/audio/screamingskull2.mp3', {volume: effectSound});
    const [PulsingCircleSound, { stop: PulsingCircleSoundStop }] = useSound('/assets/audio/pulsingcircle.mp3', {volume: 0.1, loop: true});
    const [SkullTapSound] = useSound('/assets/audio/screamingskull1.mp3', {volume: effectSound});
    const [AppearSkullsSound] = useSound('/assets/audio/appeal skulls.mp3' , {volume: effectSound});
    const [RollingSkullSound, { stop: RollingSkullSoundStop }] = useSound('/assets/audio/rolling skull.mp3' , {loop: true, volume: effectSound});
    const [PlayerDamageSound] = useSound('/assets/audio/playerdamage.mp3' , {volume: effectSound});
    const [EnemyDamageSound] = useSound('/assets/audio/enemydamage.mp3', {volume: effectSound} );
    const [EnemyDieSound] = useSound('/assets/audio/enemydie.mp3', {volume: effectSound} );
    const [WinSound] = useSound('/assets/audio/win.mp3',{volume: effectSound});
    const [TimerSound, {stop: TimerSoundStop}] = useSound('/assets/audio/timer.mp3', {loop: true, volume: effectSound});
    const [LoseSound] = useSound('/assets/audio/loser.mp3', {volume: effectSound});
    const readyCircleRef = useRef<any>(null);
    const timerRef = useRef<any>(null);
    const rollingSkullRef = useRef<any>(null);
    const [accuracy, setAccuracy] = useState(0);
    const [log, setLog] = useState<any[]>([]);
    const [playerHealthPercent, setPlayerHealthPercent] = useState(100);
    const [enemyHealthPercent, setEnemyHealthPercent] = useState(100);
    const [playerDamage, setPlayerDamage] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [winner, setWinner] = useState<Fighter|null>(null);
    const [popupMessage, setPopupMessage] = useState(0);
    const [enemyDamage, setEnemyDamage] = useState(0);
    const [gameStatus, setGameStatus] = useState<string>(GameStatus.GAME_START);
    const [tm, setTM] = useState(false);
    const [tmRolling, setTMRolling] = useState(false);
    const [skulls, setSkulls] = useState([]);
    const [taps, setTaps] = useState<any[]>([]);
    const [readyCircleBeeping, setReadyCircleBeeping] = useState(false)

    useEffect(() => {
        setTimeout(() => setReadyCircleBeeping(true), 1000)
    }, []);

    useEffect(() => {
        if(readyCircleBeeping) {
            setLog([...log, (<span>Lets BATTLE begin!</span>)])
            readyCircleRef.current.style.animation = '2s beeping ease-out infinite'
            PulsingCircleSound()
        }
    }, [readyCircleBeeping])

    useEffect(() => {
        //@ts-ignore
        if(gameStatus == GameStatus.TURN_START) setTM(setTimeout(turnEnd, DISPLAY_DURATION))
        if(gameStatus == GameStatus.TURN_END) {
            result()
            TimerSoundStop()
        }
    }, [gameStatus]);

    useEffect(() => {
        // console.log(taps)
        // console.log(gameStatus)
        if(taps.length >= skulls.length && gameStatus == GameStatus.TURN_START) {
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

    useEffect(() => {
        if (playerDamage >= player.health){
            setLog([...log, (<span>*** <strong>{enemy.name}</strong> WINs *** <br/> <span>you defeated</span> </span>)])
            setTimeout(() => {
                LoseSound()
                firePopUp((<div><p>! You defeated !</p> <p>LOOSER</p></div>))
            }, 2000)
            setWinner(enemy)
        } else if (enemyDamage >= enemy.health) {
            EnemyDieSound()
            setLog([...log, (<span>*** <strong>{player.name}</strong> WINs *** <br/> <span>Congratulations!!</span> </span>)])
            setTimeout(() => {
                WinSound()
                firePopUp((<div><p>! You win !</p> <p>congretulations</p></div>))
            }, 2000)
            setWinner(player)
        }
    }, [playerDamage, enemyDamage]);

    function firePopUp(message: any) {
        setPopupMessage(message);
        setShowPopup(true);
    }

    function closePopUp() {
        toRoute('results', {fighter: winner})
    }

    function rollingSkull() {
        return new Promise(resolve => {
            RollingSkullSound()
            rollingSkullRef.current.classList.add('rolling-skull')
            rollingSkullRef.current.style.display = 'block'
            rollingSkullRef.current.addEventListener('animationend', function() {
                rollingSkullStop()
                RollingSkullSoundStop()
            });
            setTimeout(() => {
                //@ts-ignore
                resolve();
            }, 2000);
        });
    }

    function rollingSkullStop() {
        rollingSkullRef.current.style.display = 'none';
        rollingSkullRef.current.classList.remove('rolling-skull');
    }

    function doElementsIntersect(scull1: ScullData, scull2: ScullData) {
        return makeRect(scull1).intersects(makeRect(scull2), 1);
    }

    function makeRect(scull: ScullData) {
        const topLeft1 =  new paper.Point(scull.x - 35, scull.y - 35);
        const rectSize1 = new paper.Size(RADIUS, RADIUS);
        return new paper.Rectangle(topLeft1, rectSize1);
    }

    function generateRandomSkull( xMax:  number, yMax: number): ScullData {
        const id = Math.random() * 100
        const x = getRandomBetween(RADIUS, xMax)
        const y = getRandomBetween(RADIUS, yMax)
        const rt = Math.round(Math.random() * 360)
        const ms = Math.random() * 0.9 + 0.1;
        return {
            id: id + '',
            key: id + '',
            x: x,
            y: y,
            rt: rt,
            dr: ms
        }
    }

    function generateSkulls(amount: number): any {
        const newSkulls: any[] = [];
        do {
            const img = generateRandomSkull(420, 270)
            newSkulls.push(img)
        } while (newSkulls.every((skull, index) => {
            newSkulls.every((s: any) => {
                if (s == skull) return false
                if(doElementsIntersect(s, skull)) newSkulls.splice(index,1)
                return true
            });
            return true;
        }) && newSkulls.length < amount )
        return newSkulls;
    }

    function turnStart() {
        if(gameStatus == GameStatus.TURN_START) return
        setTaps([])
        setAccuracy(0)
        setGameStatus(GameStatus.TURN_START)
        setSkulls(generateSkulls(5))
        timerRef.current.style.display = 'block'
        timerRef.current.style.animation = `${DISPLAY_DURATION}ms spin linear`
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = `${DISPLAY_DURATION}ms spinBack backwards`
        TimerSound()
        AppearSkullsSound()
    }

    function turnEnd() {
        // if(gameStatus !== GameStatus.TURN_START) return
        setGameStatus(GameStatus.TURN_END)
    }

    function result() {
        timerRef.current.style.animation = '';
        timerRef.current.addEventListener('animationend', function() {
            timerRef.current.style.display = 'none';
        });
        timerRef.current.style.animation = 'fadeOut 1s ease-in';
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = ''
        const averageAccuracy = Math.round(taps.reduce((a, b) => a + b, 0) / skulls.length);
        setAccuracy(averageAccuracy);
        processHit(averageAccuracy)
    }

    function hitChance(agility: number, accuracy: number) {
        return (accuracy * agility) / 100
    }

    function doHit(aggressor: Fighter, victim: Fighter, aggressorAccuracy: number, victimAccuracy: number) {
        const effectivePower = Math.round(aggressor.power * (1 + aggressorAccuracy / 70));
        const effectiveDefense = victim.defence
        const damage = Math.round(effectivePower - effectiveDefense);
        return Math.max(0, damage);
    }

    function processHit(accuracy: number) {
        const enemyAccuracy = getRandomBetween(50, 90)
        const playerChance = hitChance(player.agility, accuracy)
        const enemyChance = hitChance(enemy.agility, enemyAccuracy)
        let logMassage = null;
        // console.log('Chance', playerChance, enemyChance, enemyAccuracy)
        if (playerChance >= enemyChance) {
            EnemyDamageSound()
            const damage = doHit(player, enemy, accuracy, enemyAccuracy)
            logMassage =( <span>💀 <strong>{player.name}</strong> made <strong>{damage}</strong> dmg, *accuracy <strong>{accuracy}</strong>/ against <strong>{enemyAccuracy}</strong></span> )
            setEnemyDamage(enemyDamage + damage)
        } else {
            PlayerDamageSound()
            const damage = doHit(enemy, player, enemyAccuracy, accuracy)
            logMassage =(<span>💀 <strong>{enemy.name}</strong> made <strong>{damage}</strong> dmg, *accuracy <strong>{enemyAccuracy}</strong>/ against <strong>{accuracy}</strong></span>)
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
        SkullScreamerSound2()
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

    function calculateElementAccuracy(e: any) {
        const rect = e.path.getClientRect();
        const x = e.pointer.x - rect.x;
        const y = e.pointer.y - rect.y;
        const center = new paper.Point(rect.width / 2, rect.height / 2)
        const click = new paper.Point(x, y)
        const distance = center.getDistance(click);
        return 100 - distance
    }

    function pushAccuracy(accuracy: number) {
        setTaps( [...taps, accuracy]);
    }

    function handleFieldClick(e:any) {
        if(gameStatus !== GameStatus.TURN_START) return
        if(e.target?.nodeType == 'Stage') pushAccuracy(0)
        if(!e.target) {
            SkullTapSound()
            pushAccuracy(calculateElementAccuracy(e))
        }

    }

    function handleReadyClick() {
        if(gameStatus !== GameStatus.GAME_START && gameStatus !== GameStatus.TURN_END) return;
        PulsingCircleSoundStop()
        setSkulls([]);
        readyCircleRef.current.style.animation = 'clickBounce .5s ease-out';
        readyCircleRef.current.addEventListener('animationend', function () {
            readyCircleRef.current.style.animation = '';
        })
        setGameStatus(GameStatus.PREP_START)
        rollingSkull().then(() => {
            turnStart()
        })
    }

    return (
        <div className='page BattlePage'>
            <img id="bg-skeleton-7" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-8" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-10" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-11" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-12" src="/assets/images/148050.svg"/>
            <div className='timer' key='timer'>
                <img ref={readyCircleRef} id="bg-skeleton-9" src="/assets/images/1320762.png" onClick={handleReadyClick}/>
                <img ref={timerRef} id="clock" src='/assets/images/1007698.png'/>
            </div>
            <div className="canvas-container">
                <div ref={rollingSkullRef} style={{display: "none"}}>
                    <img src="/assets/images/1531576.svg"/>
                </div>
                <Stage id="gameCanvas" key='BattleField' width={500} height={350} onClick={handleFieldClick}>
                    <Layer className={'disable-action-click'} >
                        {skulls.map((skull:any) => {
                            return <MoleSkull data={{
                                id: skull.id,
                                key: skull.id,
                                x: skull.x,
                                y: skull.y,
                                rt: skull.rt,
                                duration: skull.dr,
                                handleImageClick: handleFieldClick
                            }} />
                        })}
                    </Layer>
                </Stage>
            </div>
            <div id="accuracy-interface" key='accuracy'>
                <img id="accuracy-interface-img" className={'action-click'} onClick={handleAccuracyClick} src='/assets/images/2029570.png'/>
                <p>{accuracy}</p>
            </div>
            <PlayerHeroBattleContainer health={playerHealthPercent} hero={player} />
            <EnemyHeroBattleContainer health={enemyHealthPercent} hero={enemy} />
            <GameLog log={log}/>
            {showPopup && (
                <div className="popup-overlay" onClick={closePopUp}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        {popupMessage}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BattlePage;
