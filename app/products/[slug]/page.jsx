import React from "react";
import { apiFetch } from "@/utils/api";
import ProductComponent from "@/common/product";

export async function generateStaticParams() {
  const products = await apiFetch("/products");
  return products.map((product) => ({
    slug: product.id.toString(),
  }));
}
const ProductDetails = async ({ params }) => {
  const { slug } = params;

  const products = await apiFetch("/products");

  const product = products.find((item) => item.id.toString() === slug);
  return <ProductComponent data={product} />;
};

export default ProductDetails;
