import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebaseService";
import { useStateStore } from "../store";
import { handleError } from "../util";
import ReactGA from "react-ga4";

import bd from "../assets/stroke.png";

export default function Signup() {
  const navigate = useNavigate();
  const setUser = useStateStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/signup",
      title: "Signup",
    });
  }, []);

  const handleSignupClick = async () => {
    setLoading(true);
    // console.log(email, password);

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        setUser(user);

        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setLoading(false);
      });
  };
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1>জনমত</h1>
        <div className={styles.card}>
          <img src={bd} alt="bd map logo" />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ইমেইল"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
          />
          <p>
            আপনার যদি একটি অ্যাকাউন্ট থাকে,{" "}
            <a onClick={() => navigate("/login")}>লগইন করুন</a>
          </p>
          <div className={styles.actions}>
            <button disabled={loading} onClick={handleSignupClick}>
              {loading ? "অপেক্ষা করুন" : "সাইন আপ"}
            </button>
          </div>
        </div>
        <p className={styles.footnote}>
          এই নতুন স্বাধীন বাংলাদেশ এর বিষয়ে আপনার মতামত তুলে ধরতে লগইন করুন
        </p>
      </div>
    </div>
  );
}
