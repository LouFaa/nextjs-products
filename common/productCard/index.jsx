import React from "react";
import styles from "./product.module.css";

const ProductCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img alt="Product image" src={data.image} title="Product image" />
        <div className={styles.categorie}>
          <p>{data.category}</p>{" "}
        </div>
      </div>
      <div className={styles.content}>
        <p>{data.title}</p>
        <span>{data.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
