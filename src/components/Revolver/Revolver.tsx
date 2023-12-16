import './Revolver.css'
import {useEffect, useState} from "react";

const Revolver = ({bullets, shoots}: {bullets: number, shoots: number}) => {
    const [bulletsJSX, setBulletsJSX] = useState<any[]>([])

    useEffect(() => {
        const newBullets = Array(bullets - shoots).fill('').map((el, key) => createBulletJSX(key))
        setBulletsJSX(newBullets);
    }, [shoots])

    function createBulletJSX(key: number) {
        return (
            <img key={'bullet-key-'+key} className='bullet-item' src="/assets/images/2025077.png"/>
        )
    }

    return (
        <div className='revolver'>
            {
                bulletsJSX.map(b => b)
            }
        </div>
    )
}

export default Revolver