import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <ul className="breadcrumb flex flex-row text-gray-500 text-md">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <li key={`breadcrumb-${breadcrumb.label}`}>
            {breadcrumb.href ? (
              <Link
                to={breadcrumb.href}
                className={`${
                  isLast ? "" : "hover:text-gray-700"
                } transition-colors duration-300`}
              >
                {breadcrumb.label}
              </Link>
            ) : (
              <span className={`${isLast ? "font-bold" : ""}`}>
                {breadcrumb.label}
              </span>
            )}
            {!isLast && <span className="mx-2">&gt;</span>}
          </li>
        );
      })}
    </ul>
  );
};
