import Slider from 'react-slick'
import React from "react";
import Product from './Product';

const CustomSlider = ({productsData, isNew, isSale, widthImg, slidesToShow}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {productsData?.map((item) => (
        <Product
          isSale={isSale}
          key={item?._id}
          productData={item}
          isNew={isNew}
          widthImg={widthImg}
        />
      ))}
    </Slider>
  );
};

export default CustomSlider;
