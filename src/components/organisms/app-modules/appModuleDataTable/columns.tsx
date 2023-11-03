"use client"


import {AppModuleResponse} from "@/utils/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Link from "next/link";

export const columns: ColumnDef<AppModuleResponse>[] = [
  {
    accessorKey: "name",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Name"/>
    ),
    cell: ({row}) => <div className="w-[100px]">
      <Link href={`/app-modules/${row.getValue("id")}`}>
        {row.getValue("name")}
      </Link>
    </div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="ID"/>
    ),
    cell: ({row}) => <div className="w-[200px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
]
