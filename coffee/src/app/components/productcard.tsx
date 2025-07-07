"use client";

import React from "react";
import { useState } from "react";
import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  pimage: string;
  dietary: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
return (
  <div className="bg-white rounded-lg p-4 w-full shadow-2xl h-full bg-red-900">
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 shadow-sm hover:shadow-md transition-all"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>
    </div>
    <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
    <div className="flex gap-5 ">
      <img
        className="rounded-full w-[36px] h-[36px] object-cover"
        src={product.pimage}
        alt={product.seller}
      />
      <p className="text-gray-900 text-sm">{product.seller}</p>
    </div>
    <p className="text-gray-900">{product.price}</p>
  </div>
);
};

export default ProductCard;
