import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import * as React from "react";
import {qualityGateRatings, qualityGateResults, qualityGateTypes} from "@/utils/types";
import DataTable from "@/components/molecules/DataTable/DataTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  handleTablePage: (page: number) => void,
  handleTableSize: (size: number) => void,
  pageCount: number,
  pageSize: number,
  pageNumber: number,
}


export function QualityGateDataTable<TData, TValue>({
                                                      columns,
                                                      data,
                                                      handleTablePage,
                                                      handleTableSize,
                                                      pageSize,
                                                      pageNumber,
                                                      pageCount
                                                    }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageSize: pageSize,
        pageIndex: pageNumber
      }
    },
    manualPagination:true,
    pageCount: pageCount,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const searchByParams = {
    key: "versionId",
    placeholder: "Search by id..."
  };

  return (
    <DataTable
      filters={[
        {
          title: "Rating",
          column: "rating",
          options: qualityGateRatings
        },
        {
          title: "Result",
          column: "result",
          options: qualityGateResults
        },
        {
          title: "Type",
          column: "type",
          options: qualityGateTypes
        },
      ]}
      table={table}
      columns={columns}
      handleTablePage={handleTablePage}
      handleTableSize={handleTableSize}
      searchByParams={searchByParams}
    />
  )
}

export default QualityGateDataTable