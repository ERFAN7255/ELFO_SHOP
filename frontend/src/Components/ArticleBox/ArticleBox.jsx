import React from "react";
import "./ArticleBox.css";
import { Link } from "react-router-dom";

export default function ArticleBox(props) {
  return (
    <div className="article-box">
      <Link
        to={`/articles/${props.shortName}`}
        className="Link-direction"
        onClick={() => window.scrollTo(140, 140)}
      >
        <div>
          <img
            className="article-img"
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            alt=""
          />
        </div>
      </Link>

      <div className="text">
        <h4 className="box-title">{props.title}</h4>
        <p className="desc">{props.description}</p>
      </div>
      <div style={{ position: "relative" }} className="mod p-right15">
        <p className="desc2 box-teacher">{props.creator.name}</p>
      </div>
      <hr style={{ color: "red" }} />
      <div className="article-info">
        <Link
          to={`/articles/${props.shortName}`}
          onClick={() => window.scrollTo(140, 140)}
          className="Link-direction info-link"
        >
          اطلاعات بیشتر
        </Link>
      </div>
    </div>
  );
}
