import React from 'react';
import useSWR from "swr";
import {fetcher} from "@/utils/lib/fetcher";
import className from "classnames";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {StatType} from "@/utils/types";
import {MemoryStick, Timer} from "lucide-react";
import {LineChart, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer} from "recharts";

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

const RAMUsageCell: React.FC<CellProps> = ({ id, w, h }) => {
    const { data } = useSWR(`/api/dashbaord-cells/${id}/data`, fetcher);
    // const data = [
    //     {name: '7:00', usage: 2400}, {name: '7:10', usage: 2500}, {name: '7:20', usage: 2800},
    //     {name: '7:30', usage: 1000}, {name: '7:40', usage: 1100}, {name: '7:50', usage: 800}
    // ];

    return <><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={'flex items-center'}>
            <MemoryStick className={"mr-4 h-5 w-5"}/> RAM Usage
        </CardTitle>
    </CardHeader>
        <CardContent className={"flex-grow"}>
            {
                data ? <ResponsiveContainer width={"100%"} height="100%">
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis width={40}/>
                    </LineChart>
                </ResponsiveContainer> : "Loading"
            }
        </CardContent>
        </>
}

const Cell: React.FC<CellProps> = (props) => {
    return (
        <Card className={className('h-full', 'w-full', 'flex', 'flex-col')}>
            { props.statType === StatType.STATS_AVG_BUILD_TIME && <AvgBuildTimeCell {...props}/> }
            { props.statType === StatType.SYSTEM_RAM_USAGE && <RAMUsageCell {...props}/> }
        </Card>
    );
};

export default Cell;
