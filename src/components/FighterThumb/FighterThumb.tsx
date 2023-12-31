import React, {useRef} from "react";
import './FighterThumb.css'
import {Fighter} from "../../core/Figter";
import useSound from "use-sound";

//@ts-ignore
const effectSound = localStorage.getItem('effect-sound')? parseInt(localStorage.getItem('effect-sound')) / 100 : 0.45

const FighterThumb = ({fighter, onFighterSelect}: {fighter: Fighter, onFighterSelect: any}) => {
    const thumbRef = useRef<any>()
    const backgroundCircleRef = useRef<any>()
    const [RatchetWheel, {stop: RatchetWheelStop}] = useSound('/assets/audio/ratchet wheel.mp3' , {volume: effectSound});

    function rotateThumbCircle(toggle: boolean) {
        if(toggle) {
            RatchetWheel()
            thumbRef.current.classList.add("rot");
            backgroundCircleRef.current.style.animation = "mymove 2.5s reverse ease-in-out";
        } else {
            setTimeout(() => {
                RatchetWheelStop()
                if(backgroundCircleRef.current) backgroundCircleRef.current.style.animation = ''
                if(thumbRef.current)thumbRef.current.classList.remove("rot");
            },1000)
        }
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
            <div className="background-circle" ref={backgroundCircleRef} >
                <img src="/assets/images/2773399.png" alt="Background Image"/>
            </div>
            <div className="thumbnail">
                <img ref={thumbRef}
                     className="action-click"
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