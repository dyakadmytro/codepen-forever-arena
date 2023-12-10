import React, {useEffect, useRef, useState} from "react";
import './SettingsPage.css'
import BackboneSlider from "../../components/BackboneSlider/BackboneSlider";

const DEFAULT_SETTINGS = [
    {
        'id' : 'master-sound-range',
        'title': 'Master sound',
        'value': 50
    },{
        'id' : 'music-sound-range',
        'title': 'Music sound',
        'value': 50
    },{
        'id' : 'effect-sound-range',
        'title': 'Effect sound',
        'value': 50
    },{
        'id' : 'difficulty-range',
        'title': 'Difficulty',
        'value': 30
    },
];

type SettingType = {
    id: string,
    title: string,
    value: number
}

const SettingsPage = ({ toRoute }: { toRoute: any }) => {
    const [settings, setSettings] = useState<any>([]);

    useEffect(() => {
        const newSettings = DEFAULT_SETTINGS.map((s:SettingType) => {
            const localItem = localStorage.getItem(s.id);
            if(localItem) {
                s.value = parseInt(localItem)
                return s;
            }
            return s
        })
        setSettings(newSettings)
    }, [])

    useEffect(() => {
        settings.forEach((s: SettingType) => {
            localStorage.setItem(s.id, ''+ s.value)
        })
    }, [settings])

    function handleBackButton() {
        toRoute('main-lobby')
    }

    function rangeChanged(value: number, id: string) {
        const tempSettings = settings.map((s: SettingType) => {
            if(s.id === id) {
                s.value = value
            }
            return s;
        })
        setSettings(tempSettings)
    }

    return (
        <div className="page settings-page">
            <img id="settings-bg-1" src="/assets/images/2029654.svg"/>
            <div className="settings-container">
                <div className="settings-column ">
                    {settings.map((s: SettingType, k: number) =>
                        (<div key={'setting' + k}><div>{s.title}</div><div><BackboneSlider value={s.value} handleRangeChange={rangeChanged} id={s.id}/></div></div> )
                    )}
                </div>
                <div className="settings-description-column"></div>
            </div>
            <div onClick={handleBackButton} className="play-button disable-action-click">Back</div>
        </div>
    )
}

export default SettingsPage