import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { IoSearchSharp } from "react-icons/io5";
import CourseBox from "../../Components/CourseBox/CourseBox";
import { useNavigate, useParams } from "react-router-dom";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import "./Search.css";

export default function Search() {
  const { value } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allData) => {
        setArticles(allData.allResultArticles);
        setCourses(allData.allResultCourses);
        console.log(allData);
      });
  }, [value]);  

  const searchHandler = () => {
    if (searchValue.length) {
      navigate(`/search/${searchValue}`);
    } else {
      navigate(null);
    }
  };

  const keyDownSearchHandler = (e) => {
    if (e.code === "Enter") {
      navigate(`/search/${searchValue}`);
    } else {
      navigate(null);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="search-container">
        <div>
          <div className="search search-bar-search">
            <input
              className="search-bar search-bar-searchpage-input"
              type="text"
              placeholder="جستجو محصول"
              defaultValue={value}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={keyDownSearchHandler}
            />
            <button
              className="icon-search icon-search-searchpage"
              onClick={searchHandler}
            >
              <IoSearchSharp />
            </button>
          </div>
        </div>
        <h1 className="search-title-course">دوره ها</h1>
        <div className="all-course-boxs">
          {courses.length === 0 ? (
            <div className="alert alert-warning">
              دوره ای برای نمایش این سرچ وجود ندارد
            </div>
          ) : (
            <>
              {courses.map((course) => (
                <CourseBox {...course} />
              ))}
            </>
          )}
        </div>
        <h1 className="search-title-course">مقاله ها</h1>

        <div className="all-course-boxs">
          {articles.length === 0 ? (
            <div className="alert alert-warning">
              مقاله ای برای نمایش این سرچ وجود ندارد
            </div>
          ) : (
            <>
              {articles.map((course) => (
                <ArticleBox {...course} />
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
