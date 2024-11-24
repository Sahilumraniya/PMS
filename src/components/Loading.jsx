"use client";

import Image from "next/image";
import Logo from "../../public/vercel.svg";

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.container, ...styles.light }}>
        <Image
          alt="logo"
          width={200}
          height={200}
          src={Logo}
          style={styles.logo}
        />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  light: {
    backgroundColor: "#fff",
    color: "#000",
  },
  logo: {
    animation: "spin 2s linear infinite", // Spinning animation
  },
};

export default Loading;
