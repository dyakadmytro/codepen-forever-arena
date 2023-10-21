export default class Fighter {
    name: string
    health: number
    power: number
    agility: number
    defence: number

    constructor(name: string, health: number, power: number, agility: number, defence: number) {
        this.name = name;
        this.health = health;
        this.power = power;
        this.agility = agility;
        this.defence = defence;
    }
}