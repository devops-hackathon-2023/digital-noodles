import {ColumnDef} from "@tanstack/react-table";
import {DeploymentResponse} from "@/utils/types";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";
import Image from "next/image";
import {Check, X} from "lucide-react";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "@/components/ui/use-toast";

export const columns: ColumnDef<DeploymentResponse>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={"ID"}/>
        ),
        cell: ({ row }) => <div className="w-[200px] cursor-copy">
            <CopyToClipboard text={row.getValue("id")} onCopy={() => {
                toast({
                    title: "Copied to clipboard!",
                    description: row.getValue("id"),
                })
            }}>
                <div>{row.getValue("id")}</div>
            </CopyToClipboard>
        </div>,
    },{
        accessorKey: "deployer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={"Deployer"}/>
        ),
        cell: ({ row }) => <div className={"flex align-center gap-2 items-center"}>
            <Image src={"/morty.jpg"} alt={"Jira logo"} width={30} height={15} className={"rounded-full"}/>
            {row.getValue("deployer")}
        </div>
    },
    {
    accessorKey: "changeTicketId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={"Jira ID"}/>
        ),
        cell: ({ row }) => <div className={"flex align-center gap-2"}>
            <Image src={"/jira.svg"} alt={"Jira logo"} width={10} height={10}/>
            {row.getValue("changeTicketId")}
        </div>
    },{
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title={"Status"}/>
        ),
        cell: ({ row }) => <div className={"flex align-center"}>
            { row.getValue("status") === "SUCCESS" && <div className={"bg-green-600 rounded-full p-1"}><Check className={"w-4 h-4"}/></div> }
            { row.getValue("status") === "FAILED" && <div className={"bg-red-600 rounded-full p-1"}><X className={"w-4 h-4"}/></div> }
        </div>
    },
]