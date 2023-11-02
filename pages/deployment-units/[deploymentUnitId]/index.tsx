import React, {useEffect, useRef, useState} from 'react';
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
import {DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {AreaChart, Blocks, Check, Cpu, Hand, HeartPulse, MemoryStick, Pencil, Plus, UserPlus} from "lucide-react";
import useOutsideClick from "@/utils/useOutsideClick";

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
                                                        <div
                                                            className="droppable-element"
                                                            draggable={true}
                                                            unselectable="on"
                                                            // this is a hack for firefox
                                                            // Firefox requires some kind of initialization
                                                            // which we can do by adding this attribute
                                                            // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                                                            onDragStart={e => {
                                                                e.dataTransfer.setData("text/plain", "")
                                                                setDraggedStatType("STATS_AVG_BUILD_TIME")
                                                                setDropdownMenuOpen(false)
                                                            }}
                                                        >
                                                            Average build time
                                                        </div>
                                                        <Hand className={"ml-6 h-4 w-4"}/>
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
