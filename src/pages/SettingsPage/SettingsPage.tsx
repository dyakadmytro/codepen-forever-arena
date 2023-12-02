import React, {useRef} from "react";
import './SettingsPage.css'


const SettingsPage = ({ toRoute }: { toRoute: any }) => {


    function handleBackButton() {
        toRoute('main-lobby')
    }

    return (
        <div className="page settings-page">
            <img id="settings-bg-1" src="/assets/images/2029654.svg"/>
            <div className="settings-container">
                <div className="settings-column ">
                    <div>Master sound</div><div><input className="slider" type="range" min="1" max="100"/></div>
                    <div>Music sound</div><div><input className="slider" type="range" min="1" max="100"/></div>
                    <div>Effect sound</div><div><input className="slider" type="range" min="1" max="100"/></div>
                    <div>Difficulty medium</div><div><input className="slider" type="range" value="2" min="1" max="5" step="1" /></div>
                </div>
                <div className="settings-description-column"></div>
            </div>
            <div onClick={handleBackButton} className="play-button disable-action-click">Back</div>
        </div>
    )
}

export default SettingsPage