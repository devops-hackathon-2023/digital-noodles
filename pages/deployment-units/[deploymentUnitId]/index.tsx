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
  ArrowDown,
  Blocks,
  Boxes,
  Check,
  Cpu,
  GitBranch,
  GitCommitHorizontal, HeartPulse,
  MemoryStick,
  Pencil,
  Plus,
  Rocket
} from "lucide-react";
import useOutsideClick from "@/utils/useOutsideClick";
import DraggableStat from "@/components/molecules/DraggableStat/DraggableStat";
import {fetcher, flyIoFetcher} from "@/utils/lib/fetcher";
import PlatformLayout from "@/components/layouts/platformLayout";
import {isMobile} from "react-device-detect";


import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/atoms/sheet"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/atoms/accordion';
import DeploymentsDataTable from "@/components/organisms/deployment-units/deploymentsDataTable/deploymentsDataTable";
import {columns} from "@/components/organisms/deployment-units/deploymentsDataTable/columns";
import {DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger} from "@/components/atoms/dropdown-menu";
import {DropdownMenuContent, DropdownMenuLabel} from "@radix-ui/react-dropdown-menu";

interface DeploymentUnitPageProps {
  deploymentUnitId: string
}

const VersionInfo: React.FC<{
  icon: React.ReactNode,
  text?: string,
  droppable?: boolean
}> = ({
        icon,
        text,
        droppable
      }) => (
  <div className={"flex gap-2 px-3 py-1 rounded-md bg-neutral-100 text-black text-sm items-center"}>
    {icon}
    {text}
    { droppable && <ArrowDown className={"w-4 h-4"}/> }
  </div>
)

