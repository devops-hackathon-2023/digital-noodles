import React, {useCallback, useState} from 'react';
import {ArrowDown, Boxes, GitBranch, GitCommitHorizontal, Rocket} from "lucide-react";
import {Button} from "@/components/atoms/button";
import {DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger} from "@/components/atoms/dropdown-menu";
import {DropdownMenuContent} from "@radix-ui/react-dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/atoms/tabs";
import DeploymentsDataTable from "@/components/organisms/deployment-units/deploymentsDataTable/deploymentsDataTable";
import {columns} from "@/components/organisms/deployment-units/deploymentsDataTable/columns";
import {
  AppModuleResponse,
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
import Deployments from "@/components/organisms/deployment-units/tabs/deployments";
import Link from "next/link";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "@/components/ui/use-toast";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/atoms/dialog";
import {Skeleton} from "@/components/atoms/skeleton";
import DeploymentCard from "@/components/molecules/deploymentCard";
import axiosInstance from "@/utils/lib/axiosInstance";
import {DialogTrigger} from "@/components/ui/dialog";


interface DeploymentUnitDetailViewProps {
  appModule: AppModuleResponse,
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
  selectedEnv: string
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
                                                                             handleDraggableDragStart,
                                                                             selectedEnv,
                                                                             appModule
                                                                           }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModal = useCallback(() => {
    setIsModalOpen(prevState => !prevState)
  }, [])

  const handleDeploy = () => {
    handleModal()
    toast({
      title: `Started a deployed of ${deploymentUnit.name}!`,
      variant: "info"
    })
  }

  if (dashboardConfigs === undefined || deploymentUnit === undefined) {
    return <>Loading</>
  }

  return (
    <div className="relative flex flex-col gap-5 no-scrollbar">
      <div className={"flex gap-4 items-center w-full justify-between"}>
        <div className={"flex items-center gap-6 flex-wrap"}>
          <div className={"flex items-center gap-4"}>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              <span className={"font-medium tracking-normal text-2xl"}>
                <Link href={`/app-modules/${appModule.id}`}>
                  {appModule.name}
                </Link>
              </span>
              <span className={"m-2 font-medium tracking-normal "}>/</span>

              <CopyToClipboard text={deploymentUnit?.id} onCopy={() => {
                toast({
                  title: "Copied to clipboard!",
                  description: deploymentUnit?.id,
                })
              }}><span className={"cursor-copy"}>{deploymentUnit?.name}</span>

              </CopyToClipboard>
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
      <div className={"flex gap-2 items-end w-full justify-between flex-wrap"}>
        <div className={"flex gap-2"}>
          <div>
            <Label>Environment</Label>
            <Select defaultValue={"DEV"} onValueChange={setSelectedEnv}>
              <SelectTrigger className="w-[180px] mt-1">
                <SelectValue placeholder="Environment"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEV">DEV</SelectItem>
                <SelectItem value="INT">INT</SelectItem>
                <SelectItem value="PRS">PRS</SelectItem>
                <SelectItem value="PRED">PRED</SelectItem>
                <SelectItem value="PROD">PROD</SelectItem>
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
                  deploymentUnitVersions?.page.map((version, index) => (
                    // @ts-ignore
                    <SelectItem value={version} key={index}>
                      {version.version}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
        <Dialog open={isModalOpen} defaultOpen={false} onOpenChange={setIsModalOpen}>
          <DialogTrigger>
            <Button>
              Deploy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New deployment</DialogTitle>
              <DialogDescription>
                <DeploymentCard deploymentUnit={deploymentUnit}
                                closeModal={handleModal}
                                handleDeploy={handleDeploy}/>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
            selectedEnv={selectedEnv}
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
        <TabsContent value="deployments"><Deployments deployments={deployments}/></TabsContent>
        <TabsContent value="config"><Config/></TabsContent>
      </Tabs>
    </div>
  );
};

export default DeploymentUnitDetailView;
