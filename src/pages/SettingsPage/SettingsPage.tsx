import React, {useRef} from "react";
import './SettingsPage.css'
import BackboneSlider from "../../components/BackboneSlider/BackboneSlider";


const SettingsPage = ({ toRoute }: { toRoute: any }) => {


    function handleBackButton() {
        toRoute('main-lobby')
    }

    function rangeChanged(value: number) {
        console.log(value)
    }

    return (
        <div className="page settings-page">
            <img id="settings-bg-1" src="/assets/images/2029654.svg"/>
            <div className="settings-container">
                <div className="settings-column ">
                    <div>Master sound</div><div><BackboneSlider value={50} handleRangeChange={rangeChanged} id='master-sound-range'/></div>
                    <div>Music sound</div><div><BackboneSlider value={50} handleRangeChange={rangeChanged} id='music-sound-range'/></div>
                    <div>Effect sound</div><div><BackboneSlider value={50} handleRangeChange={rangeChanged} id='effect-sound-range'/></div>
                    <div>Difficulty</div><div><BackboneSlider value={50} handleRangeChange={rangeChanged} id='difficulty-range'/></div>
                </div>
                <div className="settings-description-column"></div>
            </div>
            <div onClick={handleBackButton} className="play-button disable-action-click">Back</div>
        </div>
    )
}

export default SettingsPage