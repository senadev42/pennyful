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
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Expense Show</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => list("expenses")}>Expenses</button>
          <button onClick={() => edit("expenses", id ?? "")}>Edit</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: "6px" }}>
          <h5>Id</h5>
          <div>{record?.id ?? ""}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Amount</h5>
          <div>{record?.amount ?? ""}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Category</h5>
          <div>
            {categoryIsLoading ? (
              <>Loading...</>
            ) : (
              <>{categoryData?.data?.name}</>
            )}
          </div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Date</h5>
          <div>
            {new Date(record?.date).toLocaleString(undefined, {
              timeZone: "UTC",
            })}
          </div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Note</h5>
          <div>{record?.note}</div>
        </div>
      </div>
    </div>
  );
};
