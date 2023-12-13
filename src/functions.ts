import config from "./config/config.json";


type DifficultMapperItem = [number, number, string]

//@ts-ignore
const DIFFICULT_MAPPER_SETTINGS: DifficultMapperItem[] = config.difficultMapSettings


function difficultMapper(value: number, data: DifficultMapperItem[]): string {
    const difficult = data.filter(el => el[0] <= value && el[1] >= value)
    return difficult[0][2];
}

export {DIFFICULT_MAPPER_SETTINGS, difficultMapper}