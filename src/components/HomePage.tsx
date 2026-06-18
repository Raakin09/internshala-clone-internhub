"use client";

import styles from "./HomePage.module.css";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage = () => {
  const slides = [
    {
      title:
        "Find Your Dream Internship",
      color: "#2563eb",
    },
    {
      title: "Grow Your Skills",
      color: "#9333ea",
    },
    {
      title:
        "Connect With Top Companies",
      color: "#0ea5a4",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      {}
      <div className={styles.heading}>
        <h1>
          Make your dream career a
          reality
        </h1>

        <p>
          Trending on InternArea 
        </p>
      </div>

      {}
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
          ]}
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
          className={styles.swiper}
        >
          {slides.map(
            (slide, index) => (
              <SwiperSlide
                key={index}
              >
                <div
                  className={
                    styles.slideCard
                  }
                  style={{
                    background:
                      slide.color,
                  }}
                >
                  {}
                  <div
                    className={
                      styles.pattern
                    }
                  ></div>

                  <h2>
                    {slide.title}
                  </h2>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePage;