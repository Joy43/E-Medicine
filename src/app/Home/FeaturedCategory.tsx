'use client'
import { useState } from "react";

type SliderImage = {
  img: string;
};

export const FeaturedCategory: React.FC = () => {
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const sliderImages: SliderImage[] = [
    { img: "https://i.postimg.cc/YCD2QnDT/Antibacterial-Surgical-Mask.png" },
    { img: "https://i.postimg.cc/BQsv3117/Doctor-stethocope.png" },
    { img: "https://i.postimg.cc/8PHzzPRp/Moderna-s-Vaccine.png" },
    { img: "https://i.postimg.cc/kggX63sx/fever-tablet.png" },
    { img: "https://i.postimg.cc/8PHzzPRp/Moderna-s-Vaccine.png" },
  ];

  const prevSlider = () => {
    setCurrentSlider((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const nextSlider = () => {
    setCurrentSlider((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto h-[540px] md:h-[670px] flex flex-col xl:flex-row items-center overflow-hidden gap-5 lg:gap-10 relative">
       
      <div className="absolute w-full h-full flex items-center justify-between z-50 px-5">
        {/* arrow left */}
        <button
          onClick={prevSlider}
          className="flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-4 h-4 md:w-6 md:h-6 icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <path
              fill="#0095FF"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>
        {/* arrow right */}
        <button
          onClick={nextSlider}
          className="flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-4 h-4 md:w-6 md:h-6 icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            transform="rotate(180)"
          >
            <path
              fill="#0095FF"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>
      </div>
      {/* slider container */}
      <div
        className="h-[540px] md:h-[670px] w-2/3 ml-auto relative ease-linear duration-300 flex items-center"
        style={{ transform: `translateX(-${currentSlider * 50}%)` }}
      >
        {/* sliders */}
        {sliderImages.map((slide, inx) => (
          <div
            key={inx}
            className={`${
              currentSlider === inx
                ? "h-[240px] sm:h-[310px] md:h-[480px] lg:h-[580px]"
                : "h-[220px] sm:h-[260px] md:h-[380px] lg:h-[480px] scale-95 opacity-40"
            } min-w-[50%] relative duration-200`}
            style={{ perspective: "200px" }}
          >
            <img
              src={slide.img}
              className="w-full h-full bg-gray-900 rounded-lg duration-300"
              alt={`Slide ${inx + 1}`}
              style={{
                transform: `${
                  currentSlider - 1 === inx
                    ? "rotateY(4deg)"
                    : currentSlider + 1 === inx
                    ? "rotateY(-4deg)"
                    : ""
                }`,
                transformStyle: "preserve-3d",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
