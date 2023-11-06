import {Fighter, FighterType} from "./Figter";

export default class FighterFactory {
    static make(data: FighterType): Fighter {
        return new Fighter(data.id, data.name, data.health, data.power, data.agility, data.defence, data.thumb_img_name)
    }
}