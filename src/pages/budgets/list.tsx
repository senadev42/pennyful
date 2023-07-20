import React, { useEffect, useState } from "react";
import {
  IResourceComponentsProps,
  useNavigation,
  GetManyResponse,
  useMany,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { supabaseClient } from "../../utility/supabaseClient";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export const BudgetList: React.FC<IResourceComponentsProps> = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchTableData = async () => {
      const { data, error } = await supabaseClient
        .from("categories")
        .select("*");
      if (error) {
        console.error(error);
      } else {
        setCategories(data);
      }
    };
    fetchTableData();
  }, []);

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "Name",
      },
      {
        id: "total_budget",
        accessorKey: "total_budget",
        header: "Total Budget",
      },
      {
        id: "start_date",
        accessorKey: "start_date",
        header: "Start Date",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleDateString(undefined, {
            timeZone: "UTC",
          });
        },
      },
      {
        id: "end_date",
        accessorKey: "end_date",
        header: "End Date",
        cell: function render({ getValue }) {
          return new Date(getValue<any>()).toLocaleDateString(undefined, {
            timeZone: "UTC",
          });
        },
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
                  show("budgets", getValue() as string);
                }}
              >
                <FaEye />
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  edit("budgets", getValue() as string);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  deleteExpense({
                    resource: "budgets",
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

  const { data: budgetData } = useMany({
    resource: "categories",
    ids: [].concat(
      ...(tableData?.data?.map((item) => item?.category_ids) ?? [])
    ),
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      budgetData,
    },
  }));

  return (
    <div className="p-4 h-[85vh]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Budgets</h1>
        <button
          className="bg-teal-500  text-white font-bold py-2 px-4 rounded"
          onClick={() => create("budgets")}
        >
          Create
        </button>
      </div>

      <hr className="my-2"></hr>
      <div className="max-w-full ">
        <table className=" w-full">
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
                  <td key={cell.id} className="px-4 py-2 text-gray-600">
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
