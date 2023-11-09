import {columns} from "@/components/organisms/deployment-units/deploymentsDataTable/columns";
import DeploymentsDataTable from "@/components/organisms/deployment-units/deploymentsDataTable/deploymentsDataTable";
import React from "react";
import {PageResponseDeploymentResponse} from "@/utils/types";

interface DeploymentsProps {
  deployments: PageResponseDeploymentResponse
}

const Deployments: React.FC<DeploymentsProps> = ({deployments}) => {
  console.log(deployments)

  return (
    <DeploymentsDataTable data={deployments ? deployments.page : []}
                          columns={columns}/>
  )
}

export default Deployments