import {
  AppModuleResponse,
  DeploymentDecorate,
  PageResponseDeploymentUnitResponse,
  PageResponseQualityGateResponse
} from "@/utils/types";
import {NextPage} from "next";
import {Button} from "@/components/atoms/button";
import {columns} from "@/components/organisms/deployment-units/deploymentUnitsDataTable/columns";
import {
  DeploymentUnitsDataTable
} from "@/components/organisms/deployment-units/deploymentUnitsDataTable/deploymentUnitsDataTable";
import QualityGateRatingChart from "@/components/organisms/app-modules/qualityGateCharts/qualityGateRatingChart";
import QualityGateResultChart from "@/components/organisms/app-modules/qualityGateCharts/qualityGateResultChart";
import QualityGatePercentChart from "@/components/organisms/app-modules/qualityGateCharts/qualityGatePercentChart";
import {Skeleton} from "@/components/atoms/skeleton";
import KanbanEnvironmentBoard from "@/components/organisms/kanbanEnvironmentBoard/kanbanEnvironmentBoard";
import {KeyedMutator} from "swr";

interface AppModuleDashboardViewProps {
  configMutate: KeyedMutator<any>,
  deploymentUnits?: PageResponseDeploymentUnitResponse,
  appModule?: AppModuleResponse,
  dataTablePageSize: number,
  qualityGates: PageResponseQualityGateResponse,
  handleTableSize: (size: number) => void,
  handleTablePage: (page: number) => void,
  dashboardConfig: {
    [key: string]: DeploymentDecorate[]
  }
}

const AppModuleDetailView: NextPage<AppModuleDashboardViewProps> = ({
                                                                      deploymentUnits,
                                                                      appModule,
                                                                      dataTablePageSize,
                                                                      handleTableSize,
                                                                      handleTablePage,
                                                                      qualityGates,
                                                                      configMutate,
                                                                      dashboardConfig
                                                                    }) => {

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            {appModule?.name}
          </h1>
        </div>
      </div>
      {dashboardConfig === undefined ?
        <div className={"grid gap-4 md:grid-cols-1 lg:grid-cols-3"}>
          <Skeleton className={"w-full h-40"}/>
          <Skeleton className={"w-full h-40"}/>
          <Skeleton className={"w-full h-40"}/>
        </div> : <KanbanEnvironmentBoard dashboardConfig={dashboardConfig} configMutate={configMutate}/>}
      <div className={"flex flex-col gap-3"}>
        <div className={"grid gap-4 md:grid-cols-1 lg:grid-cols-3"}>
          {qualityGates === undefined ?
            <>
              <Skeleton className={"w-full h-80"}/>
              <Skeleton className={"w-full h-80"}/>
              <Skeleton className={"w-full h-80"}/>
            </>
            :
            <>
              <QualityGateRatingChart last100QualityGates={qualityGates}/>
              <QualityGateResultChart last100QualityGates={qualityGates}/>
              <QualityGatePercentChart last100QualityGates={qualityGates}/>
            </>
          }
        </div>
        <div className="flex w-full justify-between items-center mt-2">
          <div>
            <h1 className="text-2xl leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
              Deployment units
            </h1>
          </div>
          <Button>
            Add new Deployment unit
          </Button>
        </div>
        {deploymentUnits === undefined ? <div className={"flex flex-col gap-3"}>
          <Skeleton className="h-4 w-[250px]"/>
          <Skeleton className="h-6 w-full"/>
          <Skeleton className="h-6 w-full"/>
          <div className={"flex justify-end"}>
            <Skeleton className="h-4 w-[100px]"/>
          </div>
        </div> : <DeploymentUnitsDataTable
          data={deploymentUnits.page}
          columns={columns}
          pageCount={deploymentUnits.pageCount}
          pageSize={dataTablePageSize}
          pageNumber={deploymentUnits.pageNumber}
          handleTableSize={handleTablePage}
          handleTablePage={handleTableSize}
        />}
      </div>
    </div>
  )
}

export default AppModuleDetailView