import {AppModuleResponse, PageResponseQualityGateResponse} from "@/utils/types";
import React from "react";
import {Skeleton} from "@/components/atoms/skeleton";
import QualityGateDataTable from "@/components/organisms/quality-gates/qualityGateDataTable/qualityGateDataTable";
import {columns} from "@/components/organisms/quality-gates/qualityGateDataTable/columns";

interface QualityGatesViewProps {
  qualityGates: PageResponseQualityGateResponse,
  dataTablePageSize: number,
  appModule: AppModuleResponse,
  handleTableSize: (size: number) => void,
  handleTablePage: (page: number) => void,
}

const QualityGatesView: React.FC<QualityGatesViewProps> = ({
                                                             qualityGates,
                                                             handleTablePage,
                                                             appModule,
                                                             dataTablePageSize,
                                                             handleTableSize
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
      <div className={"flex flex-col gap-3"}>
        <div className="flex w-full justify-between items-center mt-2">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
              Quality Gates
            </h1>
          </div>
        </div>
        {qualityGates === undefined ?
          <div className={"flex flex-col gap-3"}>
            <Skeleton className="h-4 w-[250px]"/>
            <Skeleton className="h-6 w-full"/>
            <Skeleton className="h-6 w-full"/>
            <div className={"flex justify-end"}>
              <Skeleton className="h-4 w-[100px]"/>
            </div>
          </div> : <QualityGateDataTable
            data={qualityGates.page}
            columns={columns}
            pageCount={qualityGates.pageCount}
            pageSize={dataTablePageSize}
            pageNumber={qualityGates.pageNumber}
            handleTableSize={handleTablePage}
            handleTablePage={handleTableSize}
          />}
      </div>
    </div>
  )
}

export default QualityGatesView