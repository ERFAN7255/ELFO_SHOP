import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/authContext";
import { IoSearchSharp } from "react-icons/io5";

import "./Header.css";

export default function Header() {
  const authContext = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const root = document.documentElement;
  const ele = document.querySelector(":root");
  const cs = getComputedStyle(ele);

  const searchHandler = (e) => {
    if (searchValue.length) {
      navigate(`/search/${searchValue}`);
      window.scrollTo(40, 40);
    } else {
      navigate(null);
    }
  };

  const keyDownSearch = (event) => {
    if (event.code === "Enter") {
      if (searchValue.length) {
        navigate(`/search/${searchValue}`);
        window.scrollTo(40, 40);
      } else {
        navigate(null);
      }
    }
  };

  const changeTheme = () => {
    let item = document.querySelector(".toggle");
    item.addEventListener("click", () => {
      if (cs.getPropertyValue("--purpleDark-color") === "#8800ff") {
        root.style.setProperty("--purpleDark-color", "#29013d");
        root.style.setProperty("--purpleLite-color", "#82619e");
        root.style.setProperty("--Header-color", "#543b6a");
        localStorage.setItem("theme", "dark");
      } else {
        root.style.setProperty("--purpleDark-color", "#8800ff");
        root.style.setProperty("--purpleLite-color", "#dfbaff");
        root.style.setProperty("--Header-color", "#cf9cff");
        localStorage.setItem("theme", "light");
      }
    });
  };

  window.onload = () => {
    let localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme === "dark") {
      root.style.setProperty("--purpleDark-color", "#29013d");
      root.style.setProperty("--purpleLite-color", "#82619e");
      root.style.setProperty("--Header-color", "#543b6a");
    }
  };

  return (
    <div className="first-header">
      <div className="logo-header">
        <img id="logo-header" src="/images/logo-header.png" alt="" />
      </div>
      <div className="search">
        <input
          className="search-bar"
          type="text"
          placeholder="جستجو محصول"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={keyDownSearch}
        />
        <button className="icon-search" onClick={searchHandler}>
          <IoSearchSharp />
        </button>
      </div>
      <div className="btn-container">
        {authContext.isLoggedIn ? (
          <Link
            to={"/my-account/profile"}
            className="btn-header-login"
            onClick={() => window.scrollTo(40, 40)}
          >
            <i className="user fa-solid fa-user"></i>
            {authContext.userInfos.name}
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="btn-header-login"
            onClick={() => window.scrollTo(40, 40)}
          >
            <i className="user fa-solid fa-user"></i>
            ورود | ثبت نام
          </Link>
        )}
        {authContext.isLoggedIn && (
          <Link
            to={"/my-account/orders"}
            className="btn-header-buy"
            onClick={() => window.scrollTo(40, 40)}
          >
            <i className="btn-by fa-solid fa-cart-shopping"></i>
            سبد خرید<span className="countBuy">{authContext.countBuy}</span>
          </Link>
        )}
        <label htmlFor="switch" className="toggle" onClick={changeTheme}>
          <input type="checkbox" className="input" id="switch" />
          <div className="icon icon--moon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="32"
              height="32"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="icon icon--sun">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="32"
              height="32"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
            </svg>
          </div>
        </label>
      </div>
    </div>
  );
}
