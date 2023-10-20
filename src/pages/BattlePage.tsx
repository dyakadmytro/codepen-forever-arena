import React from "react";

const BattlePage = ({ toRoute }: { toRoute: any }) => {
    function handleFinishClick() {
        toRoute('finish')
    }

    return (
        <div>
            Battle page
            <button type="button" onClick={handleFinishClick} >finish</button>
        </div>
    );
};

export default BattlePage;