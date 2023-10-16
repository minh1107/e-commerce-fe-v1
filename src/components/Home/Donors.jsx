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
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
      <div className="flex">
        <img className="m-auto"
          src="https://jumpseller.com/images/learn/create-a-blog/blog.jpg"
          alt=""
        />
      </div>
    </Slider>
  );
};

export default Donors;
