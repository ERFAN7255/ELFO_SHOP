import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const [courseName, setCourseName] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourseName(allCourses);
      });
  }, []);
  return (
    <div className="footer">
      <div className="heading">
        <h2 style={{ margin: "20px" }}>
          ELFO<sup>™</sup>
        </h2>
      </div>
      <div className="content">
        <div className="services">
          <h4 className="text-warning">درباره ما</h4>
          <p>ERFAN.NABOUREH</p>
        </div>
        <div className="social-media">
          <h4 className="text-warning">دسترسی سریع</h4>
          {courseName.slice(0, 4).map((course) => (
            <Link
              to={`/course/${course.shortName}`}
              onClick={() => window.scrollTo(140, 140)}
              key={course._id}
            >
              <p>{course.name}</p>
            </Link>
          ))}
        </div>
        <div className="links">
          <h4 className="text-warning">لینک های مفید</h4>
          <p>
            <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
              صفحه اصلی
            </Link>
          </p>
          <p>
            <Link to="/courses" onClick={() => window.scrollTo(0, 0)}>
              دوره ها
            </Link>
          </p>
          <p>
            <Link to={"/articles"} onClick={() => window.scrollTo(0, 0)}>
              مقاله ها
            </Link>
          </p>
          <p>
            <Link to={"/my-account/profile"} onClick={() => window.scrollTo(0, 0)}>
              پنل کاربری
            </Link>
          </p>
        </div>
        <div className="details">
          <h4 className="address text-warning">شبکه های اجتماعی</h4>
          <p>
            <a href="https://github.com/ERFAN7255" target="blank">
              <i className="fab fa-github"></i> Github
            </a>
          </p>
          <p>
            <a
              href="https://www.instagram.com/erfan.nbre?igsh=NDlteHYxNnJwdWoz"
              target="blank"
            >
              <i className="fab fa-instagram"></i> instagram
            </a>
          </p>
          <h4 className="mobile text-warning">Mobile</h4>
          <p>
            <p href="#">9052083383 (98+)</p>
          </p>
          <h4 className="mail text-warning">Email</h4>
          <p>
            <p>naboureh.1385@gmail.com</p>
          </p>
        </div>
      </div>
    </div>
  );
}
