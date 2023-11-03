import React, {useRef, useState} from 'react';
import {NextPage, NextPageContext} from "next";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import DashboardGrid from "@/components/molecules/DashboardGrid/DashboardGrid";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import {StatType} from "@/utils/types";
import axios from "axios";
import {swapItemWithId} from "@/utils/helpers";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {AreaChart, Blocks, Check, Cpu, HeartPulse, MemoryStick, Pencil, Plus} from "lucide-react";
import useOutsideClick from "@/utils/useOutsideClick";
import DraggableStat from "@/components/molecules/DraggableStat/DraggableStat";

interface DeploymentUnitPageProps {
    deploymentUnitId: string
}

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({deploymentUnitId}) => {
    const {
        data: dashboardConfigs,
        mutate: mutateDashboardConfigs
    } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)
    const [draggedStatType, setDraggedStatType] = useState<string | undefined>(undefined)
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
    const [editing, setEditing] = useState(false)

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, () => setDropdownMenuOpen(false));

    const handleLayoutChange = (dashboardConfigId: string, layout: any[]) => {
        axios.put(`/api/dashboard-configs/${dashboardConfigId}`, {dashboardCellConfigs: layout}, {withCredentials: true})
            .then((response) => response.data)
            .then((data) => {
                return mutateDashboardConfigs((layouts: any) => {
                    const newLayouts = swapItemWithId(layouts, 'id', data.id, data);
                    return newLayouts
                })
            });
    }

    const handleDraggableDragStart = (statType: StatType) => {
        setDraggedStatType(statType)
        setDropdownMenuOpen(false)
    }

    return (
        <>
            <div>
                {/*@ts-ignore*/}
                {/*<DashboardGrid layout={layout} onLayoutChange={(layout) => setLayout(layout.map(layout => ({ layout: layout })))}/>*/}
                {
                    dashboardConfigs &&
                    <Tabs defaultValue={dashboardConfigs.length > 0 && dashboardConfigs[0].env} className="w-full">
                        <div className={'flex justify-between'}>
                            <TabsList>
                                {
                                    dashboardConfigs.map((layout: any) => <>
                                        <TabsTrigger value={layout.env}>{layout.env}</TabsTrigger>
                                    </>)
                                }
                            </TabsList>

                            {!editing && <Button variant={'secondary'} onClick={() => setEditing(true)}>
                                <Pencil className={"w-4 h-4 mr-2"}/> Edit
                            </Button>}
                            {editing && <div className={"flex gap-2"}>
                                <Button variant={'secondary'} onClick={() => setEditing(false)}>
                                    <Check className={"w-4 h-4 mr-2"}/> Done
                                </Button>
                                <DropdownMenu open={dropdownMenuOpen}>
                                    <DropdownMenuTrigger>
                                        <Button variant={'secondary'} onClick={() => setDropdownMenuOpen(true)}><Plus
                                            className={"w-4 h-4 mr-2"}/> Add</Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent ref={wrapperRef}>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>
                                                <HeartPulse className="mr-2 h-4 w-4"/>
                                                <span>System</span>
                                            </DropdownMenuSubTrigger>

                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem>

                                                        <DraggableStat icon={<MemoryStick className={"mr-2 h-4 w-4"}/>}
                                                                       statType={StatType.SYSTEM_RAM_USAGE}
                                                                       label={"RAM usage"}
                                                                       onDragStart={handleDraggableDragStart}/>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <DraggableStat icon={<Cpu className={"mr-2 h-4 w-4"}/>}
                                                                       statType={StatType.SYSTEM_CPU_USAGE}
                                                                       label={"CPU Usage"}
                                                                       onDragStart={handleDraggableDragStart}/>
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
                                                        <DraggableStat icon={<Blocks className={"mr-2 h-4 w-4"}/>}
                                                                       statType={StatType.STATS_AVG_BUILD_TIME}
                                                                       label={"Average build time"}
                                                                       onDragStart={handleDraggableDragStart}/>
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            }
                        </div>

                        {
                            dashboardConfigs.map((layout: any) => <>
                                <TabsContent value={layout.env}>
                                    <DashboardGrid editing={editing} dashboardConfigId={layout.id}
                                                   draggedStatType={draggedStatType} layout={layout.dashboardCells}
                                                   onLayoutChange={handleLayoutChange} onCellDelete={() => {
                                    }}/>
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
    const {query: {deploymentUnitId}} = ctx;

    return {props: {deploymentUnitId}}
}

export default DeploymentUnitPage;
