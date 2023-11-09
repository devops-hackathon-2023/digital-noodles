"use client"


import {AppModuleResponse} from "@/utils/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Link from "next/link";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from "@/components/ui/use-toast";

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
    cell: ({row}) => <div className="w-[200px] cursor-copy">
      <CopyToClipboard text={row.getValue("id")} onCopy={() => {
        toast({
          title: "Copied to clipboard!",
          description: row.getValue("id"),
        })
      }}>
        <div>{row.getValue("id")}</div>
      </CopyToClipboard>
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
]
