import React from 'react';
import useSWR from "swr";
import {fetcher} from "@/utils/lib/fetcher";

interface CellProps {
    id: string,
    w: number,
    h: number
}

const Cell: React.FC<CellProps> = ({ id }) => {
    const { data } = useSWR(`/api/dashboard-cells/${id}/data`, fetcher);

    console.log(data);

    return (
        <div>
            { data ? <>Avg build time: { data.avg }</> : "Loading"}
        </div>
    );
};

export default Cell;
