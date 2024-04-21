import React, { useEffect, useState } from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "../../../CourseBox/CourseBox";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function AllCoursesBox(props) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);

  return (
    <>
      <div className="off-box">
        <div className="off-info">
          <h4 className="pishnahad">{props.titleBox}</h4>
          {props.showAll ? (
            <Link
              className="see-all2"
              to={"/courses"}
              onClick={() => window.scrollTo(0, 0)}
            >
              {props.showAll}
              <img className="flesh" src="/images/arrow-left.png" alt="" />
            </Link>
          ) : null}
        </div>
        <div className="items">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={4}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            loop={true}
            breakpoints={{
              400: {
                slidesPerView: 4,
              },
              750: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 4,
              },
              1700: {
                slidesPerView: 4,
              },
              3100: {
                slidesPerView: 4,
              },
            }}
            className={"mySwiper"}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id} className="mySwiperChild">
                <CourseBox {...course} isSlider={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
