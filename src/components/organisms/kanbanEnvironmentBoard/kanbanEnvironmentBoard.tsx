import React, {useCallback, useState} from "react";
import {initialData} from "@/components/organisms/kanbanEnvironmentBoard/data";
import Column from "@/components/organisms/kanbanEnvironmentBoard/Column";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {DeploymentDecorate} from "@/utils/types";

const KanbanEnvironmentBoard = () => {
  const [data, setData] = useState<{
    [key: string]: DeploymentDecorate[]
  }>(initialData)

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

    const matchingItem = data[source.droppableId].find(v => v.id === draggableId);
    const updatedSourceColumn = [...data[source.droppableId]].filter(d => d.id !== draggableId);
    const updatedDestinationColumn = [...data[destination.droppableId]];

    updatedDestinationColumn.push(matchingItem!);

    setData({
      ...data,
      [source.droppableId]: updatedSourceColumn,
      [destination.droppableId]: updatedDestinationColumn,
    });

  }, [])

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
    >
      <div className={"flex gap-4"}>
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