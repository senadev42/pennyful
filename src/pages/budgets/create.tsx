import React from "react";
import {
  useNavigation,
  IResourceComponentsProps,
  useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const BudgetCreate: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    optionLabel: "name",
  });

  return (
    <div className="p-4 mx-28">
      <div className="flex justify-between ">
        <h1 className="text-xl font-bold">Budget Create</h1>
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
          <label className="flex flex-col">
            <span className="mb-2">Name</span>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
              className="px-4 py-2 border rounded"
            />
            <span className="text-red-500">
              {(errors as any)?.name?.message as string}
            </span>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Description</span>
            <input
              type="text"
              {...register("description", {
                required: "This field is required",
              })}
              className="px-4 py-2 border rounded"
            />
            <span className="text-red-500">
              {(errors as any)?.description?.message as string}
            </span>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Total Budget</span>
            <input
              type="number"
              {...register("total_budget", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="px-4 py-2 border rounded"
            />
            <span className="text-red-500">
              {(errors as any)?.total_budget?.message as string}
            </span>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Start Date</span>
            <input
              {...register("start_date", {
                required: "This field is required",
              })}
              className="px-4 py-2 border rounded"
            />
            <span className="text-red-500">
              {(errors as any)?.start_date?.message as string}
            </span>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">End Date</span>
            <input
              {...register("end_date", {
                required: "This field is required",
              })}
              className="px-4 py-2 border rounded"
            />
            <span className="text-red-500">
              {(errors as any)?.end_date?.message as string}
            </span>
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Category</span>
            <select
              placeholder="Select category"
              {...register("category_ids", {
                required: false,
              })}
              className="px-4 py-2 border rounded"
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
