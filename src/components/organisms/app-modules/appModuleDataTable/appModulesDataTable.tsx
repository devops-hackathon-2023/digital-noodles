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
} from "@tanstack/react-table"
import * as React from "react";
import {useState} from "react";
import {SortType} from "@/utils/types";
import DataTable from "@/components/molecules/DataTable/DataTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  handleTablePage: (page: number) => void,
  handleTableSize: (size: number) => void,
  handleDataTableSort: (sort: SortType) => void,
  pageCount: number,
  pageSize: number,
  pageNumber: number,
}


export function AppModulesDataTable<TData, TValue>({
                                                     columns,
                                                     data,
                                                     handleTablePage,
                                                     handleTableSize,
                                                     handleDataTableSort,
                                                     pageCount,
                                                     pageSize,
                                                     pageNumber,
                                                   }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageSize: pageSize,
        pageIndex: pageNumber
      }
    },
    manualPagination: true,
    pageCount: pageCount,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <DataTable
      table={table}
      columns={columns}
      handleTablePage={handleTablePage}
      handleTableSize={handleTableSize}
    />
  )
}