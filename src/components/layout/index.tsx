import { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-100 ">
      <div className="flex flex-row min-h-screen">
        <Menu />
        <div className="container mx-auto px-4 py-2">
          <div className="p-2 rounded bg-zinc-200">
            <Breadcrumb />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
