import React from "react";
import Slider from "react-slick";

const Donors = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="w-[90%] m-auto">
      <div className="flex">
        <img className="mx-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298767/electronicStore/brand/apple_wnwzek.webp"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/vivo_cxslbm.webp"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/samsung_inoss6.avif"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/lg_crxfeq.avif"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/htc_ancxbv.webp"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298767/electronicStore/brand/apple_wnwzek.webp"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/vivo_cxslbm.webp"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/samsung_inoss6.avif"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/lg_crxfeq.avif"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://res.cloudinary.com/dkc3cgreu/image/upload/v1693298766/electronicStore/brand/htc_ancxbv.webp"
          alt=""
        />
      </div>
    </Slider>
  );
};

export default Donors;
