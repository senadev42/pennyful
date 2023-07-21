import React from "react";
import {
  useShow,
  useResource,
  useNavigation,
  IResourceComponentsProps,
  useMany,
} from "@refinedev/core";

export const BudgetShow: React.FC<IResourceComponentsProps> = () => {
  const { edit, list } = useNavigation();
  const { id } = useResource();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: record?.category_ids || [],
    queryOptions: {
      enabled: !!record && !!record?.category_ids?.length,
    },
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Budget Show</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
            onClick={() => list("budgets")}
          >
            Budgets
          </button>
          <button
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
            onClick={() => edit("budgets", id ?? "")}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div className="mt-6 bg-zinc-100 p-2 rounded">
          <h5 className="font-bold">Name</h5>
          <div>{record?.name}</div>
        </div>
        <div className="flex flex-row p-4 gap-x-4">
          <div>
            <div className="mt-6">
              <h5 className="font-bold">Description</h5>
              <div>{record?.description}</div>
            </div>
            <div className="mt-6">
              <h5 className="font-bold">Total Budget</h5>
              <div>{record?.total_budget ?? ""}</div>
            </div>
          </div>

          <div>
            <div className="mt-6">
              <h5 className="font-bold">Start Date</h5>
              <div>
                {new Date(record?.start_date).toLocaleDateString(undefined, {
                  timeZone: "UTC",
                })}
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-bold">End Date</h5>
              <div>
                {new Date(record?.end_date).toLocaleDateString(undefined, {
                  timeZone: "UTC",
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 px-10">
            <h5 className="font-bold">Category</h5>
            <ul>
              {categoryIsLoading && record?.category_ids?.length ? (
                <li>Loading...</li>
              ) : (
                <>
                  {record?.category_ids?.length ? (
                    categoryData?.data?.map((category: any) => (
                      <li key={category?.name}>{category?.name}</li>
                    ))
                  ) : (
                    <></>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetShow;
