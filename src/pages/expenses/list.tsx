import { IResourceComponentsProps } from "@refinedev/core";
import { HeadlessListInferencer } from "@refinedev/inferencer/headless";

export const ExpenseList: React.FC<IResourceComponentsProps> = () => {
  return <HeadlessListInferencer />;
};
