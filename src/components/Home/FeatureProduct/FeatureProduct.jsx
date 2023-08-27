import React, { useEffect, useState } from "react";
import { apiGetAllProduct } from "../../../apis/product";
import Item from "./Item";

const FeatureProduct = () => {
  const [featureProduct, setFeatureProduct] = useState(null);
  const fetchProduct = async () => {
    const res = await apiGetAllProduct({ limit: 9, sort: '-totalRating' });
    setFeatureProduct(res.product);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-full">
      <h1 className="font-bold text-xl py-4 border-b-4 border-b-main">
        FEATURED PRODUCTS
      </h1>
      <div className="flex mt-5 w-full flex-wrap">
        {featureProduct?.map((item) => (
          <Item item={item} key={item._id}/>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
