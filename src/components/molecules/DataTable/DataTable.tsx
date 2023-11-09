import {Toolbar} from "@/components/molecules/DataTable/Toolbar";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/molecules/Table/table";
import {flexRender} from "@tanstack/react-table";
import {DataTablePagination} from "@/components/molecules/DataTable/PaginationBar";
import * as React from "react";
import {NextPage} from "next";

interface DataTableProps {
  table: any,
  columns: any,
  handleTablePage: (page: number) => void,
  handleTableSize: (size: number) => void,
  filters?: Filter[]
  searchByParams: SearchBy
}

interface SearchBy {
  key: string,
  placeholder: string
}

interface Filter {
  column: string,
  title: string,
  options: {
    label: string
    value: string
  }[]
}

const DataTable: NextPage<DataTableProps> = ({
                                               table,
                                               columns,
                                               handleTablePage,
                                               handleTableSize,
                                               filters,
                                               searchByParams
                                             }) => {
  return (
    <div className="space-y-4">
      <Toolbar table={table} filters={filters} searchBy={searchByParams}/>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        handleTableSize={handleTablePage}
        handleTablePage={handleTableSize}/>
    </div>
  )
}

export default DataTable