const DeploymentUnitPage: NextPage<DeploymentUnitPageProps> = ({deploymentUnitId}) => {
  const {
    data: dashboardConfigs,
    mutate: mutateDashboardConfigs
  } = useSWR<any>(`/api/dashboard-configs?typeId=${deploymentUnitId}&dashboardType=DEPLOYMENT_UNIT`, fetcher)
  const {data: deploymentUnit} = useSWR<any>(`https://dopo.fly.dev/api/v1/dopo/deployment-units/${deploymentUnitId}`, flyIoFetcher)
  const {data: deploymentUnitVersions} = useSWR<any>(`https://dopo.fly.dev/api/v1/dopo/deployment-units/${deploymentUnitId}/deployment-unit-versions?order=desc&sort=version`, flyIoFetcher)
  const [lastDeploymentUnitVersion, setLastDeploymentUnitVersion] = useState<DeploymentUnitVersionResponse | undefined>(undefined)
  const [draggedStatType, setDraggedStatType] = useState<string | undefined>(undefined)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [selectedEnv, setSelectedEnv] = useState<string | undefined>()
  const [selectedVersion, setSelectedVersion] = useState(undefined)
  const { data: deployments, mutate: mutateDeployments } = useSWR(() => (selectedEnv && selectedVersion) ? `https://dopo.fly.dev/api/v1/dopo/deployments?enviroment=${selectedEnv}&deploymentUnitId=${deploymentUnitId}&versionId=${selectedVersion.id}` : null, flyIoFetcher)

  useEffect(() => {
    if(deploymentUnitVersions && deploymentUnitVersions.page.length > 0)
      setSelectedVersion(deploymentUnitVersions.page[0])
  }, [deploymentUnitVersions]);

  useEffect(() => {
    if(dashboardConfigs && dashboardConfigs.length > 0) {
      setSelectedEnv(dashboardConfigs[0].env)
    }
  }, [dashboardConfigs]);

  useEffect(() => {
    mutateDeployments()
  }, [selectedEnv]);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setDropdownMenuOpen(false));

  const handleLayoutChange = (dashboardConfigId: string, layout: any[]) => {
    axios.put(`/api/dashboard-configs/${dashboardConfigId}`, {dashboardCellConfigs: layout}, {withCredentials: true})
      .then((response) => response.data)
      .then((data) => {
        return mutateDashboardConfigs((layouts: any) => {
          return swapItemWithId(layouts, 'id', data.id, data)
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
      <Sheet modal={false}>
        <div className="relative flex flex-col gap-5">
          <div className={"flex gap-4 items-center w-full justify-between"}>
            <div className={"flex items-center gap-4"}>
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                {deploymentUnit?.name}
              </h1>
              <Boxes className={"w-8 h-8"}/>
            </div>
            <Button>
              Settings
            </Button>
          </div>
          <div className={"flex gap-2 my-4"}>
            <VersionInfo icon={<GitBranch className={"w-4 h-4"}/>} text={selectedVersion?.gitBranch}/>
            <VersionInfo icon={<GitCommitHorizontal className={"w-4 h-4"}/>}
                         text={`#${selectedVersion?.gitCommitHash.slice(0, 7)}`}/>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <VersionInfo icon={<Rocket className={"w-4 h-4"}/>} text={selectedVersion?.version} droppable/>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <div className={"h-40 overflow-scroll"}>
                  {
                    deploymentUnitVersions?.page.map(version => (

                        <DropdownMenuItem onClick={() => setSelectedVersion(version)}>{ version.version }</DropdownMenuItem>
                    ))
                  }
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            {/*@ts-ignore*/}
            {/*<DashboardGrid layout={layout} onLayoutChange={(layout) => setLayout(layout.map(layout => ({ layout: layout })))}/>*/}
            {
              dashboardConfigs && <>{
                lastDeploymentUnitVersion?.id === selectedVersion?.id ?
                  <Tabs defaultValue={dashboardConfigs.length > 0 && dashboardConfigs[0].env} className="w-full">
                    <div className={'flex justify-between w-full'}>
                      <TabsList>
                        {
                          dashboardConfigs.map((layout: any) => <>
                            <TabsTrigger value={layout.env} onClick={() => setSelectedEnv(layout.env)}>{layout.env}</TabsTrigger>
                          </>)
                        }
                      </TabsList>

                      {!editing && <Button variant={'secondary'} onClick={() => setEditing(true)}>
                        <Pencil className={"w-4 h-4 mr-2"}/> Edit
                      </Button>}
                      {editing && <div className={"flex gap-2 flex-wrap justify-end"}>
                        <Button variant={'secondary'} onClick={() => setEditing(false)}>
                          <Check className={"w-4 h-4 mr-2"}/> Done
                        </Button>
                        <SheetTrigger asChild>
                          <Button variant="outline">
                            <Plus className={"w-4 h-4 mr-2"}/>
                            Add
                          </Button>
                        </SheetTrigger>
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
                  </Tabs> : <h2 class={"text-2xl text-center"}>Go to most recent deployment version to display stats</h2>
                }</>
            }
          </div>
          <h2>Deployments</h2>
          <DeploymentsDataTable data={deployments ? deployments.page : []} columns={columns}/>
          <SheetContent side={isMobile ? 'bottom' : 'right'}>
            <SheetHeader>
              <SheetTitle>Add new widget</SheetTitle>
              <SheetDescription>
                Drag and drop your favorites widgets. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>System widgets</AccordionTrigger>
                  <AccordionContent>
                    <div className={"flex flex-col gap-3"}>
                      <DraggableStat
                        icon={<MemoryStick className={"mr-2 h-6 w-6"}/>}
                        statType={StatType.SYSTEM_RAM_USAGE}
                        label={"RAM usage"}
                        onDragStart={handleDraggableDragStart}/>
                      <DraggableStat icon={<Cpu className={"mr-2 h-6 w-6"}/>}
                                     statType={StatType.SYSTEM_CPU_USAGE}
                                     label={"CPU Usage"}
                                     onDragStart={handleDraggableDragStart}/>
                      <DraggableStat icon={<HeartPulse className={"mr-2 h-6 w-6"}/>}
                                     statType={StatType.HEALTHCHECK}
                                     label={"Healthcheck"}
                                     onDragStart={handleDraggableDragStart}/>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Stats widgets</AccordionTrigger>
                  <AccordionContent>
                    <div className={"flex flex-col gap-3"}>
                      <DraggableStat icon={<Blocks className={"mr-2 h-6 w-6"}/>}
                                     statType={StatType.STATS_AVG_BUILD_TIME}
                                     label={"Average build time"}
                                     onDragStart={handleDraggableDragStart}/>
                      <DraggableStat icon={<Blocks className={"mr-2 h-6 w-6"}/>}
                                     statType={StatType.STATS_GATES_FAILED_PASSED}
                                     label={"Gates passed/failed"}
                                     onDragStart={handleDraggableDragStart}/>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        </div>
      </Sheet>
    </PlatformLayout>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const {query: {deploymentUnitId}} = ctx;

  return {props: {deploymentUnitId}}
}

export default DeploymentUnitPage;
