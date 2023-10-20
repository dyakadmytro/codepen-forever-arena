import React from "react";

const MenuPage = ({ toRoute }: { toRoute: any }) => {
    function handlePlayClick() {
        toRoute('battle')
    }

    return (
        <div>
            Menu page
            <button type="button" onClick={handlePlayClick} >play</button>
        </div>
    );
};


export default MenuPage;