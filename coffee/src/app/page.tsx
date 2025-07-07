"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "./components/productcard";
import CategoryFilter from "./components/categories";
import SearchBar from "@/app/components/searchbar";
import Heading from "@/app/components/heading";

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

interface StoreData {
  name: string;
  city: string;
  address: string;
  ownerName: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const storeInformation: StoreData = {
    name: "Coffee Store",
    city: "Odessa, ON",
    address: "3 Mockjave St, Toronto, ON, CA, M5R 2T5",
    ownerName: "Lola and Coco",
  };

  // Safely calculate unique categories from products using useMemo
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    try {
      return [...new Set(products.map((p) => p.category))];
    } catch (error) {
      console.error("Error calculating categories:", error);
      return [];
    }
  }, [products]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error("Products data is not an array:", data);
          setProducts([]);
          setFilteredProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [search, products, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Header Image */}
      <Image
        src="/images/heading.png"
        alt="Header"
        width={1920}
        height={285}
        layout="responsive"
        className="w-full h-auto object-cover"
      />

      {/* Store Heading */}
      <Heading storeData={storeInformation} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <nav className="flex justify-start gap-8 mb-8 border-b border-gray-200">
          <a
            href="#"
            className="font-semibold text-gray-800 border-b-2 border-blue-600 pb-3"
          >
            Products
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 pb-3">
            Photos
          </a>
        </nav>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No products found
              </div>
            ) : (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                style={{ display: "grid", gridTemplateRows: "repeat(3,1fr)" }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
