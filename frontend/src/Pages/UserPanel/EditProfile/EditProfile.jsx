import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/authContext";
import swal from "sweetalert";
import "./EditProfile.css";

export default function EditProfile() {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const editProfile = () => {
    const userNewInfos = {
      name,
      phone,
      username,
      email,
      password,
    };

    if (password.length === 0 && confirmPassword.length === 0) {
      swal({
        title:
          "کادر رمز عبور و تایید رمز عبور را به درستی و شبیه هم وارد کنید!",
        icon: "warning",
        buttons: "بستن",
      });
    } else {
      fetch(`http://localhost:4000/v1/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
        body: JSON.stringify(userNewInfos),
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "تغییرات با موفقیت انجام شد!",
            icon: "success",
            buttons: "تایید",
          });
        } else {
          swal({
            title: "تمامی مقادیر را به درستی و کامل وارد کنید",
            icon: "error",
            buttons: "تلاش دوباره",
          });
        }
      });
    }
  };

  return (
    <div className="orders-container col-8">
      <h1>ویرایش حساب کاربری</h1>
      <div className="profile-container">
        <label htmlFor="name">نام و نام خانوداگی :</label>
        <input
          type="text"
          id="name"
          defaultValue={name}
          placeholder="نام و نام خاوادگی..."
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="username">نام کاربری :</label>
        <input
          type="text"
          id="username"
          defaultValue={username}
          placeholder="نام کاربری..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="email">ایمیل :</label>
        <input
          type="email"
          id="email"
          defaultValue={email}
          placeholder="ایمیل..."
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="phone">شماره تلفن :</label>
        <input
          type="number"
          id="phone"
          defaultValue={phone}
          placeholder="*********09"
          onChange={(event) => setPhone(event.target.value)}
        />
        <label htmlFor="password">رمز عبور :</label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="رمز عبور..."
        />
        <label htmlFor="confirmPassowrd"> تایید رمز عبور :</label>
        <input
          type="password"
          id="confirmPassowrd"
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="رمز عبور..."
        />
        <button onClick={editProfile}>ذخیره ویرایش</button>
      </div>
    </div>
  );
}
