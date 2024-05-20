import React from "react";
import { apiFetch } from "@/utils/api";
import ProductsComponent from "@/container/products-page";

const ProductsPage = async () => {
  const response = await apiFetch("/products");
  const categories = await apiFetch("/products/categories");

  return <ProductsComponent data={response} categories={categories} />;
};

export default ProductsPage;
