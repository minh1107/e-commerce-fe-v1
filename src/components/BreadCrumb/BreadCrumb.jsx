import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";

const { IoIosArrowForward } = icons;
const BreadCrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadCrumb: category === ':category' ? 'Product' : category },
    { path: "/", breadCrumb: "Home" },
    { path: "/:category/:pid/:title", breadCrumb: title },
  ];
  const breadCrumb = useBreadcrumbs(routes);

  return (
    <div className="text-sm flex xl:w-main md:w-tablet gap-1">
      {breadCrumb
        .filter((item) => item.match.route?.path == item.match.pattern.path)
        .map(({ match }, index, self) => (
          <div key={match.pathname} className="flex items-center gap-1">
            <Link to={match.pathname} className="capitalize last:lowercase last:first-letter:uppercase hover:text-main">
              {match.route?.breadCrumb === ':category' ? 'Product' : match.route?.breadCrumb}
              </Link>{" "}
            {index == self.length - 1 ? "" : <IoIosArrowForward />}
          </div>
        ))}
    </div>
  );
};

export default BreadCrumb;
