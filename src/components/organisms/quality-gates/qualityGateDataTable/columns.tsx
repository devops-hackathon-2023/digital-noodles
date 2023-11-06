import {QualityGateResponse} from "@/utils/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/molecules/DataTable/ColumnHeader";

export const columns: ColumnDef<QualityGateResponse>[] = [
  {
    accessorKey: "versionId",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Version ID"/>
    ),
    cell: ({row}) => <div className="w-[100px]">
      {row.getValue("versionId")}
    </div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Type"/>
    ),
    cell: ({row}) => <div className="w-[200px]">{row.getValue("type")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "result",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Result"/>
    ),
    cell: ({row}) => <div className="w-[200px]">{row.getValue("result")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "rating",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Rating"/>
    ),
    cell: ({row}) => <div className="w-[200px]">{row.getValue("rating")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "createdAt",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Create At"/>
    ),
    cell: ({row}) => <div className="w-[200px]">{row.getValue("createdAt")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
]
