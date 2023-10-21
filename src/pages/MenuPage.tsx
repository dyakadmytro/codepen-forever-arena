import React from "react";

const MenuPage = ({ toRoute }: { toRoute: any }) => {
    function handlePlayClick() {
        toRoute('battle')
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
                    <div className="player-thumb">
                        <img src="/assets/images/30511.png" />
                    </div>
                    <div className="player-thumb">
                        <img src="/assets/images/1296600.svg" />
                    </div>
                    <div className="player-thumb">
                        <img src="/assets/images/1296636.svg" />
                    </div>
                    <div className="player-thumb">
                        <img src="/assets/images/1297214.svg" />
                    </div>
                    <div className="player-thumb">
                        <img src="/assets/images/1297445.png" />
                    </div>
                    <div className="player-thumb">
                        <img src="/assets/images/1299051.svg" />
                    </div>
                </div>
            </div>
            <button type="button" onClick={handlePlayClick} className="play-button">play</button>
        </div>
    );
};


export default MenuPage;