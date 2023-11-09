import {PageResponseAppModuleResponse, SortType} from "@/utils/types";
import {NextPage} from "next";
import {AppModulesDataTable} from "@/components/organisms/app-modules/appModuleDataTable/appModulesDataTable";
import {columns} from "@/components/organisms/app-modules/appModuleDataTable/columns";
import {Button} from "@/components/atoms/button";
import {Skeleton} from "@/components/atoms/skeleton";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface AppModuleDetailViewProps {
  pageAppModules?: PageResponseAppModuleResponse,
  handleTablePage: (page: number) => void,
  handleTableSize: (size: number) => void,
  handleDataTableSort: (sort: SortType) => void,
  dataTablePageSize: number
}

const AppModulesView: NextPage<AppModuleDetailViewProps> = ({
                                                              pageAppModules,
                                                              handleTablePage,
                                                              handleTableSize,
                                                              handleDataTableSort,
                                                              dataTablePageSize
                                                            }) => {

  if (!pageAppModules) {
    return (
      <div className="relative flex flex-col gap-5">
        <div className="flex w-full justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              App modules
            </h1>
          </div>
          <Button>
            Add new app modules
          </Button>
        </div>
        <div className={"flex flex-col gap-3"}>
          <Skeleton className="h-4 w-[250px]"/>
          <Skeleton className="h-6 w-full"/>
          <Skeleton className="h-6 w-full"/>
          <div className={"flex justify-end"}>
            <Skeleton className="h-4 w-[100px]"/>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            App modules
          </h1>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              Add new app modules
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Github import</DialogTitle>
              <DialogDescription>
                github projects
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <AppModulesDataTable
        data={pageAppModules.page}
        columns={columns}
        pageCount={pageAppModules.pageCount}
        pageSize={dataTablePageSize}
        pageNumber={pageAppModules.pageNumber}
        handleTableSize={handleTablePage}
        handleTablePage={handleTableSize}
        handleDataTableSort={handleDataTableSort}
      />
    </div>
  )
}

export default AppModulesView