import {PageResponseDeploymentUnitResponse} from "@/utils/types";
import {useSas} from "@/utils/SasContext";
import PlatformLayout from "@/components/layouts/platformLayout";
import DeploymentUnitsView from "@/components/organisms/deployment-units/deploymentUnitsView";
import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";

const DeploymentUnits = () => {
  const {
    selectedSas
  } = useSas();

  const {data} = useSWR<PageResponseDeploymentUnitResponse>("/deployment-units", flyIoFetcher)

  return (
    <PlatformLayout>
      <DeploymentUnitsView data={data} selectedSas={selectedSas}/>
    </PlatformLayout>
  )
}

export default DeploymentUnits