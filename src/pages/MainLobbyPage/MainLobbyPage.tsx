import React, {useEffect, useState} from 'react'
import './MainLobbyPage.css'


const MainLobbyPage = ({ toRoute }: { toRoute: any }) => {


    useEffect(() => {
        startRain()
    }, [])

    function createRaindrop() {
        const x = Math.random() * window.innerWidth;
        const speed = Math.random() * 2 + 1;

        const raindrop = document.createElement('img');
        raindrop.src = '/assets/images/skull-drop1.svg';
        raindrop.className = 'raindrop';
        raindrop.style.left = x + 'px';
        raindrop.style.top = '-40px';
        raindrop.style.animation = `fall linear infinite ${speed}s`;
        raindrop.addEventListener('animationend', function(e) {
            console.log(e)
        });

        document.body.appendChild(raindrop);
    }

    function startRain() {
        setInterval(() => {
            createRaindrop();
        }, 2000);
    }

    return (
        <div className="page">
            <h1 className='welcome-text'><span>Cracked Bones</span></h1>
            <div className="menu-list">
                <ul>
                    <li>Start single player game</li>
                    <li>Settings</li>
                    <li>Lore</li>
                    <li>Credits</li>
                </ul>
            </div>
        </div>
    )
}

export default MainLobbyPage