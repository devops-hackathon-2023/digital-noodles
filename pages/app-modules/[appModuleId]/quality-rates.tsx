import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import PlatformLayout from "@/components/layouts/platformLayout";
import QualityGatesView from "@/components/organisms/quality-gates/qualityGatesView";

const QualityRates = () => {
  const router = useRouter()
  const appModuleId = router.query.appModuleId

  const [dataTableSize, setDataTableSize] = useState(20)
  const [dataTablePage, setDataTablePage] = useState(0)

  const {
    data: qualityGates,
    mutate
  } = useSWR(() => appModuleId ? `quality-gates?page=${dataTablePage}&size=${dataTableSize}&sort=createdAt&order=desc&appModuleId=${appModuleId}` : null, flyIoFetcher)

  const {data: appModule} = useSWR(() => appModuleId ? `app-modules/${appModuleId}` : null, flyIoFetcher)

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
      <QualityGatesView
        qualityGates={qualityGates}
        dataTablePageSize={dataTableSize}
        handleTableSize={handleDataTableSize}
        handleTablePage={handleDataTablePage}
       appModule={appModule}/>
    </PlatformLayout>
  )
}

export default QualityRates