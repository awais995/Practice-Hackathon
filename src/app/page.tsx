"use client"
import React, { useEffect, useState } from 'react';
import { getProducts } from '@/sanity/lib/client';
import { Image } from 'next-sanity/image';


export default function Home(){
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
    <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
            <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={700}
                    height={600}
                    className="w-full h-72 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-1">Price: <span className="font-medium">${product.price}</span></p>
                <p className="text-gray-600 mb-1">
                    Discount: <span className="font-medium">{product.discountPercentage}%</span>
                </p>
                <p className="text-gray-600">Tags: <span className="font-medium">{product.tags.join(', ')}</span></p>
            </div>
        ))}
    </div>
</div>
);
}