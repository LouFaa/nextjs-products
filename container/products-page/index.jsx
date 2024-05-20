"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/common/productCard";
import styles from "./products.module.css";

const ProductsComponent = ({ data, categories }) => {
  const [filtredData, setFiltredData] = useState(data);
  const [categorie, setCategorie] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSelectChange = (e) => {
    setCategorie(e.target.value);
  };

  const handleFilter = (filterByCat = []) => {
    const datafilter = filterByCat.length > 0 ? filterByCat : data;
    const newfilter = datafilter.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFiltredData(newfilter);
  };

  useEffect(() => {
    if (categorie === "") {
      handleFilter();
    } else {
      handleFilter(data.filter((item) => item.category === categorie));
    }
  }, [categorie, searchInput]);

  return (
    <div className={styles.container}>
      <h1>Products page</h1>
      <div className={styles.search}>
        <div className={`${styles["search-wrapper"]} ${styles.cf}`}>
          <input
            type="text"
            placeholder="Search here..."
            required=""
            onChange={(e) => handleInputChange(e)}
          />
          <button type="submit">Search</button>
        </div>
        {categories.length > 0 && (
          <div>
            <select
              className={styles.select}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="" hidden>
                Categories
              </option>
              <option value="">All</option>

              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className={styles.products}>
        {filtredData.length > 0 ? (
          filtredData.map((item) => (
            <Link href={`/products/${item.id}`}>
              <ProductCard key={item.id} data={item} />
            </Link>
          ))
        ) : (
          <span>No data</span>
        )}
      </div>
    </div>
  );
};

export default ProductsComponent;
