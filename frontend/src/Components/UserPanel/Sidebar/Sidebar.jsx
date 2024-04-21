import React, { useContext } from "react";
import Button from "../../Form/Button";
import swal from "sweetalert";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/authContext";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userLogout = () => {
    swal({
      title: "آیا میخواهید خارج بشوید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        localStorage.removeItem("user");
        swal({
          title: "با موفقیت خارج شدید",
          icon: "success",
          buttons: "تایید",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <div className="profile col-3">
      <div className="profile-content">
        <img className="profile-img" src="/images/Unknown-Profile.jpg" alt="" />
        <h2 className="profile-name">{authContext.userInfos.name}</h2>
        <p className="profile-info">
          شماره تلفن : {authContext.userInfos.phone}
        </p>
        <hr className="profile-line" />
        <Button className="profile-exit" onClick={userLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          خروج از حساب
        </Button>
      </div>
      <div className="buy-menu">
        <ul className="buy-menu-container">
          <li>
            <NavLink to={"profile"} onClick={() => window.scrollTo(140, 140)}>
              <i className="fa-solid fa-user"></i>
              حساب کاربری
            </NavLink>
          </li>
          <li>
            <NavLink to={"orders"} onClick={() => window.scrollTo(140, 140)}>
              <i className="fa-sharp fa-solid fa-bag-shopping"></i>
              سبد خرید
              {authContext.countBuy !== 0 ? (
                <span className="count-Buy m-1">{authContext.countBuy}</span>
              ) : null}
            </NavLink>
          </li>
          <li>
            <NavLink to={"tickets"} onClick={() => window.scrollTo(140, 140)}>
              <i className="fa fa-ticket"></i>تیکت ها
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"edit-profile"}
              onClick={() => window.scrollTo(140, 140)}
            >
              <i className="fa fa-pencil"></i>ویرایش حساب کاربری
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
