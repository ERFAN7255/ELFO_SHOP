import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import domPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import "./ArticleInfo.css";

export default function ArticleInfo() {
  const { articlename } = useParams();
  const [articleDetails, setArticleDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articlename}`)
      .then((res) => res.json())
      .then((data) => setArticleDetails(data));
  }, [articlename]);

  return (
    <>
      <Header />
      <Navbar />

      <div className="info-container">
        <div className="info-img-container">
          <img
            className="info-img"
            src={`http://localhost:4000/courses/covers/${articleDetails.cover}`}
            alt=""
          />
        </div>
        <div className="about-course">
          <h1>{articleDetails.title}</h1>
          <p className="about-course-desc">{articleDetails.description}</p>
          <p
            className="about-course-price text-light"
            dangerouslySetInnerHTML={{
              __html: domPurify.sanitize(articleDetails.body),
            }}
          ></p>
          <div className="about-course-btn-container">
            <Link
              to={"/articles"}
              className="about-course-btn-back"
              onClick={() => window.scrollTo(0, 0)}
            >
              برگشت
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
