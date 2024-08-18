import React from "react";
import styles from "./Login.module.scss";
import bd from "../assets/bd.png";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "../firebaseService";
import { useStateStore } from "../store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useStateStore((state) => state.setUser);

  const handleLoginClick = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1>জনমত</h1>
        <img src={bd} alt="bd map logo" />
        <button onClick={handleLoginClick}>
          লগইন <FaGoogle />
        </button>
        <p>
          এই নতুন স্বাধীন বাংলাদেশ এর বেপারে আপনার মতামত তুলে ধরতে লগইন করুন
        </p>
      </div>
    </div>
  );
}
