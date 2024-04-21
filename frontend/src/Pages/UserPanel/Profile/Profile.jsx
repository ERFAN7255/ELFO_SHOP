import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/authContext";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(authContext.userInfos.name);
    setPhone(authContext.userInfos.phone);
    setUsername(authContext.userInfos.username);
    setEmail(authContext.userInfos.email);
  }, [
    authContext.userInfos.email,
    authContext.userInfos.name,
    authContext.userInfos.phone,
    authContext.userInfos.username,
  ]);

  return (
    <div className="orders-container col-8">
      <h1>اطلاعات حساب کاربری</h1>
      <div className="profile-container">
        <label htmlFor="name">نام و نام خانوداگی :</label>
        <p className="profile-info-p">{name}</p>
        <label htmlFor="username">نام کاربری :</label>
        <p className="profile-info-p">{username}</p>
        <label htmlFor="email">ایمیل :</label>
        <p className="profile-info-p">{email}</p>
        <label htmlFor="phone">شماره تلفن :</label>
        <p className="profile-info-p">{phone}</p>

        <Link
          onClick={() => window.scrollTo(140, 140)}
          to={"/my-account/edit-profile"}
          className="bg-warning text-black w-75"
        >
          ویرایش پروفایل
        </Link>
      </div>
    </div>
  );
}
