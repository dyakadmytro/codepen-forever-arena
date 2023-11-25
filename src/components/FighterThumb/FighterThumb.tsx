import React, {useRef} from "react";
import './FighterThumb.css'
import {Fighter} from "../../core/Figter";


const FighterThumb = ({fighter, onFighterSelect}: {fighter: Fighter, onFighterSelect: any}) => {
    const thumbRef = useRef()
    const backgroundCircleRef = useRef()

    function rotateThumbCircle(toggle: boolean) {
        if(toggle) {
            //@ts-ignore
            thumbRef.current.classList.add("rot");
        } else {
            //@ts-ignore
            thumbRef.current.classList.remove("rot");
        }
        //@ts-ignore
        backgroundCircleRef.current.style.animation = toggle? "mymove 1s infinite linear" : '';
    }

    function handleSelectFighter() {
        return onFighterSelect(fighter)
    }

    return (
        <div className="player-thumb" key={fighter.id}>
            {/*@ts-ignore*/}
            <div className="background-circle" ref={backgroundCircleRef} >
                <img src="/assets/images/2773399.png" alt="Background Image"/>
            </div>
            <div className="thumbnail">
                {/*@ts-ignore*/}
                <img ref={thumbRef}
                     src={'/assets/images/' + fighter.thumb_img_name} alt="Thumbnail"
                     onMouseEnter={() => rotateThumbCircle(true)}
                     onMouseLeave={() => rotateThumbCircle( false)}
                     onClick={() => handleSelectFighter()}
                />
            </div>
        </div>
    );
}

export default FighterThumb;