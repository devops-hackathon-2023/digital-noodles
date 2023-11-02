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
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal,
    DropdownMenuSub, DropdownMenuSubContent,
    DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {AreaChart, Blocks, Cpu, HeartPulse, MemoryStick, UserPlus} from "lucide-react";

interface DeploymentUnitPageProps {
    deploymentUnitId: string
}

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({ deploymentUnitId }) => {
    const { data: dashboardConfigs, mutate: mutateDashboardConfigs } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)
    // const { data: deploymentUnit } = useSWR<any>('')

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
            <div>
                {/*@ts-ignore*/}
                {/*<DashboardGrid layout={layout} onLayoutChange={(layout) => setLayout(layout.map(layout => ({ layout: layout })))}/>*/}
                {
                    dashboardConfigs && <Tabs defaultValue={dashboardConfigs.length > 0 && dashboardConfigs[0].env} className="w-full">
                        <div className={'flex justify-between'}>
                        <TabsList>
                            {
                                dashboardConfigs.map((layout: any) => <>
                                    <TabsTrigger value={layout.env}>{layout.env}</TabsTrigger>
                                </>)
                            }
                        </TabsList>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant={'secondary'}>Edit</Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <HeartPulse className="mr-2 h-4 w-4"/>
                                            <span>System</span>
                                        </DropdownMenuSubTrigger>

                                        <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <MemoryStick className={"mr-2 h-4 w-4"}/>
                                                RAM usage
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Cpu className={"mr-2 h-4 w-4"}/>
                                                CPU usage
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>

                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <AreaChart className="mr-2 h-4 w-4"/>
                                            <span>Stats</span>
                                        </DropdownMenuSubTrigger>

                                        <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <Blocks className={"mr-2 h-4 w-4"}/>
                                                Average build time
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {
                            dashboardConfigs.map((layout: any) => <>
                                <TabsContent value={layout.env}>
                                    <DashboardGrid dashboardConfigId={layout.id} layout={layout.dashboardCells} onLayoutChange={handleLayoutChange} onCellDelete={() => {}}/>
                                </TabsContent>
                            </>)
                        }
                    </Tabs>
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
