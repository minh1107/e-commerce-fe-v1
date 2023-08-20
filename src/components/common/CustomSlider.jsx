import Slider from 'react-slick'
import React from "react";
import Product from '../Product';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
const CustomSlider = ({productsData, isNew, widthImg}) => {
  return (
    <Slider {...settings}>
      {productsData?.map((item) => (
        <Product
          key={item.id}
          productData={item}
          isNew={isNew}
          widthImg={widthImg}
        />
      ))}
    </Slider>
  );
};

export default CustomSlider;
