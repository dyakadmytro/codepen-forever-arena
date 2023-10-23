import React from "react";

const StartPage = ({ toRoute }: { toRoute: any }) => {
    function handleStartClick() {
        toRoute('menu')
    }

    return (
        <div className="StartPage">
            <img id="bg-skeleton-2" src="/assets/images/2968614.svg"/>
            <p className='welcome-text'><h1>!Welcome to the <span>Cracked Bones</span>!</h1></p>
            <div className="start-container">
                <div className="start-button" onClick={handleStartClick}>Start</div>
            </div>
        </div>
    );
};

export default StartPage;