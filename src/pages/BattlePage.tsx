import React, { useState, useEffect, useRef } from 'react';
import * as paper from 'paper'

/*TODO
*   selectors names
*   class or id selector
*   how to calculate interface positions by screen
*   how to proper animate
* */
const RADIUS = 90;
const DISPLAY_DURATION = 3000;
const SVG_PATH = '/assets/images/1746206.svg';

const BattlePage = ({ toRoute }: {toRoute: any}) => {
    const canvasRef = useRef(null);
    const timerRef = useRef(null);
    const [accuracy, setAccuracy] = useState(0);
    const [playing, setPlaying] = useState(0);
    const [tm, setTM] = useState(false);
    const [skulls, setSkulls] = useState([]);
    const [taps, setTaps] = useState([]);
    const tapsRef = useRef(taps);

    useEffect(() => {
        //@ts-ignore
        if(playing) setTM(setTimeout(result, DISPLAY_DURATION))
    }, [playing]);

    useEffect(() => {
        tapsRef.current = taps;
        if(taps.length >= skulls.length) {
            //@ts-ignore
            clearTimeout(tm)
            result()
        }
    }, [taps]);


    function handleActionClick(e: any) {
        Array.from(e.target.parentElement.children).map((el: any) => {
            console.log(el)
            el.classList.remove('flip')
            el.classList.remove('active1')
        })
        e.target.classList.add('flip')
        e.target.addEventListener('animationend', (element: any) => {
            element.target.classList.add('active1')
        })

    }

    function makeRect(img: any) {
        const topLeft1 =  new paper.Point(parseInt(img.props.style.left), parseInt(img.props.style.top));
        const rectSize1 = new paper.Size(RADIUS, RADIUS);
        return new paper.Rectangle(topLeft1, rectSize1);
    }

    function doElementsIntersect(img1: any, img2: any) {
         return makeRect(img1).intersects(makeRect(img2), 1);
    }

    function generateRandomSkull(index: string, xMax:  number, yMax: number) {
        const x = Math.random() * xMax;
        const y = Math.random() * yMax;
        const rt = Math.random() * 360
        const ms = Math.random() * 500
        return (
            <img
                key={index}
                id={index}
                src={SVG_PATH}
                style={{
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: `rotate(${rt}deg)`,
                    animation: `fadeIn ${ms}ms ease-in`
                }}
            />
        );
    }

    function generateRandomSkulls(amount: number) {
        if(playing) return
        const newSkulls: any[] = [];
        do {
            const id = Math.random() * 100;
            const img = generateRandomSkull(id + '', 420, 270)
            newSkulls.push(img)
        } while (newSkulls.every((skull, index) => {
                newSkulls.every((s: any) => {
                    if (s == skull) return false
                    if(doElementsIntersect(s, skull)) newSkulls.splice(index,1)
                    return true
                });
                return true;
            }) && newSkulls.length < amount )

        setPlaying(1)
        setTaps([]);
        //@ts-ignore
        setSkulls(newSkulls);

        //@ts-ignore
        timerRef.current.style.display = 'block'
        //@ts-ignore
        timerRef.current.style.animation = `${DISPLAY_DURATION}ms spin linear`
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = `${DISPLAY_DURATION}ms spinBack backwards`
    }

    function handleGenerateClick() {
        generateRandomSkulls(5)
    }

    //@ts-ignore
    function handleImageClick(e) {
        if(!playing) return
        if (e.target.id == 'gameCanvas'){
            //@ts-ignore
            setTaps( [...taps, 0]);
            return;
        }

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const center = new paper.Point(rect.width / 2, rect.height / 2)
        const click = new paper.Point(x, y)
        const distance = center.getDistance(click);
        const accuracy = 100 - distance;
        //@ts-ignore
        setTaps( [...taps, accuracy]);

        e.target.style.animation = '';
        e.target.classList.add('cracked-skull')
        e.target.addEventListener('animationend', function() {
            e.target.style.pointerEvents = 'none';
            e.target.style.opacity = 0;
        });
    }

    function result() {
        if(!playing) return;
        setPlaying(0);

        //@ts-ignore
        timerRef.current.style.animation = '';
        //@ts-ignore
        timerRef.current.addEventListener('animationend', function() {
            //@ts-ignore
            timerRef.current.style.display = 'none';
        });
        //@ts-ignore
        timerRef.current.style.animation = 'fadeOut 1s ease-in';
        //@ts-ignore
        document.getElementById('bg-skeleton-9').style.animation = ''
        const averageAccuracy = tapsRef.current.reduce((a, b) => a + b, 0) / skulls.length; // Use tapsRef.current here
        //@ts-ignore
        setAccuracy(averageAccuracy.toFixed(2));
    }


    return (
        <div className='page'>
            <img id="bg-skeleton-7" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-8" src="/assets/images/1296856.png"/>
            <img id="bg-skeleton-10" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-11" src="/assets/images/1297962.png"/>
            <img id="bg-skeleton-12" src="/assets/images/148050.svg"/>
            <div className='timer'>
                <img id="bg-skeleton-9" src="/assets/images/1320762.png"/>
                <img ref={timerRef} id="clock" src='/assets/images/1007698.png'/>
            </div>
            <div className="canvas-container">
                <div id="rolling-skull">
                    <img  src="/assets/images/1531576.svg"/>
                </div>
                <div ref={canvasRef} id="gameCanvas" onClick={handleImageClick}>
                    {skulls.map(skull => skull)}
                </div>
            </div>
            <div id="accuracy-interface">
                <img src='/assets/images/2029570.png'/>
                <p>{accuracy}</p>
            </div>
            <div className="player-container">
                <div className="hero-border">
                    <img id="hero-border-img" src='/assets/images/37563.svg'/>
                    <div className="hero-inner-border">
                        <img id="hero-inner-border-img" src=""/>
                        <img id="player-hero-img" src="/assets/images/1299482.png"/>
                    </div>
                </div>
                <div className="hero-actions-container">
                    <div id="act-1" onClick={handleActionClick}>Hit</div>
                    <div id="act-2" onClick={handleActionClick}>Cut</div>
                    <div id="act-3" onClick={handleActionClick}>Def</div>
                    <div id="act-4" onClick={handleActionClick}>Rar</div>
                </div>
                <div id="health-container">
                    <div id="hero-health-bar">
                        <img src="/assets/images/1925870.svg"/>
                    </div>
                </div>
            </div>

            <p className='play-button' onClick={handleGenerateClick}>Generate Skulls</p>
        </div>
    );
};

export default BattlePage;
