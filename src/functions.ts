type DifficultMapperItem = [number, number, string]

const DIFFICULT_MAPPER_SETTINGS: DifficultMapperItem[] = [
    [0,30, 'easy'],
    [31,50, 'medium'],
    [51,70, 'hard'],
    [71,90, 'expert'],
    [91,1000, 'nightmare'],
]

function difficultMapper(value: number, data: DifficultMapperItem[]): string {
    const difficult = data.filter(el => el[0] <= value && el[1] >= value)
    return difficult[0][2];
}

export {DIFFICULT_MAPPER_SETTINGS, difficultMapper}