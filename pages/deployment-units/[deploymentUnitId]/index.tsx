import React, {useEffect, useRef, useState} from 'react';
import {NextPage, NextPageContext} from "next";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import DashboardGrid from "@/components/molecules/DashboardGrid/DashboardGrid";
import useSWR from "swr";
import {DeploymentUnitVersionResponse, StatType} from "@/utils/types";
import axios from "axios";
import {swapItemWithId} from "@/utils/helpers";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/atoms/tabs";
import {Button} from "@/components/atoms/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu';
import {
    AreaChart,
    Blocks,
    Boxes,
    Check,
    Cpu, GitBranch,
    GitCommitHorizontal,
    HeartPulse,
    MemoryStick,
    Pencil,
    Plus, Rocket
} from "lucide-react";
import useOutsideClick from "@/utils/useOutsideClick";
import DraggableStat from "@/components/molecules/DraggableStat/DraggableStat";
import {fetcher, flyIoFetcher} from "@/utils/lib/fetcher";
import PlatformLayout from "@/components/layouts/platformLayout";

interface DeploymentUnitPageProps {
    deploymentUnitId: string
}

const VersionInfo: React.FC<{ icon: React.ReactNode, text?: string }> = ({icon, text}) => (
    <div className={"flex gap-2 px-3 py-1 rounded-md bg-neutral-100 text-black text-sm items-center"}>
        {icon}
        {text}
    </div>
)

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({deploymentUnitId}) => {
    const {
        data: dashboardConfigs,
        mutate: mutateDashboardConfigs
    } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)
    const {data: deploymentUnit} = useSWR<any>(`https://dopo.fly.dev/api/v1/dopo/deployment-units/${deploymentUnitId}`, flyIoFetcher)
    const {data: deploymentUnitVersions} = useSWR<any>(`https://dopo.fly.dev/api/v1/dopo/deployment-units/${deploymentUnitId}/deployment-unit-versions`, flyIoFetcher)
    const [lastDeploymentUnitVersion, setLastDeploymentUnitVersion] = useState<DeploymentUnitVersionResponse | undefined>(undefined)
    const [draggedStatType, setDraggedStatType] = useState<string | undefined>(undefined)
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
    const [editing, setEditing] = useState(false)

    console.log(deploymentUnitVersions)

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

    useEffect(() => {
        if (deploymentUnitVersions?.page.length > 0) {
            setLastDeploymentUnitVersion(deploymentUnitVersions.page[0])
        }
    }, [deploymentUnitVersions])

    return (
        <PlatformLayout>
            <>
                <div className={"flex gap-4 items-center"}>
                    <Boxes className={"w-8 h-8"}/> <h2 className={"text-4xl font-bold"}>{deploymentUnit?.name}</h2>
                </div>
                <div className={"flex gap-2 my-4"}>
                    <VersionInfo icon={<GitBranch className={"w-4 h-4"}/>} text={lastDeploymentUnitVersion?.gitBranch}/>
                    <VersionInfo icon={<GitCommitHorizontal className={"w-4 h-4"}/>} text={`#${lastDeploymentUnitVersion?.gitCommitHash.slice(0, 7)}`}/>
                    <VersionInfo icon={<Rocket className={"w-4 h-4"}/>} text={lastDeploymentUnitVersion?.version}/>
                </div>
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
                                            <Button variant={'secondary'}
                                                    onClick={() => setDropdownMenuOpen(true)}><Plus
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

                                                            <DraggableStat
                                                                icon={<MemoryStick className={"mr-2 h-4 w-4"}/>}
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
        </PlatformLayout>
    );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
    const {query: {deploymentUnitId}} = ctx;

    return {props: {deploymentUnitId}}
}

export default DeploymentUnitPage;
