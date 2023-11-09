import React from "react";
import {
  DeploymentUnitResponse,
  DeploymentUnitVersionResponse,
  PageResponseDeploymentResponse,
  PageResponseDeploymentUnitVersionResponse,
  StatType
} from "@/utils/types";
import {Blocks, Check, Cpu, HeartPulse, MemoryStick, Pencil, Plus} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/atoms/sheet";
import {isMobile} from "react-device-detect";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/atoms/accordion";
import DashboardGrid from "@/components/molecules/DashboardGrid/DashboardGrid";
import DraggableStat from "@/components/molecules/DraggableStat/DraggableStat";


interface DashboardProps {
  deploymentUnit: DeploymentUnitResponse,
  selectedVersion?: DeploymentUnitVersionResponse,
  deploymentUnitVersions: PageResponseDeploymentUnitVersionResponse,
  setSelectedVersion: (version: DeploymentUnitVersionResponse) => void,
  dashboardConfigs: any[],
  lastDeploymentUnitVersion: DeploymentUnitVersionResponse | undefined,
  setSelectedEnv: (env: string) => void,
  editing: boolean,
  setEditing: (state: boolean) => void,
  draggedStatType: string | undefined,
  handleLayoutChange: (dashboardConfigId: string, layout: any[]) => void,
  deployments: PageResponseDeploymentResponse,
  handleDraggableDragStart: (statType: StatType) => void
  selectedEnv: string
}


const Dashboard: React.FC<DashboardProps> = ({
                                               dashboardConfigs,
                                               lastDeploymentUnitVersion,
                                               setSelectedEnv,
                                               editing,
                                               selectedEnv,
                                               setEditing,
                                               draggedStatType,
                                               handleLayoutChange,
                                               selectedVersion,
                                               deployments,
                                               handleDraggableDragStart
                                             }) => {


  const selectedEnvIndex = dashboardConfigs.findIndex((l) => l.env === selectedEnv)
  const layout = dashboardConfigs[selectedEnvIndex]

  return (
    <Sheet modal={false}>
      <div className="relative flex flex-col w-full">
        {!editing && <div className={"flex gap-2 flex-wrap justify-end"}><Button variant={'secondary'}
                                                                                 onClick={() => setEditing(true)}>
            <Pencil className={"w-4 h-4 mr-2"}/> Edit
        </Button>
        </div>
        }
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
        {lastDeploymentUnitVersion?.id === selectedVersion?.id ?
          <DashboardGrid editing={editing} dashboardConfigId={layout.id}
                         draggedStatType={draggedStatType} layout={layout.dashboardCells}
                         onLayoutChange={handleLayoutChange} onCellDelete={() => {
          }}/> :
          <h2 className={"text-2xl text-center"}>Go to most recent deployment version to display stats</h2>
        }

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
  )
}

export default Dashboard