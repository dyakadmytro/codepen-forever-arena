import React from "react";

const MenuPage = ({ toRoute }: { toRoute: any }) => {
    function handleStartClick() {
        toRoute('battle')
    }

    return (
        <div>
            Menu page
            <button type="button" onClick={handleStartClick} >play</button>
        </div>
    );
};


export default MenuPage;