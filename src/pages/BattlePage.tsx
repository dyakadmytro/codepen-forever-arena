import React from "react";

const BattlePage = ({ toRoute }: { toRoute: any }) => {
    function handleFinishClick() {
        toRoute('results')
    }

    return (
        <div>
            <div className="BattlePage">
                <div className="battle-header"></div>
                <div className="player-container">
                    <div className="fighter-thumb">
                        <img src="/assets/images/1297482.svg"/>
                    </div>
                </div>
                <div className="enemy-container">
                    <div className="fighter-thumb">
                        <img src="/assets/images/1297457.svg"/>
                    </div>
                </div>
                <div className="battle-log"></div>
            </div>
        </div>
    );
};

export default BattlePage;