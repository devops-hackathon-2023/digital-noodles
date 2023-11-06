"use client"

import {Table} from "@tanstack/react-table"
import {Input} from "@/components/atoms/input";
import {DataTableViewOptions} from "@/components/molecules/DataTable/Options";
import {DataTableFacetedFilter} from "@/components/molecules/DataTable/Filter";

interface Filter {
  column: string,
  title: string,
  options: {
    label: string
    value: string
  }[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  filters?: Filter[]
}

export function Toolbar<TData>({
                                 table,
                                 filters
                               }: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter app modules..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters !== undefined && filters.map((f: Filter, index:number) =>
          (
            <DataTableFacetedFilter
              key={index}
              column={table.getColumn(f.column)}
              title={f.title}
              options={f.options}
            />
          ))}
      </div>
      <DataTableViewOptions table={table}/>
    </div>
  )
}
