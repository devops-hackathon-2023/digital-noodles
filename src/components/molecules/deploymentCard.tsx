import React from "react";
import {DeploymentDecorate, DeploymentUnitResponse} from "@/utils/types";
import {Select, SelectContent, SelectItem} from "../atoms/select";
import {SelectTrigger} from "@/components/atoms/select";
import {SelectValue} from "@radix-ui/react-select";
import {Label} from "@/components/atoms/label";
import {Badge} from "@/components/atoms/badge";
import {GitBranch} from "lucide-react";
import Image from "next/image";
import {Button} from "@/components/atoms/button";

interface DeploymentCardProps {
  deployment?: DeploymentDecorate,
  destinationEnv?: string,
  sourceEnv?: string,
  closeModal: () => void,
  handleDeploy: () => void
  deploymentUnit?:DeploymentUnitResponse
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({
                                                         destinationEnv,
                                                         sourceEnv,
                                                         deployment,
                                                         closeModal,
                                                         handleDeploy,
                                                         deploymentUnit
                                                       }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"text-2xl flex font-bold"}>
        <div>
          Deployment unit:
        </div>
        <div className={"ml-2"}>
          {deployment && deployment?.deploymentUnit.name}
          {deploymentUnit && deploymentUnit.name}
        </div>
      </div>
      <div className={"flex flex-wrap gap-2 w-full"}>
        <div className={"flex-1"}>
          <Label className={"mb-2"}>From environment</Label>
          <Select defaultValue={sourceEnv} disabled={deployment !== undefined}>
            <SelectTrigger className="w-full mt-1">
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
        <div className={"flex-1"}>
          <Label className={"mb-2"}>To environment</Label>
          <Select defaultValue={destinationEnv}>
            <SelectTrigger className="w-full mt-1">
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
      </div>
      <div className={"flex flex-wrap gap-2 w-full"}>
        <div className={"flex-1"}>
          <Label className={"mb-2"}>Branch</Label>
          <Select defaultValue={deployment?.deploymentUnitVersion.gitBranch ?? "main"}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Branch"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main"><Badge>
                <GitBranch className={"w-4 h-4"}/>
                <div className={"ml-2"}>Main</div>
              </Badge></SelectItem>
              <SelectItem value="master"><Badge>
                <GitBranch className={"w-4 h-4"}/>
                <div className={"ml-2"}>Master</div>
              </Badge></SelectItem>
              <SelectItem value="features"><Badge>
                <GitBranch className={"w-4 h-4"}/>
                <div className={"ml-2"}>Features</div>
              </Badge></SelectItem>
              <SelectItem value="hotfix"><Badge>
                <GitBranch className={"w-4 h-4"}/>
                <div className={"ml-2"}>Hotfix</div>
              </Badge></SelectItem>
              <SelectItem value="release"><Badge>
                <GitBranch className={"w-4 h-4"}/>
                <div className={"ml-2"}>Release</div>
              </Badge></SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className={"flex-1"}>
          <Label className={"mb-2"}>Ticket ID</Label>
          <Select
            defaultValue={"CHG-146786"}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Environment"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHG-146786"><Badge>
                <Image src={"/jira.svg"} alt={"Jira logo"} width={15} height={15}/>
                <div className={"ml-2"}>CHG-146786</div>
              </Badge></SelectItem>
              <SelectItem value="CHG-146785"><Badge>
                <Image src={"/jira.svg"} alt={"Jira logo"} width={15} height={15}/>
                <div className={"ml-2"}>CHG-146785</div>
              </Badge></SelectItem>
              <SelectItem value="CHG-146784"><Badge>
                <Image src={"/jira.svg"} alt={"Jira logo"} width={15} height={15}/>
                <div className={"ml-2"}>CHG-146784</div>
              </Badge></SelectItem>
              <SelectItem value="CHG-146783"><Badge>
                <Image src={"/jira.svg"} alt={"Jira logo"} width={15} height={15}/>
                <div className={"ml-2"}>CHG-146783</div>
              </Badge></SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className={"flex w-full justify-between mt-10"}>
        <Button variant={"outline"} onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={handleDeploy}>
          Deploy
        </Button>
      </div>
    </div>
  )
}

export default DeploymentCard