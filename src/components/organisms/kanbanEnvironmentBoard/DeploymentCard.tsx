import {DeploymentDecorate} from "@/utils/types";
import React from "react";
import {Card, CardContent, CardHeader} from "@/components/atoms/card";
import {Draggable} from "react-beautiful-dnd";

interface DeploymentCardProps {
  deployment: DeploymentDecorate,
  index: number
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({
                                                         deployment,
                                                         index
                                                       }) => {
  return (
    <Draggable draggableId={deployment.id} index={index}>
      {(provided, snapshot, rubric) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={"mb-2"}
        >
          <CardHeader>
            {deployment.id}
          </CardHeader>
          <CardContent>
            {deployment.deployment.status}
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}

export default DeploymentCard