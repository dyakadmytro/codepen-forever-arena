import { useEffect } from 'react';

const useGlobalClick = () => {
    useEffect(() => {
        // Function to handle click events
        const handleClick = (event: any) => {
           console.log(event.target)
        };

        // Attach the event listener to the window object
        window.addEventListener('click', handleClick);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);
};

export default useGlobalClick;