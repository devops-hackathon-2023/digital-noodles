import {PageResponseDeploymentUnitResponse, SasResponse} from "@/utils/types";
import {NextPage} from "next";
import {
  DeploymentUnitsDataTable
} from "@/components/organisms/deployment-units/deploymentUnitsDataTable/deploymentUnitsDataTable";
import {columns} from "@/components/organisms/deployment-units/deploymentUnitsDataTable/columns";
import {Button} from "@/components/atoms/button";
import {Skeleton} from "@/components/atoms/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React from "react";

interface DeploymentUnitsViewProps {
  pageDeploymentUnits?: PageResponseDeploymentUnitResponse,
  selectedSas?: SasResponse,
  handleTableSize: (size: number) => void,
  handleTablePage: (page: number) => void,
  dataTablePageSize: number
}


const DeploymentUnitsView: NextPage<DeploymentUnitsViewProps> = ({
                                                                   pageDeploymentUnits,
                                                                   selectedSas,
                                                                   handleTableSize,
                                                                   handleTablePage,
                                                                   dataTablePageSize
                                                                 }) => {
  if (!pageDeploymentUnits) {
    return <div className="relative flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            App modules
          </h1>
        </div>
        <Button>
          Add new app modules
        </Button>
      </div>
      <div className={"flex flex-col gap-3"}>
        <Skeleton className="h-4 w-[250px]"/>
        <Skeleton className="h-6 w-full"/>
        <Skeleton className="h-6 w-full"/>
        <div className={"flex justify-end"}>
          <Skeleton className="h-4 w-[100px]"/>
        </div>
      </div>
    </div>
  }

  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Deployment Units
          </h1>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              Add new deployment units
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Github import</DialogTitle>
              <DialogDescription>
                github projects
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <DeploymentUnitsDataTable
        data={pageDeploymentUnits?.page.filter(d => d.sasId === selectedSas?.id)}
        columns={columns}
        pageCount={pageDeploymentUnits.pageCount}
        pageSize={dataTablePageSize}
        pageNumber={pageDeploymentUnits.pageNumber}
        handleTableSize={handleTablePage}
        handleTablePage={handleTableSize}
      />
    </div>
  )
}

export default DeploymentUnitsView