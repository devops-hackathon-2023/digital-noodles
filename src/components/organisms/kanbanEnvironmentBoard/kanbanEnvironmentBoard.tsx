import React, {useCallback, useEffect, useState} from "react";
import Column from "@/components/organisms/kanbanEnvironmentBoard/Column";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {DeploymentDecorate} from "@/utils/types";
import {useToast} from "@/components/ui/use-toast";
import axiosInstance from "@/utils/lib/axiosInstance";
import {useSession} from "next-auth/react";
import {KeyedMutator} from "swr";

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

  const {toast} = useToast()
  const session = useSession()

  useEffect(() => {
    setData(dashboardConfig)
    console.log("ahoj")
  }, [dashboardConfig])


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




    // "environment": "PROD",
    //   "version": "1",
    //   "deploymentUnitName": "argocd",
    //   "changeTicketId": "CHG-475912",
    //   "deployer": "Milan",
    //   "platform": "OPEN_SHIFT"
    console.log("---------------------")
    console.log(data)
    console.log(sourceColumn)
    console.log(draggableId)
    console.log(draggingItemIndex)
    console.log(draggingItem)
    console.log("---------------------")


    axiosInstance
      .post('/deployments/start', {
        "environment": destination.droppableId,
        "version": "1",
        "deploymentUnitName": draggingItem.deploymentUnit.name,
        "changeTicketId": draggingItem.deployment.changeTicketId,
        "deployer": session.data?.user?.name,
        "platform": draggingItem.deployment.platform
      }, {})
      .then((response) => {
        configMutate().then(() => {
          toast({
            title: `Successfully deployed ${draggingItem.deploymentUnit.name} v${draggingItem.deploymentUnitVersion.version} to ${destination.droppableId}!`,
            variant: "success"
          })
        })
        console.log(response)
      })
      .catch((error) => {
        toast({
          title: "Error :(",
          description: error,
          variant: "destructive"
        })
      });


    // return {
    //   ...clonedData,
    //   [destination.droppableId]: destinationColumn,
    // };
    // });
  }, [])

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
    </DragDropContext>
  )
}

export default KanbanEnvironmentBoard