import React from "react";

const ResultsPage = ({ toRoute }: { toRoute: any }) => {
    function handleStartClick() {
        toRoute('menu')
    }

    return (
        <div>
            Results page
            <button type="button" onClick={handleStartClick} >Restart</button>
        </div>
    );
};

export default ResultsPage;