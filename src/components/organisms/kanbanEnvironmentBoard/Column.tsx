import {NextPage} from "next";
import {DeploymentDecorate} from "@/utils/types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/atoms/card";
import React from "react";
import {Droppable} from "react-beautiful-dnd";
import DeploymentCard from "@/components/organisms/kanbanEnvironmentBoard/DeploymentCard";
import {Cloud} from "lucide-react";

interface ColumnProps {
  data: DeploymentDecorate[],
  title: string,
}

const Column: NextPage<ColumnProps> = ({
                                         data,
                                         title
                                       }) => {
  return (
    <Card className={"w-[100%] max-w-[400px] flex-shrink-0"}>
      <CardHeader className={"text-center"}>
        <CardTitle className={"flex gap-3"}>
          <Cloud/>
          {title}
        </CardTitle>
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