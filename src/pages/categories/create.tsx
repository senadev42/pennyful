import React from "react";
import { useNavigation, IResourceComponentsProps } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Category Create</h1>
        <div>
          <button
            onClick={() => {
              list("categories");
            }}
          >
            Categories
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
            <span style={{ marginRight: "8px" }}>Name</span>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.name?.message as string}
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
