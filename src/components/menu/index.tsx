import { useLogout, useMenu } from "@refinedev/core";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export const Menu: React.FC = () => {
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();

  return (
    <nav className="bg-gray-800  flex flex-col justify-between px-2 m-2 rounded">
      <ul className="flex flex-col mt-8 mx-3">
        {menuItems.map((item) =>
          item.label == "Dashboards" ? (
            <li key={item.key} className="mt-4 mb-5">
              <NavLink
                to={item.route}
                className="text-gray-300 hover:text-white py-2 px-4 font-medium "
              >
                Home
              </NavLink>
              <hr className="bg-white mt-4"></hr>
            </li>
          ) : (
            <li key={item.key} className="mb-4">
              <NavLink
                to={item.route}
                className="text-gray-300 hover:text-white py-2 px-4 font-medium "
              >
                {item.label}
              </NavLink>
            </li>
          )
        )}
      </ul>

      {/* <button
        className="bg-teal-500 hover:bg-teal-700 text-white font-medium py-2 px-4  mt-auto mb-5"
        onClick={() => logout()}
      >
        Logout
      </button> */}
    </nav>
  );
};
