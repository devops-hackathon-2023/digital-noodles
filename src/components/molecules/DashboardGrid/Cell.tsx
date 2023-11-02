import React from 'react';
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import className from "classnames";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface CellProps {
    id: string,
    w: number,
    h: number
}

const Cell: React.FC<CellProps> = ({ id }) => {
    const { data } = useSWR(`/api/dashboard-cells/${id}/data`, fetcher);

    return (
        <Card className={className('h-full', 'w-full', 'flex', 'flex-col')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-xl">
                    Avg build time
                </CardTitle>
            </CardHeader>
            <CardContent className={'flex-grow flex flex-col justify-center'}>

                { data ? <h2 className={'text-4xl'}>{ data.avg }s</h2> : "Loading"}
            </CardContent>
        </Card>
    );
};

export default Cell;
