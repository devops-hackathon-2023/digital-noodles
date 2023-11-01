import React, {useEffect, useState} from 'react';
import {NextPage, NextPageContext} from "next";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {SizeMe} from "react-sizeme";
import DashboardGrid from "@/components/molecules/DashboardGrid/DashboardGrid";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import {DashboardGridCellConfig} from "@/utils/types";

interface DeploymentUnitPageProps {
    deploymentUnitId: string
}

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({ deploymentUnitId }) => {
    const { data: layouts } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)

    return (
        <>
            <div style={{ backgroundColor: "lightgray" }}>
                {/*@ts-ignore*/}
                {/*<DashboardGrid layout={layout} onLayoutChange={(layout) => setLayout(layout.map(layout => ({ layout: layout })))}/>*/}
                {
                    layouts && layouts.map((layout: any) => <>
                        <div>ENV: {layout.env}</div>
                        <DashboardGrid layout={layout.dashboardCells} onLayoutChange={(layout) => console.log(layout)} onCellDelete={() => {}}/>
                    </>)
                }
            </div>
        </>
    );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
    const { query: { deploymentUnitId } } = ctx;

    return { props: { deploymentUnitId } }
}

export default DeploymentUnitPage;
