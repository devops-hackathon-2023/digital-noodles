"use client"


import {AppModuleResponse} from "@/utils/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Link from "next/link";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from "@/components/ui/use-toast";

export const columns: ColumnDef<AppModuleResponse>[] = [
  {
    accessorKey: "title",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Title"/>
    ),
    cell: ({row}) => <div className="w-[100px]">
      {row.getValue("title")}
    </div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "key",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Key"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      {row.getValue("key")}
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "usageType",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Usage Type"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      {row.getValue("usageType")}
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Created"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      {row.getValue("created")}
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastUsed",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Last Used"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      {row.getValue("lastUsed")}
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "expires",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Expires"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      {row.getValue("expires")}
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
]
