import React, { useContext, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/Form/Input";
import swal from "sweetalert";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Validators/rules";
import { useForm } from "../../hooks/useForm";
import Button from "../../Components/Form/Button";
import AuthContext from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      nameRegirster: {
        value: "",
        isValid: false,
      },
      usernameRegirster: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      passwordRegister: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authContext = useContext(AuthContext);

  const userLogin = (event) => {
    event.preventDefault();
    const userData = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    fetch("http://localhost:4000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        authContext.login({}, result.accessToken);
        swal({
          title: "با موفقیت وارد شدید",
          icon: "success",
          buttons: "ورود به پنل",
          successMode: true,
        }).then((value) => {
          navigate("/my-account/profile");
        });
      })
      .catch((err) => {
        swal({
          title: "نام کاربری یا رمز عبور اشتباه است",
          text: "لطفا دوباره تلاش کنید",
          icon: "error",
          buttons: "تلاش دوباره",
          dangerMode: true,
        });
      });
  };

  const userRegister = (event) => {
    event.preventDefault();
    const userRegisterData = {
      name: formState.inputs.nameRegirster.value,
      username: formState.inputs.usernameRegirster.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.passwordRegister.value,
      confirmPassword: formState.inputs.passwordRegister.value,
    };

    fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegisterData),
    })
      .then((res) => res.json())
      .then((Data) => {
        if (Data !== undefined) {
          authContext.login(Data.user, Data.accessToken);
          swal({
            title: "با ثبت نام شدید وارد شدید",
            icon: "success",
            buttons: "ورود به پنل",
            successMode: true,
          })
            .then((value) => {
              navigate("/my-account/profile");
            })
            .catch((err) => {
              swal({
                title: "تمامی مقادیر را به درستی وارد کنید",
                text: "لطفا دوباره تلاش کنید",
                icon: "error",
                buttons: "تلاش دوباره",
                dangerMode: true,
              });
            });
        }
      });
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form">
            <label for="chk" aria-hidden="true">
              ورود
            </label>
            <Input
              element={"input"}
              id="username"
              className="input-login"
              type="text"
              name="username"
              placeholder="نام کاربری"
              required=""
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <Input
              element={"input"}
              className="input-login"
              id="password"
              type="password"
              name="password"
              placeholder="رمز عبور"
              required=""
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <Button
              type="submit"
              onClick={userLogin}
              className={"btn-form-login"}
              // disabled={!formState.isFormValid}
            >
              ورود
            </Button>
          </form>
        </div>

        <div className="register">
          <form className="form">
            <label for="chk" aria-hidden="true">
              ثبت نام
            </label>
            <Input
              element={"input"}
              className="input-login"
              type="text"
              name="nameRegirster"
              id="nameRegirster"
              placeholder="نام و نام خانوادگی"
              required=""
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <Input
              element={"input"}
              className="input-login"
              type="text"
              name="usernameRegirster"
              id="usernameRegirster"
              placeholder="نام کاربری"
              required=""
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <Input
              element={"input"}
              className="input-login"
              type="email"
              name="email"
              id="email"
              placeholder="ایمیل"
              required=""
              validations={[requiredValidator(), emailValidator()]}
              onInputHandler={onInputHandler}
            />
            <Input
              element={"input"}
              className="input-login"
              type="password"
              name="passwordRegister"
              id="passwordRegister"
              placeholder="رمز عبور"
              required=""
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <Input
              element={"input"}
              className="input-login"
              type="number"
              name="phone"
              id="phone"
              placeholder="شماره تماس"
              required=""
              validations={[
                requiredValidator(),
                minValidator(11),
                maxValidator(11),
              ]}
              onInputHandler={onInputHandler}
            />
            <Button
              type="submit"
              className={"btn-form-login"}
              onClick={userRegister}
              // disabled={!formState.isFormValid}
            >
              ثبت نام
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
