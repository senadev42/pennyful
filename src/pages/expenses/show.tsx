import React from "react";
import {
  useShow,
  useResource,
  useNavigation,
  IResourceComponentsProps,
  useOne,
} from "@refinedev/core";

export const ExpenseShow: React.FC<IResourceComponentsProps> = () => {
  const { edit, list } = useNavigation();
  const { id } = useResource();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Expense Show</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => list("expenses")}
          >
            Expenses
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => edit("expenses", id ?? "")}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="max-w-sm flex flex-row p-4">
        <div className="mr-4">
          <div className="my-4">
            <h5 className="font-bold">Amount</h5>
            <div>{record?.amount ?? ""}</div>
          </div>
          <div className="my-4">
            <h5 className="font-bold">Category</h5>
            <div>
              {categoryIsLoading ? (
                <span>Loading...</span>
              ) : (
                <span>{categoryData?.data?.name}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="my-4">
            <h5 className="font-bold">Date</h5>
            <div>
              {new Date(record?.date).toLocaleString(undefined, {
                timeZone: "UTC",
              })}
            </div>
          </div>
          <div className="my-4">
            <h5 className="font-bold">Note</h5>
            <div>{record?.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
