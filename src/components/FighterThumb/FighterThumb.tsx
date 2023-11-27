import React, {useRef} from "react";
import './FighterThumb.css'
import {Fighter} from "../../core/Figter";


const FighterThumb = ({fighter, onFighterSelect}: {fighter: Fighter, onFighterSelect: any}) => {
    const thumbRef = useRef<any>()
    const backgroundCircleRef = useRef<any>()

    function rotateThumbCircle(toggle: boolean) {
        if(toggle) {
            thumbRef.current.classList.add("rot");
        } else {
            thumbRef.current.classList.remove("rot");
        }
        backgroundCircleRef.current.style.animation = toggle? "mymove 2s reverse ease-in-out" : '';
    }

    function handleSelectFighter() {
        thumbRef.current.style.animation = 'shortBounce .5s ease-in-out'
        thumbRef.current.addEventListener('animationend', function() {
            thumbRef.current.style.animation = ''
        });
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