export function swapItemWithId(arr: any[], key: string, value: any, newItem: any) {
    const rv = [ ...arr ];
    const index = rv.findIndex(item => item[key] === value);
    if (index !== -1) {
        rv.splice(index, 1, newItem);
    }
    return rv;
}