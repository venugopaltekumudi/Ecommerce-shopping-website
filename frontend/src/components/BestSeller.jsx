import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Debugging: This will show you exactly what the backend is sending
    console.log("Current Products in State:", products);

    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => {
        // DEFENSIVE CHECK:
        // 1. Checks lowercase 'bestseller' (Boolean or String)
        // 2. Checks camelCase 'bestSeller' (Boolean or String)
        return (
          item.bestseller === true ||
          item.bestseller === "true" ||
          item.bestSeller === true ||
          item.bestSeller === "true"
        );
      });

      console.log("Successfully Filtered Items:", bestProduct);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [products]); // Runs whenever products arrive from the API

  return (
    <div className="my-10">
      <div className="py-8 text-3xl text-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
          Our best sellers are a curated selection of top-rated items that have
          won over shoppers with their quality, style, and value.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          /* Fallback UI if filtering fails */
          <div className="col-span-full py-10 text-center">
            <p className="text-gray-500">
              No bestsellers found. Please check your Admin Panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
