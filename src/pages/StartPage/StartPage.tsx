import React, {useEffect, useRef} from "react";

const StartPage = ({ toRoute }: { toRoute: any }) => {

    function handleStartClick() {
        toRoute('main-lobby')
    }

    return (
        <div className="page">
            <img id="bg-skeleton-2" src="/assets/images/2968614.svg"/>
            <h1 className='welcome-text'>!Welcome to the <span>Cracked Bones</span>!</h1>
            <div className="start-container">
                <div className="start-button action-click" onClick={handleStartClick}>Start</div>
            </div>
        </div>
    );
};

export default StartPage;