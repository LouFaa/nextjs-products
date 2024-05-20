"use client";
import React from "react";
import styles from "./product.module.css";

const ProductComponent = ({ data }) => {
  const { rate, count } = data.rating;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h1>{data.title}</h1>
          <span className={styles.cat}>{data.category}</span>
        </div>
        <p className={styles.description}>{data.description}</p>
        <div className={styles.pricing}>
          <div className={styles.ratingContainer}>
            <div className={styles.starRating}>
              {[...Array(5)].map((star, index) => {
                const starClass =
                  index < Math.round(rate)
                    ? styles.filledStar
                    : styles.emptyStar;
                return (
                  <span key={index} className={`${styles.star} ${starClass}`}>
                    &#9733;
                  </span>
                );
              })}
            </div>
            <div className={styles.ratingDetails}>
              <span className={styles.rate}>{rate.toFixed(1)}</span>
              <span className={styles.count}>{`(${count} reviews)`} </span>
            </div>
          </div>
          <span className={styles.btn}>
            <p>{data.price}</p> BUY NOW
          </span>
        </div>
      </div>
      <div className={styles.image}>
        <img title={data.title} alt={data.title} src={data.image} />
      </div>
    </div>
  );
};

export default ProductComponent;
