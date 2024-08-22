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
import ReactGA from "react-ga4";
import Avatar from "./Avatar";
import { extractNameFromEmail } from "../util";

export default function Post({
  postId,
  content,
  timestamp,
  voted,
  authorEmail,
  totalVotes,
}) {
  const user = useStateStore((state) => state.user);
  const [votedState, setVotedState] = useState(voted);
  const [totalVotesState, setTotalVotesState] = useState(totalVotes);
  const handleVoteClick = async () => {
    if (!user) {
      return alert("ভোট দিতে লগইন করুন");
    }

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

      ReactGA.event({
        category: "Vote",
        action: "Click",
        label: `DOWNVOTE: ${content}`,
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

      ReactGA.event({
        category: "Vote",
        action: "Click",
        label: `UPVOTE: ${content}`,
      });
    }
  };

  return (
    <div className={styles.post}>
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
      <div className={styles.user_info_vote}>
        <Avatar text={authorEmail} />
        <p>{extractNameFromEmail(authorEmail)}</p>
        <div className={styles.vote}>
          <p>ভোট {Number(totalVotesState).toLocaleString("bn")}</p>
          <button onClick={handleVoteClick}>
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
