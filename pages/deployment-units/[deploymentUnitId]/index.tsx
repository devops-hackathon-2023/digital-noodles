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
import axios from "axios";
import {swapItemWithId} from "@/utils/helpers";

interface DeploymentUnitPageProps {
    deploymentUnitId: string
}

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({ deploymentUnitId }) => {
    const { data: dashboardConfigs, mutate: mutateDashboardConfigs } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)

    const handleLayoutChange = (dashboardConfigId: string, layout: any[]) => {
        axios.put(`/api/dashboard-configs/${dashboardConfigId}`, { dashboardCellConfigs: layout }, { withCredentials: true })
            .then((response) => response.data)
            .then((data) => {
                return mutateDashboardConfigs((layouts: any) => {
                    const newLayouts = swapItemWithId(layouts, 'id', data.id, data);
                    return newLayouts
                })
            });
    }

    return (
        <>
            <div style={{ backgroundColor: "lightgray" }}>
                {/*@ts-ignore*/}
                {/*<DashboardGrid layout={layout} onLayoutChange={(layout) => setLayout(layout.map(layout => ({ layout: layout })))}/>*/}
                {
                    dashboardConfigs && dashboardConfigs.map((layout: any) => <>
                        <div>ENV: {layout.env}</div>
                        <DashboardGrid dashboardConfigId={layout.id} layout={layout.dashboardCells} onLayoutChange={handleLayoutChange} onCellDelete={() => {}}/>
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
