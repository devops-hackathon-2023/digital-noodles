import {useSas} from "@/utils/SasContext";
import {PageResponseAppModuleResponse, SortType} from "@/utils/types";
import PlatformLayout from "@/components/layouts/platformLayout";
import AppModulesView from "@/components/organisms/app-modules/appModulesView";
import useSWR from "swr";
import {flyIoFetcher} from "@/utils/lib/fetcher";
import {useCallback, useEffect, useState} from "react";

const AppModules = () => {
  const {
    selectedSas
  } = useSas();

  const [dataTableSize, setDataTableSize] = useState(10)
  const [dataTablePage, setDataTablePage] = useState(0)
  const [dataTableSorting, setDataTableSorting] = useState(SortType.ASC)

  const {
    data: pageAppModules,
    mutate
  } = useSWR<PageResponseAppModuleResponse>(() => selectedSas ? `sases/${selectedSas?.id}/app-modules?page=${dataTablePage}&size=${dataTableSize}&order=${dataTableSorting}` : "", flyIoFetcher)

  const handleDataTablePage = useCallback((page: number) => {
    setDataTablePage(page)
  }, [])

  const handleDataTableSize = useCallback((size: number) => {
    setDataTableSize(size)
  }, [])

  const handleDataTableSort = useCallback((sort:SortType)=>{
    setDataTableSorting(sort)
  },[])

  useEffect(() => {
    mutate()
  }, [dataTablePage, dataTableSize])

  return (
    <PlatformLayout>
      <AppModulesView
        pageAppModules={pageAppModules}
        handleDataTableSort={handleDataTableSort}
        dataTablePageSize={dataTableSize}
        handleTableSize={handleDataTableSize}
        handleTablePage={handleDataTablePage}/>
    </PlatformLayout>
  )
}

export default AppModules