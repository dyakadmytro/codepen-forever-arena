import React from "react";

const StartPage = ({ toRoute }: { toRoute: any }) => {
    function handleStartClick() {
        toRoute('menu')
    }

    return (
        <div>
            Start page
            <button type="button" onClick={handleStartClick} >start</button>
        </div>
    );
};

export default StartPage;