import {useRouter} from "next/router";
import {PageResponseDeploymentUnitResponse} from "@/utils/types";
import PlatformLayout from "@/components/layouts/platformLayout";
import AppModuleDashboardView from "@/components/organisms/app-modules/appModuleDashboardView";
import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";

const Index = () => {
  const router = useRouter()
  const appModuleId = router.query.appModuleId

  const {data: deploymentUnits} = useSWR<PageResponseDeploymentUnitResponse>(
    () => appModuleId ? `app-modules/${appModuleId}/deployment-units` : null, flyIoFetcher
  );
  const {data: appModule} = useSWR(() => appModuleId ? `app-modules/${appModuleId}` : null, flyIoFetcher)

  return (
    <PlatformLayout>
      <AppModuleDashboardView deploymentUnits={deploymentUnits} appModule={appModule}/>
    </PlatformLayout>
  )
}

export default Index