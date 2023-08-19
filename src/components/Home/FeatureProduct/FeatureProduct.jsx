import React, { useEffect, useState } from "react";
import { apiGetProduct } from "../../../apis/product";
import Item from "./Item";

const FeatureProduct = () => {
  const [featureProduct, setFeatureProduct] = useState(null);
  const fetchProduct = async () => {
    const res = await apiGetProduct({ totalRating: 4, limit: 9 });
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
          <Item item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
