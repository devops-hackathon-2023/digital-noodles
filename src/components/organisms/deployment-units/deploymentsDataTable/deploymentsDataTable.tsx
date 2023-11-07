import React from 'react';
import {Column, ColumnDef, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import DataTable from "@/components/molecules/DataTable/DataTable";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

function DeploymentsDataTable <TData, TValue> ({
    columns, data
                                               }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel()
    })

    const searchByParams = {
        key: "id",
        placeholder: "Search by id..."
    };

    return (
        <DataTable
            table={table}
            columns={columns}
            handleTablePage={() => {}}
            handleTableSize={() => {}}
            searchByParams={searchByParams}
        />
    );
};

export default DeploymentsDataTable;
