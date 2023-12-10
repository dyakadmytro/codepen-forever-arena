import './BackboneSlider.css'
import {useEffect, useState} from "react";

const SLIDER_WIDTH = 180;

const BackboneSlider = ({value, handleRangeChange, id}: {value: number, handleRangeChange: any, id: string}) => {
    const [thumbPosition, setThumbPosition] = useState(0);

    useEffect(() => {
        setThumbPosition( mapPercentageToX(value, SLIDER_WIDTH))
    }, [])

    const handleMouseDown = (event: any) => {
        const initialX = event.clientX;

        const handleMouseMove = (moveEvent: any) => {
            const deltaX = moveEvent.clientX - initialX;
            const newPosition = Math.min(SLIDER_WIDTH, Math.max(0, thumbPosition + deltaX));
            setThumbPosition(newPosition);
            handleRangeChange(mapXToPercentage(newPosition, SLIDER_WIDTH), id)
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const mapXToPercentage = (xPosition: number, sliderWidth: number) => {
        const clampedX = Math.min(sliderWidth, Math.max(0, xPosition));
        const percentage = (clampedX / sliderWidth) * 100;
        return Math.round(percentage);
    };

    const mapPercentageToX = (percentage: number, sliderWidth: number) => {
        const clampedPercentage = Math.min(100, Math.max(0, percentage));
        const xPosition = (clampedPercentage / 100) * sliderWidth;
        return xPosition;
    };

    return (
        <div className='backbone-slider-container'>
            <img className='backbone-slider' src='/assets/images/1971478.svg'/>
            <img className='backbone-slider-thumb' src="/assets/images/1531576.svg" style={{ transform: `translateX(${thumbPosition}px)` }}
                 onMouseDown={handleMouseDown}/>
        </div>
    );
}

export default BackboneSlider;