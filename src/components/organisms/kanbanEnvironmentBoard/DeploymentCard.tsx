import {DeploymentDecorate} from "@/utils/types";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/atoms/card";
import {Draggable} from "react-beautiful-dnd";
import {Badge} from "@/components/atoms/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/avatar";
import {useTheme} from "next-themes";
import classNames from "classnames";
import {GitBranch, GitBranchIcon, GitCommit} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DeploymentCardProps {
  deployment: DeploymentDecorate,
  index: number
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({
                                                         deployment,
                                                         index
                                                       }) => {
  const theme = useTheme()
  const currentTheme = theme.theme;

  return (
    <Draggable draggableId={deployment.id} index={index}>
      {(provided, snapshot, rubric) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={classNames("mb-5 ", {"bg-gray-100": currentTheme === "light"}, {"bg-neutral-950": currentTheme === "dark"})}
        >
          <CardHeader>
            <CardTitle>
              <div className={"flex justify-between items-center"}>
                <Link href={`/deployment-units/${deployment.deploymentUnit.id}`}>{deployment.deploymentUnit.name}</Link>
                <Badge variant={"secondary"}>
                  v{deployment.deploymentUnitVersion.version}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription>
              <div
                className={classNames("font-bold", {"text-red-600": deployment.deployment.status === "FAILED"}, {"text-green-600": deployment.deployment.status === "SUCCESS"})}
              >{deployment.deployment.status}</div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={"flex flex-col gap-3"}>
              <div className={"flex gap-2"}>
                <Badge>
                  <GitBranch className={"w-4 h-4"}/>
                  <div className={"ml-2"}>{deployment.deploymentUnitVersion.gitBranch}</div>
                </Badge>
                <Badge>
                  <Image src={"/jira.svg"} alt={"Jira logo"} width={15} height={15}/>
                  <div className={"ml-2"}>{deployment.deployment.changeTicketId}</div>
                </Badge>
              </div>
              <div>{deployment.deployment.finishedAt}</div>
            </div>
          </CardContent>
          <CardFooter>
            <div className={"flex items-center"}>
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${deployment.deployment.deployer}.png`}
                  alt={deployment.deployment.deployer}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className={"text-xl font-bold"}>{deployment.deployment.deployer}</div>
            </div>
          </CardFooter>
        </Card>
      )}
    </Draggable>
  )
}

export default DeploymentCard