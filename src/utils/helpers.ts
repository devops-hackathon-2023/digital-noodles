import {QualityGateResponse} from "@/utils/types";

export function swapItemWithId(arr: any[], key: string, value: any, newItem: any) {
    const rv = [ ...arr ];
    const index = rv.findIndex(item => item[key] === value);
    if (index !== -1) {
        rv.splice(index, 1, newItem);
    }
    return rv;
}


export const calculateRatingsCount = (qualityGates: QualityGateResponse[]) => {
    return qualityGates.reduce((result, item) => {
        const rating = item.rating || 'null';
        // @ts-ignore
        result[rating] = (result[rating] || 0) + 1;
        return result;
    }, {});
};

export const calculateResultsCount = (qualityGates: QualityGateResponse[]) => {
    return qualityGates.reduce((resultC, item) => {
        const result = item.result || 'null';
        // @ts-ignore
        resultC[result] = (resultC[result] || 0) + 1;
        return resultC;
    }, {});
};
