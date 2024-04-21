import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CourseBox(props) {
  
  return (
    <div className="course-box">
      <Link
        to={`/course/${props.shortName}`}
        className="Link-direction"
        onClick={() => window.scrollTo(140, 140)}
      >
        <div className="image">
          <img
            className="box-img"
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            alt=""
          />
        </div>
      </Link>

      <div className="text">
        <h4 className="box-title">{props.name}</h4>
        <p className="desc">{props.description}</p>
      </div>
      <div style={{ position: "relative" }} className="mod p-right15">
        <p className="desc2 box-teacher">{props.creator}</p>
      </div>
      <hr style={{ color: "red" }} />
      <div
        className="box-price-child"
        style={{ height: "50px", position: "relative" }}
      >
        <p className="price">
          {" "}
          {props.price === 0
            ? "رایگان"
            : (props.price * (props.discount / 100)).toLocaleString() +
              " تومان"}
        </p>
        <i
          className="fa-solid fa-user-group studentsCourse"
          style={{
            color: "black",
            bottom: "23px",
            marginlLeft: "10px",
          }}
        >
          {props.registers}
        </i>
      </div>
      <div className="info">
        <Link
          to={`/course/${props.shortName}`}
          onClick={() => window.scrollTo(140, 140)}
          className="Link-direction info-link"
        >
          اطلاعات بیشتر
        </Link>
      </div>
    </div>
  );
}
