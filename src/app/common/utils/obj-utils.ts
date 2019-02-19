
export function isObjectEmpty(obj) {
    return Object.values(obj || {}).filter(data => data).length === 0;
}

export const redirectTime = 2000;
