import React, {useRef, useState} from "react";
import config from "../config/config.json"

const MenuPage = ({ toRoute }: { toRoute: any }) => {
    const [player, setPlayer] = useState(null);
    // const [enemy, setEnemy] = useState(null);

    const backgroundCircleRefs = useRef([]);
    const thumbsRefs = useRef([]);

    function handleSelectPlayer(index: number) {
        const player = config.fighters[index];
        //@ts-ignore
        setPlayer(player);
    }
    //
    // function handleSelectEnemy(id: number) {
    //     const enemy = fighters.find((f) => f.id === id);
    //     //@ts-ignore
    //     setEnemy(enemy);
    // }

    function rotateThumbCircle(index: number, toggle: boolean) {
        if(toggle) {
            //@ts-ignore
            thumbsRefs.current[index].classList.add("rot");
        } else {
            //@ts-ignore
            thumbsRefs.current[index].classList.remove("rot");
        }
        //@ts-ignore
        backgroundCircleRefs.current[index].style.animation = toggle? "mymove 1s infinite linear" : '';

    }

    function handlePlayClick() {
        toRoute('battle');
    }

    return (
        <div className="MenuPage">
            <img id="bg-skeleton-6" src="/assets/images/1296587.png"/>
            <img id="bg-skeleton-1" src="/assets/images/1296578.svg"/>
            <img id="bg-skeleton-3" src="/assets/images/1299482.png"/>
            <img id="bg-skeleton-4" src="/assets/images/41599.png"/>
            <img id="bg-skeleton-5" src="/assets/images/41599.png"/>
            <div className="menu-header"><h1>Select your fighter</h1></div>
            <div className="menu-container">
                <div className="left-menu-container">
                    <div className="stats-container">
                        {/*@ts-ignore*/}
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
                                {/*@ts-ignore*/}
                                <span className="attribute">{player?.health?? '00'}</span>
                            </div>
                            <div className="stat-item">
                                {/*@ts-ignore*/}
                                <span className="attribute">{player?.power?? '00'}</span>
                            </div>
                            <div className="stat-item">
                                {/*@ts-ignore*/}
                                <span className="attribute">{player?.agility?? '00'}</span>
                            </div>
                            <div className="stat-item">
                                {/*@ts-ignore*/}
                                <span className="attribute">{player?.defence?? '00'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-menu-container">
                    {config.fighters.map((fighter, index) => (
                        <div className="player-thumb" key={fighter.id}>
                            {/*@ts-ignore*/}
                            <div className="background-circle" ref={(el) => backgroundCircleRefs.current[index] = el} >
                                <img src="/assets/images/2773399.png" alt="Background Image"/>
                            </div>
                            <div className="thumbnail">
                                {/*@ts-ignore*/}
                                <img ref={(el) => thumbsRefs.current[index] = el}
                                     src={'/assets/images/' + fighter.thumb_img_name} alt="Thumbnail"
                                     onMouseEnter={() => rotateThumbCircle(index, true)}
                                     onMouseLeave={() => rotateThumbCircle(index, false)}
                                     onClick={() => handleSelectPlayer(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h3 onClick={handlePlayClick} className="play-button">play</h3>
        </div>
    );
};


export default MenuPage;