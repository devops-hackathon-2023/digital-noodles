import {AppModuleResponse, PageResponseDeploymentUnitResponse} from "@/utils/types";
import {NextPage} from "next";
import {Button} from "@/components/atoms/button";
import {columns} from "@/components/organisms/deployment-units/deploymentUnitsDataTable/columns";
import {
  DeploymentUnitsDataTable
} from "@/components/organisms/deployment-units/deploymentUnitsDataTable/deploymentUnitsDataTable";

interface AppModuleDashboardViewProps {
  deploymentUnits?: PageResponseDeploymentUnitResponse,
  appModule?: AppModuleResponse,
  dataTablePageSize: number,
  handleTableSize: (size: number) => void,
  handleTablePage: (page: number) => void,
}

const AppModuleDashboardView: NextPage<AppModuleDashboardViewProps> = ({
                                                                         deploymentUnits,
                                                                         appModule,
                                                                         dataTablePageSize,
                                                                         handleTableSize,
                                                                         handleTablePage
                                                                       }) => {

  if (deploymentUnits === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            {appModule?.name}
          </h1>
        </div>
      </div>

      <div className={"flex flex-col gap-3"}>
        <div className="flex w-full justify-between items-center">
          <div>
            <h1 className="text-2xl leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
              Deployment units
            </h1>
          </div>
          <Button>
            Add new Deployment unit
          </Button>
        </div>
        <DeploymentUnitsDataTable
          data={deploymentUnits.page}
          columns={columns}
          pageCount={deploymentUnits.pageCount}
          pageSize={dataTablePageSize}
          pageNumber={deploymentUnits.pageNumber}
          handleTableSize={handleTablePage}
          handleTablePage={handleTableSize}
        />
      </div>
    </div>
  )
}

export default AppModuleDashboardView