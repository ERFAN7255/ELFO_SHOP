import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import "./Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => setArticles(allArticles));
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <h1 className="title-courses">مقاله ها</h1>
      <div className="articles-container">
        <div className="all-article-boxs">
          {articles.map((article) => (
            <ArticleBox {...article} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
