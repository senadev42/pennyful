import React from "react";
import {
  useNavigation,
  IResourceComponentsProps,
  useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const BudgetEdit: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, formLoading, queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const budgetsData = queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: budgetsData?.category_ids,
    optionLabel: "name",
  });

  React.useEffect(() => {
    setValue("category_ids", budgetsData?.category_ids?.id);
  }, [categoryOptions]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Budget Edit</h1>
        <div>
          <button
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
            onClick={() => {
              list("budgets");
            }}
          >
            Budgets
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <div className="flex flex-col gap-8">
          <label className="flex gap-4 items-center">
            <span className="mr-2">Id</span>
            <input
              disabled
              type="number"
              {...register("id", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="border rounded py-1 px-2"
            />
            <span className="text-red-500">
              {(errors as any)?.id?.message as string}
            </span>
          </label>
          <label className="flex gap-4 items-center">
            <span className="mr-2">Name</span>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
              className="border rounded py-1 px-2"
            />
            <span className="text-red-500">
              {(errors as any)?.name?.message as string}
            </span>
          </label>
          <label className="flex gap-4 items-center">
            <span className="mr-2">Description</span>
            <input
              type="text"
              {...register("description", {
                required: "This field is required",
              })}
              className="border rounded py-1 px-2"
            />
            <span className="text-red-500">
              {(errors as any)?.description?.message as string}
            </span>
          </label>
          <label className="flex gap-4 items-center">
            <span className="mr-2">Total Budget</span>
            <input
              type="number"
              {...register("total_budget", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="border rounded py-1 px-2"
            />
            <span className="text-red-500">
              {(errors as any)?.total_budget?.message as string}
            </span>
          </label>
          <label className="flex gap-4 items-center">
            <span className="mr-2">Start Date</span>
            <input
              {...register("start_date", {
                required: "This field is required",
              })}
              className="border rounded py-1 px-2"
            />
            <span className="text-red-500">
              {(errors as any)?.start_date?.message as string}
            </span>
          </label>
          <label className="flex gap-4 items-center">
            <span className="mr-2">End Date</span>
            <input
              {...register("end_date", {
                required: "This field is required",
              })}
              className="border rounded py-1 px-2"
            />
            <span className="text-red-500">
              {(errors as any)?.end_date?.message as string}
            </span>
          </label>
          <label className="flex gap-4 items-center">
            <span className="mr-2">Category</span>
            <select
              placeholder="Select category"
              {...register("category_ids", {
                required: false,
              })}
              className="border rounded py-1 px-2"
            >
              {categoryOptions?.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-red-500">
              {(errors as any)?.category_ids?.message as string}
            </span>
          </label>
          <div>
            <input
              type="submit"
              value="Save"
              className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BudgetEdit;
