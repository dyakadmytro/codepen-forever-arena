import { useEffect } from 'react';

const useGlobalClick = () => {
    useEffect(() => {
        const handleClick = (event: any) => {
           console.log(event.target)
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);
};

export default useGlobalClick;