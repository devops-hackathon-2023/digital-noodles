import React, {useCallback, useState} from "react";
import Column from "@/components/organisms/kanbanEnvironmentBoard/Column";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {DeploymentDecorate} from "@/utils/types";
import {useToast} from "@/components/ui/use-toast";

interface KanbanEnvironmentBoardProps {
  dashboardConfig: {
    [key: string]: DeploymentDecorate[]
  }
}

const KanbanEnvironmentBoard: React.FC<KanbanEnvironmentBoardProps> = ({
                                                                         dashboardConfig
                                                                       }) => {
  const [data, setData] = useState<{
    [key: string]: DeploymentDecorate[]
  }>(dashboardConfig)

  const {toast} = useToast()

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

    setData(prevData => {
      const clonedData = JSON.parse(JSON.stringify(prevData));

      const sourceColumn = clonedData[source.droppableId];
      const destinationColumn = clonedData[destination.droppableId];

      const draggingItemIndex = sourceColumn.findIndex((v: DeploymentDecorate) => v.id === draggableId);
      const draggingItem = sourceColumn[draggingItemIndex];
      const itemToRemoveIndex = destinationColumn.findIndex((v: DeploymentDecorate) => v.deploymentUnit.id === draggingItem.deploymentUnit.id);

      const temp = JSON.parse(JSON.stringify(draggingItem))
      temp.id += destination.droppableId

      destinationColumn.push(temp);
      destinationColumn.splice(itemToRemoveIndex, 1);

      toast({
        title: `Successfully deployed ${draggingItem.deploymentUnit.name} to ${destination.droppableId}!`,
      })

      return {
        ...clonedData,
        [destination.droppableId]: destinationColumn,
      };
    });
  }, [])

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <div className={"md:flex-row flex-col flex gap-4 overflow-auto w-full pb-2"}>
        {Object.keys(data).map((key: string, index: number) => {
          return (
            <Column data={data[key]} title={key} key={index}/>
          )
        })}
      </div>
    </DragDropContext>
  )
}

export default KanbanEnvironmentBoard