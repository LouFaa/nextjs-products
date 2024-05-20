import React from "react";
import styles from "./loading.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}></div>
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
};

export default LoadingScreen;
