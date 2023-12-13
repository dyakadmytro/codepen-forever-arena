import React, {useEffect, useState} from 'react'
import './MainLobbyPage.css'


const MainLobbyPage = ({ toRoute }: { toRoute: any }) => {

    // function createRaindrop() {
    //     const x = Math.random() * window.innerWidth;
    //     const speed = Math.random() * 10 + 1;
    //     const rt = Math.round(Math.random() * 360)
    //
    //     const raindrop = document.createElement('img');
    //     raindrop.id = generateUUID()
    //     raindrop.src = '/assets/images/skull-drop1.svg';
    //     raindrop.className = 'raindrop';
    //     raindrop.style.left = x + 'px';
    //     raindrop.style.top = '-40px';
    //     raindrop.style.transform = `rotate(${rt}deg)`
    //     raindrop.style.animation = `fall linear ${speed}s`;
    //     raindrop.addEventListener('animationend', function(e: any) {
    //         e.target.remove()
    //     });
    //
    //     document.body.appendChild(raindrop);
    // }

    return (
        <div className="page lobby-page">
            <img id="lobby-bg-1" src="/assets/images/30352.svg"/>
            <img id="lobby-bg-2" src="/assets/images/2756757.svg"/>
            <h1 className='welcome-text'><span>Cracked Bones</span></h1>
            <div className="menu-list">
                <ul>
                    <li onClick={() => {toRoute('menu')}}>Play vs bot</li>
                    <li onClick={() => {toRoute('settings')}}>Settings</li>
                    <li>Lore</li>
                    <li>Credits</li>
                </ul>
            </div>
        </div>
    )
}

export default MainLobbyPage