import React, { useState } from "react";
import styles from "./Post.module.scss";
import { PiArrowFatUpBold, PiArrowFatUpFill } from "react-icons/pi";
import defaultUser from "../assets/default-user.jpg";
import { useStateStore } from "../store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../firebaseService";

export default function Post({
  postId,
  content,
  timestamp,
  voted,
  authorPicture,
  authorName,
  totalVotes,
}) {
  const user = useStateStore((state) => state.user);
  const [votedState, setVotedState] = useState(voted);
  const [totalVotesState, setTotalVotesState] = useState(totalVotes);
  const handleVoteClick = async () => {
    setVotedState(!votedState);

    const postRef = doc(firebaseDb, "posts", postId);
    const voteQuery = query(
      collection(firebaseDb, "votes"),
      where("postId", "==", postId),
      where("userId", "==", user.uid)
    );
    if (votedState) {
      setTotalVotesState((prev) => prev - 1);
      await updateDoc(postRef, {
        voteCount: increment(-1),
      });

      const voteQuerySnapshot = await getDocs(voteQuery);
      voteQuerySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } else {
      setTotalVotesState((prev) => prev + 1);
      await updateDoc(postRef, {
        voteCount: increment(1),
      });
      addDoc(collection(firebaseDb, "votes"), {
        postId: postId,
        userId: user.uid,
      });
    }
  };

  return (
    <div className={styles.post}>
      <p className={styles.title}>{content}</p>
      <p className={styles.time}>
        {new Date(timestamp).toLocaleDateString("bn", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className={styles.user_info_vote}>
        <object data={authorPicture} type="image/png">
          <img src={defaultUser} alt="Stack Overflow logo and icons and such" />
        </object>
        <p>{authorName}</p>
        <div className={styles.vote}>
          <p>ভোট {Number(totalVotesState).toLocaleString("bn")}</p>
          <button disabled={!user} onClick={handleVoteClick}>
            {votedState ? (
              <PiArrowFatUpFill size={20} />
            ) : (
              <PiArrowFatUpBold size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
