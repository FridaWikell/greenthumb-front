import React from "react";
import Lottie from "lottie-react";
import spinnerAnimation from "./Spinner.json";
import styles from "../styles/Asset.module.css";


const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Lottie animationData={spinnerAnimation} loop autoplay style={{ width: 150, height: 150 }} />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
