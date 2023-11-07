import React from 'react';
import {ArrowDown, Boxes, GitBranch, GitCommitHorizontal, Rocket} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger} from "@/components/atoms/dropdown-menu";
import {DropdownMenuContent} from "@radix-ui/react-dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/atoms/tabs";
import DeploymentsDataTable from "@/components/organisms/deployment-units/deploymentsDataTable/deploymentsDataTable";
import {columns} from "@/components/organisms/deployment-units/deploymentsDataTable/columns";
import {
  DeploymentUnitResponse,
  DeploymentUnitVersionResponse,
  PageResponseDeploymentResponse,
  PageResponseDeploymentUnitVersionResponse,
  StatType
} from "@/utils/types";
import Dashboard from "@/components/organisms/deployment-units/tabs/dashboard";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select";
import Log from "@/components/organisms/deployment-units/tabs/log";
import Config from "@/components/organisms/deployment-units/tabs/config";
import {Label} from "@/components/atoms/label";


interface DeploymentUnitDetailViewProps {
  deploymentUnit: DeploymentUnitResponse,
  selectedVersion?: DeploymentUnitVersionResponse,
  deploymentUnitVersions: PageResponseDeploymentUnitVersionResponse,
  setSelectedVersion: (version: DeploymentUnitVersionResponse) => void,
  dashboardConfigs: any,
  lastDeploymentUnitVersion: DeploymentUnitVersionResponse | undefined,
  setSelectedEnv: (env: string) => void,
  editing: boolean,
  setEditing: (state: boolean) => void,
  draggedStatType: string | undefined,
  handleLayoutChange: (dashboardConfigId: string, layout: any[]) => void,
  deployments: PageResponseDeploymentResponse,
  handleDraggableDragStart: (statType: StatType) => void
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
    {droppable && <ArrowDown className={"w-4 h-4"}/>}
  </div>
)

const DeploymentUnitDetailView: React.FC<DeploymentUnitDetailViewProps> = ({
                                                                             deploymentUnit,
                                                                             selectedVersion,
                                                                             deploymentUnitVersions,
                                                                             setSelectedVersion,
                                                                             dashboardConfigs,
                                                                             lastDeploymentUnitVersion,
                                                                             setSelectedEnv,
                                                                             editing,
                                                                             setEditing,
                                                                             draggedStatType,
                                                                             handleLayoutChange,
                                                                             deployments,
                                                                             handleDraggableDragStart
                                                                           }) => {
  return (
    <div className="relative flex flex-col gap-5 no-scrollbar">
      <div className={"flex gap-4 items-center w-full justify-between"}>
        <div className={"flex items-center gap-6 flex-wrap"}>
          <div className={"flex items-center gap-4"}>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              {deploymentUnit?.name}
            </h1>
            <Boxes className={"w-8 h-8"}/>
          </div>
          <div className={"flex gap-2 my-4 z-40"}>
            <VersionInfo icon={<GitBranch className={"w-4 h-4"}/>} text={selectedVersion?.gitBranch}/>
            <VersionInfo icon={<GitCommitHorizontal className={"w-4 h-4"}/>}
                         text={`#${selectedVersion?.gitCommitHash.slice(0, 7)}`}/>
            {/*<DropdownMenu modal={true}>*/}
            {/*  <DropdownMenuTrigger>*/}
            {/*    <VersionInfo icon={<Rocket className={"w-4 h-4"}/>} text={selectedVersion?.version} droppable/>*/}
            {/*  </DropdownMenuTrigger>*/}

            {/*  <DropdownMenuContent className="w-[120px] bg-card mt-2 shadow-md rounded-md p-2 border-solid">*/}
            {/*    <DropdownMenuGroup>*/}
            {/*      <div className={"h-40 overflow-scroll no-scrollbar "}>*/}
            {/*        {*/}
            {/*          deploymentUnitVersions?.page.map(version => (*/}
            {/*            <DropdownMenuItem onClick={() => setSelectedVersion(version)}>*/}
            {/*              <span>{version.version}</span></DropdownMenuItem>*/}
            {/*          ))*/}
            {/*        }*/}
            {/*      </div>*/}
            {/*    </DropdownMenuGroup>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </div>
        </div>
        {/*<Button>*/}
        {/*  Settings*/}
        {/*</Button>*/}
      </div>
      <div className={"flex gap-2"}>
        <div>
          <Label>Environment</Label>
          <Select defaultValue={"test"}>
            <SelectTrigger className="w-[180px] mt-1">
              <SelectValue placeholder="Environment"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test">TEST</SelectItem>
              <SelectItem value="dev">DEV</SelectItem>
              <SelectItem value="prs">PRS</SelectItem>
              <SelectItem value="prev">PRED</SelectItem>
              <SelectItem value="prod">PROD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Version</Label>
          {/*// @ts-ignore*/}
          <Select onValueChange={setSelectedVersion} value={selectedVersion}>
            <SelectTrigger className="w-[180px] mt-1">
              <SelectValue placeholder="Environment"/>
            </SelectTrigger>
            <SelectContent className={" h-[180px]"}>
              {
                deploymentUnitVersions?.page.map(version => (
                  // @ts-ignore
                  <SelectItem value={version}>
                    {version.version}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="log">Log</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard
            deploymentUnit={deploymentUnit}
            selectedVersion={selectedVersion}
            deploymentUnitVersions={deploymentUnitVersions}
            setSelectedVersion={setSelectedVersion}
            dashboardConfigs={dashboardConfigs}
            lastDeploymentUnitVersion={lastDeploymentUnitVersion}
            setSelectedEnv={setSelectedEnv}
            editing={editing}
            setEditing={setEditing}
            draggedStatType={draggedStatType}
            handleLayoutChange={handleLayoutChange}
            deployments={deployments}
            handleDraggableDragStart={handleDraggableDragStart}
          />
        </TabsContent>
        <TabsContent value="log"><Log/></TabsContent>
        <TabsContent value="deployments"><DeploymentsDataTable data={deployments ? deployments.page : []}
                                                               columns={columns}/></TabsContent>
        <TabsContent value="config"><Config/></TabsContent>
      </Tabs>
    </div>
  );
};

export default DeploymentUnitDetailView;
