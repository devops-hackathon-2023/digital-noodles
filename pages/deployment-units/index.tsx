import {PageResponseDeploymentUnitResponse} from "@/utils/types";
import {useSas} from "@/utils/SasContext";
import PlatformLayout from "@/components/layouts/platformLayout";
import DeploymentUnitsView from "@/components/organisms/deployment-units/deploymentUnitsView";
import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";
import {useCallback, useEffect, useState} from "react";

const DeploymentUnits = () => {
  const {
    selectedSas
  } = useSas();

  const [dataTableSize, setDataTableSize] = useState(10)
  const [dataTablePage, setDataTablePage] = useState(0)

  const {
    data: pageDeploymentUnits,
    mutate
  } = useSWR<PageResponseDeploymentUnitResponse>(`/deployment-units?page=${dataTablePage}&size=${dataTableSize}`, flyIoFetcher)

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
      <DeploymentUnitsView
        pageDeploymentUnits={pageDeploymentUnits}
        selectedSas={selectedSas}
        handleTableSize={handleDataTableSize}
        handleTablePage={handleDataTablePage}
        dataTablePageSize={dataTableSize}
      />
    </PlatformLayout>
  )
}

export default DeploymentUnits