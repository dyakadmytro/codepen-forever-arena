import React, {useState, useEffect} from "react";
import './GameLog.css'

type Log = string[]

const GameLog = ({log}: {log: any}) => {
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
                {/*@ts-ignore*/}
                {log.map((message, index) => (
                    <p key={index}>
                        <span>{message}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}

export default GameLog