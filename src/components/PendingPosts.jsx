import React from "react";
import styles from "./PendingPosts.module.scss";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebaseService";
import { extractNameFromEmail } from "../util";

export default function PendingPosts({
  postId,
  content,
  authorEmail,
  timestamp,
}) {
  const handleAllow = async () => {
    const postRef = doc(firebaseDb, "posts", postId);

    await updateDoc(postRef, {
      published: true,
    });
  };

  const handleDeny = async () => {
    await deleteDoc(doc(firebaseDb, "posts", postId));
  };

  return (
    <div className={styles["pending-post"]}>
      <p className={styles.title}>{content}</p>
      <p className={styles.time}>
        {new Date(timestamp.toDate()).toLocaleDateString("bn", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className={styles.user_info_actions}>
        <p>By {extractNameFromEmail(authorEmail)}</p>
        <div className={styles.action}>
          <button className={styles.allow} onClick={handleAllow}>
            Allow
          </button>
          <button className={styles.deny} onClick={handleDeny}>
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}
