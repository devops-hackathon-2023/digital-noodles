import {useSas} from "@/utils/SasContext";
import {PageResponseAppModuleResponse} from "@/utils/types";
import PlatformLayout from "@/components/layouts/platformLayout";
import AppModulesView from "@/components/organisms/app-modules/appModulesView";
import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";

const AppModules = () => {
  const {
    selectedSas
  } = useSas();

  const {data: pageAppModules} = useSWR<PageResponseAppModuleResponse>(`sases/${selectedSas?.id}/app-modules`, flyIoFetcher)

  return (
    <PlatformLayout>
      <AppModulesView pageAppModules={pageAppModules}/>
    </PlatformLayout>
  )
}

export default AppModules