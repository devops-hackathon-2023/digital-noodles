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
import QualityGateRatingChart from "@/components/molecules/qualityGateCharts/qualityGateRatingChart";
import QualityGateResultChart from "@/components/molecules/qualityGateCharts/qualityGateResultChart";
import QualityGatePercentChart from "@/components/molecules/qualityGateCharts/qualityGatePercentChart";
import {Skeleton} from "@/components/atoms/skeleton";
import KanbanEnvironmentBoard from "@/components/organisms/kanbanEnvironmentBoard/kanbanEnvironmentBoard";
import useSWR, {KeyedMutator} from "swr";
import {useSas} from "@/utils/SasContext";
import axiosInstance from "@/utils/lib/axiosInstance";
import axios from "axios";
import {fetcher} from "@/utils/lib/fetcher";

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
    const { selectedSas } = useSas();

    const { data: config } = useSWR(() => selectedSas ? `/api/dashboard-configs?typeId=${selectedSas.id}&dashboardType=SAS` : null, fetcher);

    const pin = () => {
        if(selectedSas && appModule) {
            axios.post(`/api/dashboard-configs/pin?typeId=${selectedSas.id}`, { itemId: appModule?.id, itemType: "APP_MODULE" },
                { withCredentials: true })
        }
    }

    const unpin = () => {
        if(selectedSas && appModule) {
            axios.delete(`/api/dashboard-configs/pin?typeId=${selectedSas.id}&itemId=${appModule.id}&itemType=APP_MODULE`, { withCredentials: true })
        }
    }

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            {appModule?.name}
          </h1>
            <div onClick={pin}>Pin</div>
            <div onClick={unpin}>Unpin</div>
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