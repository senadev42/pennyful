import { useLogout, useMenu } from "@refinedev/core";
import { NavLink, NavLinkProps } from "react-router-dom";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems } = useMenu();

  return (
    <nav className="bg-gray-800 h-screen flex flex-col justify-between px-2">
      <ul className="flex flex-col mt-8 ">
        {menuItems.map((item) => (
          <li key={item.key} className="mt-4">
            <NavLink
              to={item.route}
              className="text-gray-300 hover:text-white py-2 px-4 font-medium "
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className="bg-teal-500 hover:bg-teal-700 text-white font-medium py-2 px-4  mt-auto mb-5"
        onClick={() => logout()}
      >
        Logout
      </button>
    </nav>
  );
};
