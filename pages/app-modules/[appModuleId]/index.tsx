import {useRouter} from "next/router";
import {PageResponseAppModuleResponse, PageResponseDeploymentUnitResponse, SortType} from "@/utils/types";
import PlatformLayout from "@/components/layouts/platformLayout";
import AppModuleDashboardView from "@/components/organisms/app-modules/appModuleDashboardView";
import useSWR from "swr";
import {fetcher, flyIoFetcher} from "@/utils/lib/fetcher";
import {useCallback, useEffect, useState} from "react";

const Index = () => {
  const router = useRouter()
  const appModuleId = router.query.appModuleId

  const [dataTableSize, setDataTableSize] = useState(10)
  const [dataTablePage, setDataTablePage] = useState(0)

  const { data: dashboardConfig } = useSWR(() => router.query.appModuleId ? `/api/dashboard-configs?typeId=${router.query.appModuleId}&dashboardType=APP_MODULE` : null, fetcher);

  const {
    data: deploymentUnits,
    mutate
  } = useSWR<PageResponseDeploymentUnitResponse>(
    () => appModuleId ? `app-modules/${appModuleId}/deployment-units?page=${dataTablePage}&size=${dataTableSize}` : null, flyIoFetcher
  );

  const {data: appModule} = useSWR(() => appModuleId ? `app-modules/${appModuleId}` : null, flyIoFetcher)

  const {data: last100QualityGates} = useSWR(()=>appModuleId ? `quality-gates?page=0&size=20&sort=createdAt&order=desc&appModuleId=${appModuleId}`:null, flyIoFetcher)

  const handleDataTablePage = useCallback((page: number) => {
    setDataTablePage(page)
  }, [])

  const handleDataTableSize = useCallback((size: number) => {
    setDataTableSize(size)
  }, [])


  useEffect(() => {
    mutate()
  }, [dataTablePage, dataTableSize])

  return (
    <PlatformLayout>
      <AppModuleDashboardView
        last100QualityGates={last100QualityGates}
        deploymentUnits={deploymentUnits}
        appModule={appModule}
        dataTablePageSize={dataTableSize}
        handleTableSize={handleDataTableSize}
        handleTablePage={handleDataTablePage}
        dashboardConfig={dashboardConfig}
      />
    </PlatformLayout>
  )
}

export default Index