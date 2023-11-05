export type FighterType = {
    id: number
    name: string
    class: string
    health: number
    power: number
    agility: number
    defence: number
    thumb_img_name: string
    posing_img_name: string
}

export class Fighter {
    id: number
    name: string
    health: number
    power: number
    agility: number
    defence: number

    constructor(id: number, name: string, health: number, power: number, agility: number, defence: number, ) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.power = power;
        this.agility = agility;
        this.defence = defence;
    }
}