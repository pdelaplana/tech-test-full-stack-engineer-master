export const mapKeyValues = ( keyValues: Record<string, any>): Map<string, any>  => {
    const map = new Map<string, any>();
    Object.entries(keyValues).forEach((obj) => map.set(obj[0], obj[1]));
    return map;
}