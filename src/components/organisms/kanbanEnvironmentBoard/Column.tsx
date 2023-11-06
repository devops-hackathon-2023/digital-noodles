import {NextPage} from "next";
import {DeploymentDecorate} from "@/utils/types";
import {Card, CardContent, CardHeader} from "@/components/atoms/card";
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import DeploymentCard from "@/components/organisms/kanbanEnvironmentBoard/DeploymentCard";

interface ColumnProps {
  data: DeploymentDecorate[],
  title: string,
}

const Column: NextPage<ColumnProps> = ({
                                         data,
                                         title
                                       }) => {
  return (
    <Card>
      <CardHeader className={"text-center"}>
        {title}
      </CardHeader>
      <CardContent>
        <Droppable droppableId={title}>
          {(provided, snapshot) => (
            <div className={"flex flex-col"} ref={provided.innerRef} {...provided.droppableProps}>
              {data.map((d: DeploymentDecorate, index: number) => {
                return (
                  <DeploymentCard deployment={d} index={index} key={index}/>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  )
}

export default Column