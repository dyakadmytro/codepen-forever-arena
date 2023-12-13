import config from "./config/config.json";


type DifficultMapperItem = [number, number, string]
//@ts-ignore
const DIFFICULT_MAPPER_SETTINGS: DifficultMapperItem[] = config.difficultMapSettings


function difficultMapper(value: number, data: DifficultMapperItem[]): string {
    const difficult = data.filter(el => el[0] <= value && el[1] >= value)
    return difficult[0][2];
}

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function mapHitpointsToPercents(hitpoints: number, maxHitpoints: number, healthBarLength: number): number {
    hitpoints = Math.max(0, Math.min(hitpoints, maxHitpoints));
    return Math.round((healthBarLength * hitpoints) / maxHitpoints);
}

export {DIFFICULT_MAPPER_SETTINGS, difficultMapper, generateUUID, mapHitpointsToPercents}