import React, { useEffect, useState } from "react";
import CourseBox from "../../../CourseBox/CourseBox";

export default function LastCourses(props) {
  const [lastCourses, setLastCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => setLastCourses(allCourses));
  }, []);
  return (
    <>
      <div className="off-box">
        <div className="off-info">
          <h4 className="pishnahad">{props.titleBox}</h4>
          {props.showAll ? (
            <button className="see-all2">
              {props.showAll}
              <img className="flesh" src="/images/arrow-left.png" alt="" />
            </button>
          ) : null}
        </div>
        <div className="items">
          {/* {props receive map} */}
          {lastCourses.slice(0, 4).map((course) => (
            <CourseBox {...course} key={course._id} />
          ))}
        </div>
      </div>
    </>
  );
}
