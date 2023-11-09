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
  useReactTable
} from "@tanstack/react-table";
import * as React from "react";
import {useState} from "react";
import DataTable from "@/components/molecules/DataTable/DataTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
}


const SshKeysDataTable: DataTableProps<TData, TValue> = <TData, TValue>({
                                                                          columns,
                                                                          data
                                                                        }) => {
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
    },
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

  const searchByParams = {
    key: "title",
    placeholder: "Search by title..."
  };

  return (
    <DataTable
      table={table}
      columns={columns}
      handleTablePage={() => {
      }}
      handleTableSize={() => {
      }}
      searchByParams={searchByParams}
    />
  )
}

export default SshKeysDataTable