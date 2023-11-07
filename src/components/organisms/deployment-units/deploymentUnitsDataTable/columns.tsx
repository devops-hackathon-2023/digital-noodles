import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Link from "next/link";
import {Button} from "@/components/atoms/button";
import {Github} from "lucide-react";
import {DeploymentUnitResponse} from "@/utils/types";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "@/components/ui/use-toast";

export const columns: ColumnDef<DeploymentUnitResponse>[] = [
  {
    accessorKey: "name",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Name"/>
    ),
    cell: ({row}) => <div className="w-[200px]">
      <Link href={`/deployment-units/${row.getValue("id")}`}>
        {row.getValue("name")}
      </Link>
    </div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "language",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Language"/>
    ),
    cell: ({row}) => <div className="w-[100px]">{row.getValue("language")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
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
    enableHiding: true,
  },
  {
    accessorKey: "repositoryUrl",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Repository"/>
    ),
    cell: ({row}) => <div className="w-[100px]">
      <Link href={row.getValue("repositoryUrl")} target={"_blank"}>
        <Button variant={"link"}>
          <Github className={'mr-2'}/>
          Repository
        </Button>
      </Link>
    </div>,
    enableSorting: false,
    enableHiding: true,
  },
]
