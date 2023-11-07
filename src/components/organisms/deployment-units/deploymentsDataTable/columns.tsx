import {ColumnDef} from "@tanstack/react-table";
import {DeploymentResponse} from "@/utils/types";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Image from "next/image";
import {Check, X} from "lucide-react";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "@/components/ui/use-toast";
import Link from "next/link";

export const columns: ColumnDef<DeploymentResponse>[] = [
  {
    accessorKey: "changeTicketId",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"Jira ID"}/>
    ),
    cell: ({row}) => <div className={"flex align-center gap-2"}>
      <Link href={"/"} target={"_blank"} className={"flex gap-3 items-center"}>
        <Image src={"/jira.svg"} alt={"Jira logo"} width={15} height={15}/>
        {row.getValue("changeTicketId")}
      </Link>
    </div>
  },
  {
    accessorKey: "id",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"ID"}/>
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
  },
  {
    accessorKey: "deployer",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"Deployer"}/>
    ),
    cell: ({row}) => <div className={"flex align-center gap-2 items-center"}>
      <Image src={"/morty.jpg"} alt={"Jira logo"} width={30} height={15} className={"rounded-full"}/>
      {row.getValue("deployer")}
    </div>
  },
  {
    accessorKey: "startedAt",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"Started At"}/>
    ),
    cell: ({row}) => <div className={"flex align-center gap-2 items-center"}>
      {row.getValue("startedAt")}
    </div>
  },
  {
    accessorKey: "finishedAt",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"Finished At"}/>
    ),
    cell: ({row}) => <div className={"flex align-center gap-2 items-center"}>
      {row.getValue("finishedAt")}
    </div>
  },
  {
    accessorKey: "status",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={"Status"}/>
    ),
    cell: ({row}) => <div className={"flex align-center"}>
      {row.getValue("status") === "SUCCESS" &&
          <div className={"bg-green-600 rounded-full p-1"}><Check className={"w-4 h-4"}/></div>}
      {row.getValue("status") === "FAILED" &&
          <div className={"bg-red-600 rounded-full p-1"}><X className={"w-4 h-4"}/></div>}
    </div>
  },
]