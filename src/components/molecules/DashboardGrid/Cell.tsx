import React from 'react';
import useSWR from "swr";
import {fetcher} from "@/utils/lib/fetcher";
import className from "classnames";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import {StatType} from "@/utils/types";
import {Check, Cpu, MemoryStick, Server, ServerCrash, ServerOff, Timer, X} from "lucide-react";
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

interface CellProps {
    id: string,
    w: number,
    h: number,
    statType: StatType
}

function formatISO8601String(isoString: string) {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

const CellHeader : React.FC<{ icon: React.ReactNode, longLabel: string, shortLabel?: string, w: number, h: number }> = ({ icon, longLabel, shortLabel, w, h }) => (
    <>
        <CardTitle className={className({ 'hidden': w > 2, 'flex': w <= 2 }, 'text-sm items-center')}>
            {icon} {shortLabel}
        </CardTitle>

        <CardTitle className={className("text-2xl font-medium items-center", { 'hidden': w <= 2, 'flex': w > 2 })}>
            {icon} {longLabel}
        </CardTitle>
    </>
)

const AvgBuildTimeCell: React.FC<CellProps> = ({ id, w, h }) => {
    const { data } = useSWR(`/api/dashboard-cells/${id}/data`, fetcher);

    return <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CellHeader icon={<Timer className={'w-4 h-4 mr-2'}/>} longLabel={"Avg build time"} shortLabel={"Avg build time"} w={w} h={h}/>
        </CardHeader>
        <CardContent className={'flex-grow flex flex-col justify-center'}>
            { data ? <h2 className={className({ 'text-xl': w === 1, 'text-4xl': w === 2 })}>{ data.avg.toFixed(2) }s</h2> : "Loading"}
        </CardContent>
    </>
}

const CPUUsageCell: React.FC<CellProps> = ({ id, w, h }) => {
    const { data } = useSWR(`/api/dashboard-cells/${id}/data`, fetcher, { refreshInterval: 1000 });

    const minCores = (minCores: number) => {
        return data[0].coreNum >= minCores;
    }

    const coreDisplay = (coreNum: number) => {
        return <div className={"flex flex-col gap-0 items-center"}>
            <div className={"text-3xl text-center h-full flex items-center"}>{`${data[data.length - 1][`core${coreNum}Percent`]}%`}</div>
            <div className={"text-sm"}>Core {coreNum}</div>
        </div>
    }

    return <>{
        data && <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CellHeader icon={<Cpu className={'w-4 h-4 mr-2'}/>} longLabel={"CPU usage"} shortLabel={"CPU"} w={w} h={h}/>
            </CardHeader>
            <CardContent className={"flex-grow"}>
                {
                    data ? <>
                        { w > 2 ?
                            <ResponsiveContainer width={"100%"} height="100%">
                                <LineChart data={data}>
                                    { minCores(1) && <Line type="monotone" dataKey="core1Percent" stroke="#8884d8" fill={"#8884d8"} /> }
                                    { minCores(2) && <Line type="monotone" dataKey="core2Percent" stroke="red" fill={"#8884d8"} /> }
                                    { minCores(3) && <Line type="monotone" dataKey="core3Percent" stroke="green" fill={"#8884d8"} /> }
                                    { minCores(4) && <Line type="monotone" dataKey="core4Percent" stroke="yellow" fill={"#8884d8"} /> }
                                    {/*<CartesianGrid stroke="#ccc" />*/}

                                    <XAxis className={className({ 'hidden': w <= 2 })} dataKey="time" tickFormatter={(time) => formatISO8601String(time)}/>
                                    <YAxis className={className({ 'hidden': w <= 2 })} width={w <= 2 ? 0 : 45} domain={[0, 100]} tickFormatter={(tick) => `${tick}%`}/>
                                </LineChart>
                            </ResponsiveContainer> : <div className={"grid grid-cols-2 grid-rows-2 flex-grow"}>
                                { minCores(1) && coreDisplay(1) }
                                { minCores(2) && coreDisplay(2) }
                                { minCores(3) && coreDisplay(2) }
                                { minCores(4) && coreDisplay(4) }
                        </div> }
                        </>
                     : "Loading"
                }
            </CardContent>
        </>
    }</>
}

const RAMUsageCell: React.FC<CellProps> = ({ id, w, h }) => {
    const { data } = useSWR(`/api/dashboard-cells/${id}/data`, fetcher, { refreshInterval: 1000 });

    function mbToGb(mb: number) {
        // Convert MB to GB
        const gb = mb / 1000;
        return gb;
    }

    return <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={'flex items-center'}>
                <MemoryStick className={"mr-4 h-5 w-5"}/> <span className={className({ "text-sm": w <= 2 })}>RAM Usage</span>
            </CardTitle>
        </CardHeader>
        <CardContent className={"flex-grow"}>
            {
                data ? <>
                    { w > 2 ?
                        <ResponsiveContainer width={"100%"} height="100%">
                            <LineChart data={data}>
                                <Line type="monotone" dataKey="amountInMB" stroke="#8884d8" fill={"#8884d8"} />
                                {/*<CartesianGrid stroke="#ccc" />*/}
                                <XAxis className={className({ 'hidden': w <= 2 })} dataKey="time" tickFormatter={(time) => formatISO8601String(time)}/>
                                <YAxis className={className({ 'hidden': w <= 2 })} width={w <= 2 ? 0 : 45} domain={[0, 20000]} tickFormatter={(tick) => `${mbToGb(tick)} GB`}/>
                            </LineChart>
                        </ResponsiveContainer> : <div className={"text-3xl text-center h-full flex items-center"}>{`${mbToGb(data[data.length - 1].amountInMB)} / 20GB`}</div>}
                </> : "Loading"
            }
        </CardContent>
        </>
}

const HealthCheckCell: React.FC<CellProps> = (props) => {
    const { data } = useSWR(`/api/dashboard-cells/${props.id}/data`, fetcher, { refreshInterval: 10000 })

    return <div className={"flex items-center justify-center flex-grow gap-2"}>
        {
            data ? <>
                    {
                        data.alive ? <Server className={"w-6 h-6"}/> : <ServerOff className={"w-6 h-6"}/>
                    }
                <div className={"text-lg"}>192.168.168.5</div>
                { data.alive ? <div className={"bg-green-600 rounded-full p-1"}><Check className={"w-4 h-4"}/></div> : <div className={"bg-red-600 rounded-full p-1"}><X className={"w-4 h-4"}/></div> }
            </> : "Loading"
        }
    </div>
}

const Cell: React.FC<CellProps> = (props) => {
    return (
        <Card className={className('h-full', 'w-full', 'flex', 'flex-col')}>
            { props.statType === StatType.STATS_AVG_BUILD_TIME && <AvgBuildTimeCell {...props}/> }
            { props.statType === StatType.SYSTEM_RAM_USAGE && <RAMUsageCell {...props}/> }
            { props.statType === StatType.SYSTEM_CPU_USAGE && <CPUUsageCell {...props}/> }
            { props.statType === StatType.HEALTHCHECK && <HealthCheckCell {...props}/> }
        </Card>
    );
};

export default Cell;
