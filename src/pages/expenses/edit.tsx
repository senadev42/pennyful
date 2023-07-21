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
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Expense Edit</h1>
        <div>
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            onClick={() => list("expenses")}
          >
            Expenses
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onFinish)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex flex-col">
          {/* <label className="flex items-center">
            <span className="mr-2">Id</span>
            <input
              disabled
              type="number"
              {...register("id", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label> */}
          <span className="text-red-500 text-sm mb-2">
            {(errors as any)?.id?.message as string}
          </span>
          <label className="flex items-center">
            <span className="mr-2">Amount</span>
            <input
              type="number"
              {...register("amount", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <span className="text-red-500 text-sm mb-2">
            {(errors as any)?.amount?.message as string}
          </span>
          <label className="flex items-center">
            <span className="mr-2">Category</span>
            <select
              placeholder="Select category"
              {...register("category_id", {
                required: "This field is required",
              })}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {categoryOptions?.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <span className="text-red-500 text-sm mb-2">
            {(errors as any)?.category_id?.message as string}
          </span>
        </div>
        <div className="flex flex-col">
          <label className="flex items-center">
            <span className="mr-2">Date</span>
            <input
              {...register("date", {
                required: "This field is required",
              })}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <span className="text-red-500 text-sm mb-2">
            {(errors as any)?.date?.message as string}
          </span>
          <label className="flex items-center">
            <span className="mr-2">Note</span>
            <input
              type="text"
              {...register("note", {
                required: "This field is required",
              })}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <span className="text-red-500 text-sm mb-2">
            {(errors as any)?.note?.message as string}
          </span>
          <div className="flex justify-end">
            <input
              type="submit"
              value="Save"
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
