export function convertArrayToObject(arr: Array<any>) {
    return arr.reduce((acc: any, val) => {
        const item = val.split("=");
        acc[`${item[0]}`] = item[1];
        return acc;
    }, {});
}
