import React from "react";
import styles from "./Member.module.scss";
import { FaFacebookSquare } from "react-icons/fa";

export default function Member({ name, qualification, link, profilePic }) {
  return (
    <div className={styles.member}>
      <img src={profilePic} alt="Profile Picture" />
      <a target="_blank" href={link}>
        <FaFacebookSquare /> {name}
      </a>
      <span>{qualification}</span>
    </div>
  );
}
