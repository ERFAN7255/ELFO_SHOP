import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import CourseBox from "../../../CourseBox/CourseBox";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import ArticleBox from "../../../ArticleBox/ArticleBox";

export default function LastArticles(props) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => setArticles(allArticles));
  }, []);
  return (
    <div className="off-box">
      <div className="off-info">
        <h4 className="pishnahad">{props.titleBox}</h4>
        {props.showAll ? (
          <Link
            className="see-all2"
            to={"/articles"}
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
          {articles.map((article) => (
            <SwiperSlide key={article._id} className="mySwiperChild">
              <ArticleBox {...article} isSlider={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
