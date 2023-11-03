"use client"

import * as React from "react"
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
  VisibilityState,
} from "@tanstack/react-table"
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

export function DeploymentUnitsDataTable<TData, TValue>({
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

  return (
    <DataTable
      table={table}
      columns={columns}
      handleTablePage={handleTablePage}
      handleTableSize={handleTableSize}
    />
  )
}
