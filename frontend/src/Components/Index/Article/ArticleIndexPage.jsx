import React, { useEffect, useState } from "react";
import FirstImgIndex from "../../FirstImgIndex/FirstImgIndex";
import LastCourses from "./LastCourses/LastCourses";
import AllCoursesBox from "./AllCoursesBox/AllCoursesBox";
import "./ArticleIndexPage.css";
import LastArticles from "./LastArticles/LastArticles";

export default function ArticleIndexPage() {
  return (
    <>
      <article>
        <FirstImgIndex />
        <AllCoursesBox titleBox={"دوره ها"} showAll={"دیدن همه"} />
        <LastCourses titleBox={"آخرین دوره ها"} />
        <LastArticles titleBox={"مقاله ها"} showAll={"دیدن همه"} />
      </article>
    </>
  );
}
