import React from "react";

const ResultsPage = ({ toRoute }: { toRoute: any }) => {
    function handleRestartClick() {
        toRoute('menu')
    }

    return (
        <div>
            Results page
            <button type="button" onClick={handleRestartClick} >Restart</button>
        </div>
    );
};

export default ResultsPage;