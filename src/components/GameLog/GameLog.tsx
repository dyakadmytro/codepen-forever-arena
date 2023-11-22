import React, {useState, useEffect} from "react";
import './GameLog.css'

const GameLog = ({}: {}) => {
    const [log, setLog] = useState([
        'asfasfasfasf asdfasf',
        'fadfasfasf',
        '34rwf4s fg434 dfw4',
        'asfasfasfasf asdfasf',
        'fadfasfasf',
        '34rwf4s fg434 dfw4',
        'asfasfasfasf asdfasf',
        'fadfasfasf',
        '34rwf4s fg434 dfw4'
    ])
    useEffect(() => {
        scrollToBottom();
    }, [log]);

    function scrollToBottom() {
        //@ts-ignore
        const logContainer = document.getElementById('game-log').querySelector('.log-container');
        //@ts-ignore
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    return (
        <div id='game-log'>
            <div className="log-container">
                {log.slice().reverse().map((message, index) => (
                    <p key={index}>
                        <span>{message}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}

export default GameLog