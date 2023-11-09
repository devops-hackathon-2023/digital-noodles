import React, {useCallback, useEffect, useState} from "react";
import Column from "@/components/organisms/kanbanEnvironmentBoard/Column";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {DeploymentDecorate} from "@/utils/types";
import {useToast} from "@/components/ui/use-toast";
import axiosInstance from "@/utils/lib/axiosInstance";
import {useSession} from "next-auth/react";
import {KeyedMutator} from "swr";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/atoms/dialog";
import DeploymentCard from "@/components/molecules/deploymentCard";
import {Skeleton} from "@/components/atoms/skeleton";

interface KanbanEnvironmentBoardProps {
  configMutate: KeyedMutator<any>
  dashboardConfig: {
    [key: string]: DeploymentDecorate[]
  }
}

const KanbanEnvironmentBoard: React.FC<KanbanEnvironmentBoardProps> = ({
                                                                         dashboardConfig,
                                                                         configMutate
                                                                       }) => {
  const [data, setData] = useState<{
    [key: string]: DeploymentDecorate[]
  }>(dashboardConfig)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDeployment, setSelectedDeployment] = useState<DeploymentDecorate | undefined>()
  const [sourceEnvironment, setSourceEnvironment] = useState<string | undefined>()
  const [destinationEnvironment, setDestinationEnvironment] = useState<string | undefined>()

  const {toast} = useToast()
  const session = useSession()

  useEffect(() => {
    setData(dashboardConfig)
    console.log("ahoj")
  }, [dashboardConfig])

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(prevState => !prevState)
  }, [])


  const handleOnDragEnd = useCallback((result: DropResult) => {
    const {
      destination,
      source,
      draggableId
    } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId
    ) return;


    const clonedData = JSON.parse(JSON.stringify(data));

    const sourceColumn = clonedData[source.droppableId];

    const draggingItemIndex = sourceColumn.findIndex((v: DeploymentDecorate) => v.deployment.id === draggableId);
    const draggingItem = sourceColumn[draggingItemIndex];


    // // "environment": "PROD",
    // //   "version": "1",
    // //   "deploymentUnitName": "argocd",
    // //   "changeTicketId": "CHG-475912",
    // //   "deployer": "Milan",
    // //   "platform": "OPEN_SHIFT"
    // console.log("---------------------")
    // console.log(data)
    // console.log(sourceColumn)
    // console.log(draggableId)
    // console.log(draggingItemIndex)
    // console.log(draggingItem)
    // console.log("---------------------")
    setDestinationEnvironment(destination.droppableId)
    setSourceEnvironment(source.droppableId)
    setSelectedDeployment(draggingItem)
    handleModalOpen()


    // axiosInstance
    //   .post('/deployments/start', {
    //     "environment": destination.droppableId,
    //     "version": "1",
    //     "deploymentUnitName": draggingItem.deploymentUnit.name,
    //     "changeTicketId": draggingItem.deployment.changeTicketId,
    //     "deployer": session.data?.user?.name,
    //     "platform": draggingItem.deployment.platform
    //   }, {})
    //   .then((response) => {
    //     configMutate().then(() => {
    //       toast({
    //         title: `Started a deployed of ${draggingItem.deploymentUnit.name} v${draggingItem.deploymentUnitVersion.version} to ${destination.droppableId}!`,
    //         variant: "info"
    //       })
    //     })
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error :(",
    //       description: error,
    //       variant: "destructive"
    //     })
    //   });


    // return {
    //   ...clonedData,
    //   [destination.droppableId]: destinationColumn,
    // };
    // });
  }, [])


  const handleDeploy = () => {
    axiosInstance
      .post('/deployments/start', {
        "environment": destinationEnvironment,
        "version": "1",
        "deploymentUnitName": selectedDeployment?.deploymentUnit.name,
        "changeTicketId": selectedDeployment?.deployment.changeTicketId,
        "deployer": session.data?.user?.name,
        "platform": selectedDeployment?.deployment.platform
      }, {})
      .then((response) => {
        configMutate().then(() => {
          toast({
            title: `Started a deployed of ${selectedDeployment?.deploymentUnit.name} v${selectedDeployment?.deploymentUnitVersion.version} to ${destinationEnvironment}!`,
            variant: "info"
          })
        })
        handleModalOpen()
      })
      .catch((error) => {
        toast({
          title: "Error :(",
          description: error,
          variant: "destructive"
        })
      });
  }

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <div className={"md:flex-row flex-col flex gap-4 overflow-auto w-full pb-2 no-scrollbar"}>
        {Object.keys(data).map((key: string, index: number) => {
          return (
            <Column data={data[key]} title={key} key={index} configMutate={configMutate}/>
          )
        })}
      </div>
      <Dialog open={isModalOpen} defaultOpen={false} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New deployment</DialogTitle>
            <DialogDescription>
              {selectedDeployment === undefined || destinationEnvironment === undefined || sourceEnvironment === undefined ?
                <Skeleton className={"w-full h-[300px]"}/>
                : <DeploymentCard deployment={selectedDeployment} destinationEnv={destinationEnvironment}
                                  closeModal={handleModalOpen}
                                  handleDeploy={handleDeploy}
                                  sourceEnv={sourceEnvironment}/>
              }
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </DragDropContext>
  )
}

export default KanbanEnvironmentBoard