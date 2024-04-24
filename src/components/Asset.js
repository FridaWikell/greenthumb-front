import React from "react";
import Lottie from "react-lottie";
import spinnerAnimation from "./Spinner.json";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Lottie options={defaultOptions} height={150} width={150} />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
