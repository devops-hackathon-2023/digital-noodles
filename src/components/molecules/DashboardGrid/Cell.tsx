import React from 'react';
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import className from "classnames";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {StatType} from "@/utils/types";
import {Timer} from "lucide-react";

interface CellProps {
    id: string,
    w: number,
    h: number,
    statType: StatType
}

const AvgBuildTimeCell: React.FC<CellProps> = ({ id, w, h }) => {
    const { data } = useSWR(`/api/dashboard-cells/${id}/data`, fetcher);

    return <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={className("text-sm font-medium items-center", { 'hidden': w === 1, 'flex': w === 2, 'text-xl': w === 2 })}>
                <Timer className={'w-4 h-4 mr-2'}/> Avg build time
            </CardTitle>
            <CardTitle className={className({ 'hidden': w === 2, 'flex': w === 1 }, 'text-sm items-center')}>
                <Timer className={'w-4 h-4 mr-2'}/>Avg
            </CardTitle>
        </CardHeader>
        <CardContent className={'flex-grow flex flex-col justify-center'}>
            { data ? <h2 className={className({ 'text-xl': w === 1, 'text-4xl': w === 2 })}>{ data.avg }s</h2> : "Loading"}
        </CardContent>
    </>
}

const Cell: React.FC<CellProps> = (props) => {
    return (
        <Card className={className('h-full', 'w-full', 'flex', 'flex-col')}>
            { props.statType === StatType.STATS_AVG_BUILD_TIME && <AvgBuildTimeCell {...props}/> }
        </Card>
    );
};

export default Cell;
