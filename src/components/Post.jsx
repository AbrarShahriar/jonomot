import React, { useState } from "react";
import styles from "./Post.module.scss";
import { PiArrowFatUpBold, PiArrowFatUpFill } from "react-icons/pi";

export default function Post({
  content,
  timestamp,
  voted,
  authorPicture,
  authorName,
  totalVotes,
}) {
  const [votedState, setVotedState] = useState(voted);
  const handleVoteClick = () => {
    setVotedState(!votedState);
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
        {/* <object data={authorPicture} type="image/png">
      <img src="https://cdn.sstatic.net/Img/unified/sprites.svg?v=e5e58ae7df45" alt="Stack Overflow logo and icons and such">
    </object> */}
        <p>{authorName}</p>
        <div className={styles.vote}>
          <p>ভোট {Number(totalVotes).toLocaleString("bn")}</p>
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
