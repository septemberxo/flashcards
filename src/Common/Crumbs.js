import React from "react";
import { Link } from "react-router-dom";

function Crumbs({ includeHome, navigation }) {
  let navList = includeHome
    ? [
        {
          name: (
            <React.Fragment>
              <span className="oi oi-home" />
              Home
            </React.Fragment>
          ),
          url: "/",
        },
        ...navigation,
      ]
    : navigation;

  navList = navList.map(({ name, url }, index) => {
    if (index === navList.length - 1) {
      return (
        <li key={index} className="breadcrumb-item active" aria-current="page">
          {name}
        </li>
      );
    } else {
      return (
        <Link key={index} to={url} className="breadcrumb-item">
          {name}
        </Link>
      );
    }
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{navList}</ol>
    </nav>
  );
}

export default Crumbs;