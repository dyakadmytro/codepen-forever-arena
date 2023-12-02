import React from "react";
import './ResultsPage.css'
import FighterThumb from "../../components/FighterThumb/FighterThumb";
import {Fighter} from "../../core/Figter";
import useSound from "use-sound";

const ResultsPage = ({ toRoute, fighter }: { toRoute: any, fighter: Fighter }) => {
    const [RestartSound, {stop: RestartSoundStop}] = useSound('/assets/audio/restart.mp3', {loop: true});

    function handleRestartClick() {
        RestartSoundStop()
        toRoute('lobby-page')
    }

    function fighterSelectStub(fighter: Fighter) {
        return;
    }

    function restartHover(toggle: boolean) {
        if(toggle) RestartSound()
        if(!toggle) RestartSoundStop()
    }

    return (
        <div className="page">
            <img id='bg-skeleton-13' src='/assets/images/1296043.svg'/>
            <img id='bg-skeleton-14' src='/assets/images/1296043.svg'/>
            <div id='skull-column-left'></div>
            <div id='skull-column-right'></div>
            <div id='result-content-container'>
                <FighterThumb fighter={fighter} onFighterSelect={fighterSelectStub} />
                <strong>Congratulations, Warrior of Bones!</strong> In the haunted arena of eternal night, where skeletal champions clash, you have emerged victorious. Amidst the echoing clash of bone and steel, you proved your mettle.
                With every calculated strike and deft maneuver, you outwitted and outlasted your formidable adversary in this macabre dance of death. Your skeletal foe lies defeated, a testament to your undying skill and valor. In the hallowed halls of the undead, your name will be whispered with awe and respect.
                Rise, triumphant hero of the bone-strewn battleground, and bask in your well-earned glory. The arena hails its new champion!
            </div>
            <img id='bg-skeleton-15' src='/assets/images/1300274.svg'/>
            <img id='bg-skeleton-16' src='/assets/images/1294559.svg'/>
            <img id='bg-skeleton-17' src='/assets/images/151263.svg'/>
            <img id='bg-skeleton-18' src='/assets/images/151263.svg'/>
            <div id='play-again-btn' onClick={handleRestartClick} onMouseEnter={() => restartHover(true)}
                 onMouseLeave={() => restartHover( false)}>
                <img src='/assets/images/2027480.svg'/>
            </div>
            {/*<button type="button" onClick={handleRestartClick} >Play again</button>*/}
        </div>
    );
};

export default ResultsPage;