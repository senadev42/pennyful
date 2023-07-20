import { IResourceComponentsProps } from "@refinedev/core";
import { HeadlessEditInferencer } from "@refinedev/inferencer/headless";

export const ExpenseEdit: React.FC<IResourceComponentsProps> = () => {
  return <HeadlessEditInferencer />;
};
