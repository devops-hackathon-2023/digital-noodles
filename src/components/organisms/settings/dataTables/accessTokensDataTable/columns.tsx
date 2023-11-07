"use client"


import {AppModuleResponse} from "@/utils/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Link from "next/link";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from "@/components/ui/use-toast";

export const columns: ColumnDef<AppModuleResponse>[] = [
  {
    accessorKey: "tokenName",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Token name"/>
    ),
    cell: ({row}) => <div className="w-[100px]">
      {row.getValue("tokenName")}
    </div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "scopes",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Scopes"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      {row.getValue("scopes")}
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
