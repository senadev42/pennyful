import React from "react";
import {
  IResourceComponentsProps,
  useDelete,
  useNavigation,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const { mutate: deleteCategory } = useDelete();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: function render({ getValue }) {
          return (
            <div className="flex flex-row flex-wrap gap-4">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  edit("expenses", getValue() as string);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  deleteCategory({
                    resource: "categories",
                    id: getValue() as string,
                  });
                }}
              >
                <FaTrash />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const { edit, show, create } = useNavigation();

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      tableQueryResult: { data: tableData },
    },
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    setPageSize,
    getColumn,
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <div className="p-4 mx-32">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Categories</h1>
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          onClick={() => create("categories")}
        >
          Create
        </button>
      </div>
      <div className="max-w-full">
        <table className="w-1/2">
          {/* <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead> */}
          <tbody className="items-center">
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
