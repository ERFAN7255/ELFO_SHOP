import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/category")
      .then((res) => res.json())
      .then((allCategorys) => setCategorys(allCategorys));
  }, []);

  return (
    <div className="last-header">
      <ul className="header-menu">
        <li id="main-page-active">
          <NavLink to={"/"} onClick={() => window.scrollTo(0, 0)}>
            صفحه اصلی
          </NavLink>
        </li>
        <li id="main-page-active">
          <NavLink to={"/courses"} onClick={() => window.scrollTo(140, 140)}>
            دوره ها
          </NavLink>
        </li>
        <li id="main-page-active">
          <NavLink to={"/articles"} onClick={() => window.scrollTo(140, 140)}>
            مقاله ها
          </NavLink>
        </li>
        {categorys.map((category) => (
          <li key={category._id}>
            <a href="#">برنامه نویسی {category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
