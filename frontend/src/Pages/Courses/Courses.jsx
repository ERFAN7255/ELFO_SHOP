import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import { IoSearchSharp } from "react-icons/io5";
import "./Courses.css";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [coursesFilter, setCoursesFilter] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
        setCoursesFilter(allCourses);
      });
  }, []);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = courses.filter((course) => course.price === 0);
        setCoursesFilter(freeCourses);

        break;
      }
      case "mony": {
        const notFreeCourses = courses.filter((course) => course.price !== 0);
        setCoursesFilter(notFreeCourses);

        break;
      }
      case "first": {
        const reversedCourses = courses.slice().reverse();
        setCoursesFilter(reversedCourses);
        break;
      }
      case "frontend": {
        const frontendCourses = courses.filter(
          (course) => course.categoryID.name === "frontend"
        );
        setCoursesFilter(frontendCourses);
        break;
      }
      case "backend": {
        const backendCourses = courses.filter(
          (course) => course.categoryID.name === "backend"
        );
        setCoursesFilter(backendCourses);
        break;
      }
      default: {
        setCoursesFilter(courses);
      }
    }
  }, [courses, status]);

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value);
    const filteredCourses = courses.filter((course) =>
      course.name.includes(event.target.value)
    );
    setCoursesFilter(filteredCourses);
  };

  return (
    <>
      <Header />
      <Navbar />
      <h1 className="title-courses">دوره ها</h1>
      <div className="all-course-container">
        <div className="all-course-filter">
          <div className="course-filter-menu">
            <span className="all-course-span span-filter">مرتب سازی:</span>
            <span
              className={`all-course-span ${
                status === "all" && "all-course-span-active"
              }`}
              onClick={() => {
                setStatus("all");
              }}
            >
              همه دوره ها
            </span>
            <span
              className={`all-course-span ${
                status === "frontend" && "all-course-span-active"
              }`}
              onClick={() => {
                setStatus("frontend");
              }}
            >
              دوره های فرانت اند
            </span>
            <span
              className={`all-course-span ${
                status === "backend" && "all-course-span-active"
              }`}
              onClick={() => {
                setStatus("backend");
              }}
            >
              دوره های بک اند
            </span>
            <span
              className={`all-course-span ${
                status === "free" && "all-course-span-active"
              }`}
              onClick={() => {
                setStatus("free");
              }}
            >
              دوره های رایگان
            </span>
            <span
              className={`all-course-span ${
                status === "mony" && "all-course-span-active"
              }`}
              onClick={() => {
                setStatus("mony");
              }}
            >
              دوره های پولی
            </span>
          </div>
          <div className="courses-searchBox">
            <input
              type="text"
              className="courses-search-input"
              placeholder="نام محصول را وارد کنید ..."
              value={searchValue}
              onChange={searchValueChangeHandler}
            />
            <button className="icon-searchBox">
              <IoSearchSharp />
            </button>
          </div>
        </div>
        <hr className="all-course-hr" />
        <div className="all-course-boxs">
          {coursesFilter.length === 0 ? (
            <div className="alert alert-danger">
              دوره ای برای نمایش وجود ندارد
            </div>
          ) : (
            <>
              {coursesFilter.map((course) => (
                <CourseBox key={course._id} {...course} />
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
