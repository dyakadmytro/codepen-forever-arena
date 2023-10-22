import React, {useRef, useState} from "react";
import config from "../config/config.json"

const MenuPage = ({ toRoute }: { toRoute: any }) => {
    const [player, setPlayer] = useState(null);
    const [enemy, setEnemy] = useState(null);

    const backgroundCircleRefs = useRef([]);
    const thumbsRefs = useRef([]);

    // function handleSelectPlayer(id: number) {
    //     const player = fighters.find((f) => f.id === id);
    //     //@ts-ignore
    //     setPlayer(player);
    // }
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


        // thumbsRefs.current[index].style.animation = toggle? "rot .1s linear" : '';
        // .transform = toggle? 'rotate3d(1, 2, 3, 10deg)' : '';
        //@ts-ignore
        backgroundCircleRefs.current[index].style.animation = toggle? "mymove 1s infinite linear" : '';

    }

    function handlePlayClick() {
        toRoute('battle');
    }

    return (
        <div className="MenuPage">
            <div className="menu-header"><h1>Select your fighter</h1></div>
            <div className="menu-container">
                <div className="left-menu-container">
                    <div className="stats-container">
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
                                <span className="attribute">1000</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">80</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">50</span>
                            </div>
                            <div className="stat-item">
                                <span className="attribute">110</span>
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
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button type="button" onClick={handlePlayClick} className="play-button">play</button>
        </div>
    );
};


export default MenuPage;