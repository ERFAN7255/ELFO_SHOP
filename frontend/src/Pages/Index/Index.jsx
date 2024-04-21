import React from "react";
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Navbar/Navbar";
import ArticleIndexPage from "../../Components/Index/Article/ArticleIndexPage";
import Footer from "../../Components/Footer/Footer";

export default function Index() {
  return (
    <>
      <Header />
      <Navbar />
      <ArticleIndexPage />
      <Footer />
    </>
  );
}
