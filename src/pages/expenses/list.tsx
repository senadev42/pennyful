import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import {
  IResourceComponentsProps,
  useNavigation,
  GetManyResponse,
  useMany,
  useDelete,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";

import { useOne } from "@refinedev/core";

export const ExpenseList: React.FC<IResourceComponentsProps> = () => {
  const { mutate: deleteExpense } = useDelete();
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "date",
        accessorKey: "date",
        header: "Date",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleDateString(undefined, {
            timeZone: "UTC",
          });
        },
      },
      {
        id: "amount",
        accessorKey: "amount",
        header: "Price",
        cell: function render({ getValue }) {
          const price = Number(getValue<any>());
          return `$${price.toFixed(2)}`;
        },
      },
      {
        id: "category_id",
        header: "Category",
        accessorKey: "category_id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          const category = meta.categoryData?.data?.find(
            (item) => item.id == getValue<any>()
          );

          return category?.name ?? "Loading...";
        },
      },
      {
        id: "note",
        accessorKey: "note",
        header: "Note",
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
                  show("expenses", getValue() as string);
                }}
              >
                <FaEye />
              </button>
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
                  deleteExpense({
                    resource: "expenses",
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

  const { data: categoryData } = useMany({
    resource: "categories",
    ids: tableData?.data?.map((item) => item?.category_id) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <div className="p-4 h-[85vh]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Expenses</h1>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => create("expenses")}
        >
          Create
        </button>
      </div>
      <hr className="my-2 "></hr>
      <div className="max-w-full ">
        <table className="w-full">
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2 text-left">
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="my-2"></hr>
      {/* Control Buttons */}
      <div className="mt-4">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold  p-1 mx-2 rounded"
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-1 mx-2 rounded"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-1 mx-2 rounded"
          onClick={() => nextPage()}
          disabled={!getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold p-1 mx-2 rounded"
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
        >
          {">>"}
        </button>
        <span>
          <strong>
            {" "}
            {getState().pagination.pageIndex + 1} / {getPageCount()}{" "}
          </strong>
        </span>
        <span>
          | Go to Page:{" "}
          <input
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            className="py-1 px-2 border rounded ml-2"
          />
        </span>{" "}
        <select
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="py-1 px-2 border rounded ml-2"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
