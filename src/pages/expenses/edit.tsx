import React from "react";
import {
  useNavigation,
  IResourceComponentsProps,
  useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const ExpenseEdit: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const expensesData = queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: expensesData?.category_id,
    optionLabel: "name",
  });

  React.useEffect(() => {
    setValue("category_id", expensesData?.category_id?.id);
  }, [categoryOptions]);

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Expense Edit</h1>
        <div>
          <button
            onClick={() => {
              list("expenses");
            }}
          >
            Expenses
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label>
            <span style={{ marginRight: "8px" }}>Id</span>
            <input
              disabled
              type="number"
              {...register("id", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.id?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Amount</span>
            <input
              type="number"
              {...register("amount", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.amount?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Category</span>
            <select
              placeholder="Select category"
              {...register("category_id", {
                required: "This field is required",
              })}
            >
              {categoryOptions?.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>
              {(errors as any)?.category_id?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Date</span>
            <input
              {...register("date", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.date?.message as string}
            </span>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Note</span>
            <input
              type="text"
              {...register("note", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.note?.message as string}
            </span>
          </label>
          <div>
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};
