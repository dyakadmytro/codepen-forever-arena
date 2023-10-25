import React, { useState, useEffect, useRef } from 'react';
import * as paper from 'paper'


const RADIUS = 90;
const DISPLAY_DURATION = 30000;
const SVG_PATH = '/assets/images/1746206.svg';

const BattlePage = ({ toRoute }: {toRoute: any}) => {
    const canvasRef = useRef(null);
    const [a, setA] = useState(false);
    const [tm, setTM] = useState(false);
    const [skulls, setSkulls] = useState([]);
    const [taps, setTaps] = useState([]);

    function makeRect(img: any) {
        const topLeft1 =  new paper.Point(parseInt(img.props.style.left), parseInt(img.props.style.top));
        const rectSize1 = new paper.Size(RADIUS, RADIUS);
        // console.log(topLeft1, rectSize1)
        return new paper.Rectangle(topLeft1, rectSize1);
    }

    function doElementsIntersect(img1: any, img2: any) {
         return makeRect(img1).intersects(makeRect(img2), 1);
    }

    function generateRandomSkull(id: string|number, xMax:  number, yMax: number) {
        const x = Math.random() * xMax;
        const y = Math.random() * yMax;
        const rt = Math.random() * 360
        return (
            <img
                key={id}
                src={SVG_PATH}
                style={{
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: `rotate(${rt}deg)`
                }}
            />
        );
    }

    function generateRandomSkulls(amount: number) {
        setA(true)
        setTaps([]);
        const newSkulls: any[] = [];
        do {
            const id = Math.random() * 100;
            const img = generateRandomSkull(id, 420, 270)
            newSkulls.push(img)
        } while (newSkulls.every((skull, index) => {
                newSkulls.every((s: any) => {
                    // const skull = newSkulls[newSkulls.length - 1]
                    if (s == skull) return false
                    console.log(doElementsIntersect(s, skull))
                    if(doElementsIntersect(s, skull)) newSkulls.splice(index,1)
                    return true
                });
                return true;
            }) && newSkulls.length < amount )
        //@ts-ignore
        setSkulls(newSkulls);
        //@ts-ignore
        // setTM(setTimeout(result, DISPLAY_DURATION))
    }
    function handleGenerateClick() {
        generateRandomSkulls(5)
    }

    //@ts-ignore
    function handleImageClick(e) {
        if(taps.length >= skulls.length) {
            //@ts-ignore
            clearTimeout(tm)
            result()
        }
        // console.log(e.target)
        if (e.target.id == 'gameCanvas'){
            //@ts-ignore
            setTaps( [...taps, 0]);
            return;
        }

        const rect = e.target.getBoundingClientRect();

        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distance = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));
        const accuracy = 100 - distance;
        //@ts-ignore
        setTaps( [...taps, accuracy]);
    }
    function result() {
        if(!a) return
        // console.log(taps)
        const averageAccuracy = taps.reduce((a, b) => a + b, 0) / skulls.length;
        alert(`Average Accuracy: ${averageAccuracy.toFixed(2)}%`);
        setA(false)
    }
    return (
        <div>
            <div ref={canvasRef}  id="gameCanvas">
                {skulls.map(skull => skull)}
            </div>
            <p className='play-button' onClick={handleGenerateClick}>Generate Skulls</p>
        </div>
    );
};

export default BattlePage;
