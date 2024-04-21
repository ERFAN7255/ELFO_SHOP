import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link, json, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import AuthContext from "../../Context/authContext";
import "./CourseInfo.css";

export default function CourseInfo() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState([]);
  const { courseName } = useParams();

  useEffect(() => {
    getCourseDetails();
  }, [courseName]);

  const getCourseDetails = () => {
    fetch(`http://localhost:4000/v1/courses/${courseName}`)
      .then((res) => res.json())
      .then((Data) => {
        setCourseDetails(Data);
      });
  };

  const buyCourse = (courseID, coursePrice) => {
    if (authContext.isLoggedIn) {
      if (courseDetails.price === 0) {
        swal({
          title: "آیا از ثبت نام در دوره اطمینان دارید؟",
          icon: "warning",
          buttons: ["نه", "آره"],
        }).then((result) => {
          if (result) {
            fetch(
              `http://localhost:4000/v1/courses/${courseDetails._id}/register`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: courseDetails.price,
                }),
              }
            ).then((res) => {
              if (res.ok) {
                swal({
                  title: "ثبت نام با موفقیت انجام شد",
                  icon: "success",
                  buttons: "اوکی",
                }).then(() => {
                  getCourseDetails();
                });
              }
            });
          }
        });
      } else {
        swal({
          title: "آیا از ثبت نام در دوره اطمینان دارید؟",
          icon: "warning",
          buttons: ["نه", "آره"],
        }).then((result) => {
          if (result) {
            swal({
              title: "در صورت داشتن کد تخفیف وارد کنید:",
              content: "input",
              buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
            }).then((code) => {
              if (code === null) {
                fetch(
                  `http://localhost:4000/v1/courses/${courseDetails._id}/register`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("user")).token
                      }`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      price: courseDetails.price,
                    }),
                  }
                ).then((res) => {
                  if (res.ok) {
                    swal({
                      title: "ثبت نام با موفقیت انجام شد",
                      icon: "success",
                      buttons: "اوکی",
                    }).then(() => {
                      getCourseDetails();
                    });
                  }
                });
              } else {
                fetch(`http://localhost:4000/v1/offs/${code}`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${
                      JSON.parse(localStorage.getItem("user")).token
                    }`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    course: courseDetails._id,
                  }),
                })
                  .then((res) => {
                    if (res.status == 404) {
                      swal({
                        title: "کد تخفیف معتبر نیست",
                        icon: "error",
                        buttons: "ای بابا",
                      });
                    } else if (res.status == 409) {
                      swal({
                        title: "کد تخفیف قبلا استفاده شده :/",
                        icon: "error",
                        buttons: "ای بابا",
                      });
                    } else {
                      return res.json();
                    }
                  })
                  .then((code) => {
                    fetch(
                      `http://localhost:4000/v1/courses/${courseDetails._id}/register`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("user")).token
                          }`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          price:
                            courseDetails.price -
                            (courseDetails.price * code.percent) / 100,
                        }),
                      }
                    ).then((res) => {
                      if (res.ok) {
                        swal({
                          title: "ثبت نام با موفقیت انجام شد",
                          icon: "success",
                          buttons: "اوکی",
                        }).then(() => {
                          getCourseDetails();
                        });
                      }
                    });
                  });
              }
            });
          }
        });
      }
    } else {
      swal({
        title:
          "برای خریداری این دوره ابتدا ثبت نام و یا وارد حساب کاربری خود شوید!",
        icon: "warning",
        buttons: ["بستن", "رفتن به صفحه ورود"],
      }).then((result) => {
        if (result) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="info-container">
        <div className="info-img-container">
          <img
            className="info-img"
            src={`http://localhost:4000/courses/covers/${courseDetails.cover}`}
            alt=""
          />
        </div>
        <div className="about-course">
          <h1>{courseDetails.name}</h1>
          <p className="about-course-desc">{courseDetails.description}</p>
          <p className="about-course-price">
            وضعیت:{" "}
            {(courseDetails.status = "start" ? "درحال برگذاری" : "تکمیل شده")}
          </p>
          <p className="about-course-price">
            قیمت:{" "}
            {courseDetails.price === 0
              ? "رایگان"
              : (
                  courseDetails.price *
                  (courseDetails.discount / 100)
                ).toLocaleString() + " تومان"}
          </p>
          <div className="about-course-btn-container">
            {courseDetails.isUserRegisteredToThisCourse ? (
              <button className="about-course-btn-buy">
                محصول در سبد خرید شما موجود است
              </button>
            ) : (
              <button
                className="about-course-btn-buy"
                onClick={() =>
                  buyCourse(courseDetails._id, courseDetails.price)
                }
              >
                ثبت سفارش
              </button>
            )}
            <Link
              to={"/"}
              className="about-course-btn-back"
              onClick={() => window.scrollTo(0, 0)}
            >
              برگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
