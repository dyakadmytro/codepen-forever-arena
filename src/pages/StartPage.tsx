import React from "react";

const StartPage = ({ toRoute }: { toRoute: any }) => {
    function handleStartClick() {
        toRoute('menu')
    }

    return (
        <div className="StartPage">
            <p className='welcome-text'><h1>!Welcome to battle arena game!</h1></p>
            <div className="start-container">
                <button type="button" className="start-button" onClick={handleStartClick}>Start</button>
            </div>
        </div>
    );
};

export default StartPage;