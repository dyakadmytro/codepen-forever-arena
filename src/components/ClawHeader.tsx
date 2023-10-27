import {useEffect} from "react";


const ClawHeader = () =>  {

    useEffect(() => {
        const canvas = document.getElementById("claw-header");
        //@ts-ignore
        const ctx = canvas.getContext("2d");

        //@ts-ignore
        canvas.width = window.innerWidth;
        //@ts-ignore
        canvas.height = 30;

        // Define wave parameters
        const waveFrequency = 2.22;  // Adjust to control the number of waves
        const waveAmplitude = 20;    // Adjust to control the wave height
        const waveSpeed = 2.1;       // Adjust to control the wave speed
        const headerHeight = 30;    // Height of the header
        const numWaves = 16;
        const waveData: any = [];

        // Create random wave parameters
        for (let i = 0; i < numWaves; i++) {
            const frequency = Math.random() * 0.35 + 0.01; // Random frequency
            const amplitude = Math.random() *  7; // Random amplitude
            const phase = 50 // Random phase
            waveData.push({ frequency, amplitude, phase });
        }

        function resizeCanvas() {
            //@ts-ignore
            canvas.width = window.innerWidth;
            //@ts-ignore
            canvas.height = 30;
            //@ts-ignore
            drawHeader(ctx, canvas, waveData, waveAmplitude, waveFrequency, waveSpeed, headerHeight);
        }

        //@ts-ignore
        window.addEventListener("resize", resizeCanvas, [ctx, canvas, waveData, waveAmplitude, waveFrequency, waveSpeed, headerHeight]);
        drawHeader(ctx, canvas, waveData, waveAmplitude, waveFrequency, waveSpeed, headerHeight);
    }, [])

    //@ts-ignore
    function drawHeader(ctx, canvas, waveData, waveAmplitude, waveFrequency, waveSpeed, headerHeight) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the header as a solid rectangle
        ctx.fillStyle = "#d5cfc3";
        ctx.fillRect(0, 0, canvas.width, headerHeight);

        // Draw the waves at the bottom
        for (let x = 0; x < canvas.width; x++) {
            let y = headerHeight;
            //@ts-ignore
            waveData.forEach(({ frequency, amplitude, phase }) => {
                y += amplitude * Math.sin(frequency * x + phase);
            });
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, 1, canvas.height - y);
        }
    }

    //@ts-ignore


    return (<canvas id="claw-header"></canvas>);
}

export default ClawHeader