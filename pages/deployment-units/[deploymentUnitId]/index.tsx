import React, {useEffect, useState} from 'react';
import {NextPage, NextPageContext} from "next";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {SizeMe} from "react-sizeme";
import DashboardGrid from "@/components/molecules/DashboardGrid/DashboardGrid";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

interface DeploymentUnitPageProps {
    deploymentUnitId: string
}

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({ deploymentUnitId }) => {
    const { data: dashboardConfig } = useSWR(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)


    const [layout, setLayout] = useState([
        { cellId: "a", layout: {i: "a", x: 0, y: 0, w: 1, h: 2 }},
        { cellId: "b", layout: {i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }},
        { cellId: "c", layout: {i: "c", x: 4, y: 0, w: 1, h: 2} }
    ])

    useEffect(() => {
        console.log(layout)
    }, [ layout ])

    return (
        <>
            <div style={{ backgroundColor: "lightgray" }}>
                {/*@ts-ignore*/}
                <DashboardGrid layout={layout} onLayoutChange={(layout) => setLayout(layout.map(layout => ({ layout: layout })))}/>
            </div>
        </>
    );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
    const { query: { deploymentUnitId } } = ctx;

    return { props: { deploymentUnitId } }
}

export default DeploymentUnitPage;
