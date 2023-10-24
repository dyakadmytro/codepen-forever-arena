import React, { useState, useEffect, useRef } from 'react';
//@ts-ignore
import rd3 from 'react-d3-library'
import * as d3 from "d3";

const PATH = `m359.26 78.178c-116.96-0.712-232.82 46.912-280.46 161.49-20.557 49.44-0.735 141.27 12.783 176.18 21.192 13.537 26.894 39.817 34.161 57.333 10.052 24.23-19.697 77.513-19.111 98.184 0.75809 26.754 4.7618 41.531 21.5 43.478 16.946 1.9706 34.026 0.17277 37.147-6.5695 2.8677-6.1938 77.668-7.4483 76.445 27.353-8.1925 15.082-4.9637 25.942 10.302 25.882 3.9559-0.0153 4.6672-9.1157 6.0621-19.074 2.1448-15.312 13.1-13.213 13.429-9.2655 0.0872-0.22972 2.5477 10.56 1.5699 20.107-0.51776 5.0546-5.5834 8.8309-4.4001 14.615-2.1514 9.0321 7.7783 6.4226 13.991 10.043 8.3031 4.8385 12.258 10.349 21.835 8.8001 4.3023-0.69587 2.0987-20.502 4.7557-28.143 2.5035-7.1995 10.868-7.4266 11.579 1.5555 0.58175 7.3461-1.6749 12.698-0.19034 16.357 6.5872 16.238 23.693 9.3984 29.085 2.9382 3.0706-3.6793 3.511-33.944 5.3182-36.41 3.3264-4.5402 8.4062 24.108 7.4226 19.179-2.7511-13.786 7.1667 9.0951 7.1667 19.64 0 10.004 38.35 6.3003 30.032-12.576-3.4102-7.7384 8.9523 1.9934 8.5659-0.92143-0.84834-6.3991 0.37114 8.1503 12.286 13.617 23.76 10.901 16.631-19.346 17.797-31.414 1.8398-19.031 19.06-28.241 19.111 2.7472 0.0612 37.024 39.813 15.295 35.475-4.0611-1.5057-6.7192-5.784-14.364-2.7472-20.544 8.8113-17.932 32.093-26.934 51.839-29.981 16.584-2.5585 33.959 17.867 49.211 10.869 13.137-6.0275 31.507-11.56 26.699-25.191-22.494-63.775-20.502-84.931-10.818-114.58 13.932-25.46 8.3308-40.978 30.463-53.97 51.43-30.21 33.96-147.93 25.92-176.2-37.75-97.8-171.67-160.68-304.22-161.49h-0.00008zm-134.62 294.79c21.679 0.20946 44.44 3.1591 63.545 14.214 53.187 30.776 50.404 46.159 27.233 72.264-27.984 31.528-72.338 40.49-117.41 27.353-59.11-17.227-52.381-110.72 5.4945-113.35 6.8366-0.31151 13.915-0.54757 21.142-0.47778zm280.1-0.0478c7.4073-0.0699 15.012 0.16626 22.814 0.47776 57.89 2.312 64.485 96.007 5.375 113.23-45.076 13.137-89.31 4.2945-117.29-27.233-23.171-26.105-25.954-41.607 27.233-72.383 19.105-11.055 39.65-13.885 61.872-14.094zm-135.09 99.426c5.8476 0.12918 9.3768-0.31227 12.542 5.2556-0.27519-0.82618 31.158 52.922 33.803 59.842 9.8778 25.839-19.507 19.841-24.606 13.139-6.2031-8.9025-5.8355-19.252-21.739-19.35-15.903-0.0978-14.768 13.607-21.739 19.828-5.0981 6.7024-34.483 12.7-24.606-13.139 2.6453-6.9197 34.078-60.668 33.803-59.842 3.8707-5.2888 6.6941-5.8625 12.542-5.7333z`;

const RADIUS = 50;
const DISPLAY_DURATION = 30000;
const SVG_PATH = '/assets/images/1746206.svg';

const BattlePage = ({ toRoute }: {toRoute: any}) => {
    const canvasRef = useRef(null);
    const [a, setA] = useState(false);
    const [tm, setTM] = useState(false);
    const [skulls, setSkulls] = useState([]);
    const [taps, setTaps] = useState([]);

    function generateRandomSkulls() {
        //@ts-ignore
        const ctx = canvasRef.current.getContext("2d");
        let p2 = new Path2D(PATH);
        ctx.fill(p2)
        // setA(true)
        // setTaps([]);
        // const newSkulls = [];
        // for (let i = 0; i < 5; i++) {
        //     newSkulls.push({
        //         x: Math.random() * 400,
        //         y: Math.random() * 250,
        //         id: i,
        //     });
        // }
        // //@ts-ignore
        // setSkulls(newSkulls);
        // //@ts-ignore
        // setTM(setTimeout(result, DISPLAY_DURATION))
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
        console.log(taps)
        const averageAccuracy = taps.reduce((a, b) => a + b, 0) / skulls.length;
        alert(`Average Accuracy: ${averageAccuracy.toFixed(2)}%`);
        setA(false)
    }
    return (
        <div>
            <div ref={canvasRef}  id="gameCanvas">
                {skulls.map(skull => (
                    <img
                        //@ts-ignore
                        key={skull.id}
                        src="/assets/images/1746206.svg"
                        style={{
                            position: 'absolute',
                            //@ts-ignore
                            top: `${skull.y}px`,
                            //@ts-ignore
                            left: `${skull.x}px`,
                        }}
                    />
                ))}
            </div>
            <p className='play-button' onClick={generateRandomSkulls}>Generate Skulls</p>
        </div>
    );
};

export default BattlePage;
