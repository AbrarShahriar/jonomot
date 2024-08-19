import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firebaseDb } from "../firebaseService";
import PendingPosts from "../components/PendingPosts";

export default function Admin() {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firebaseDb, "posts"), where("published", "==", false)),
      (querySnapshot) => {
        setPendingPosts(
          querySnapshot.docs.map((doc) => ({
            postId: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return unsubscribe;
  }, []);

  const handleAdminAuthenticate = async () => {
    const q = query(
      collection(firebaseDb, "moderators"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs[0]) {
      setAdminLoggedIn(true);
    } else {
      alert("Error");
    }
  };

  if (!adminLoggedIn) {
    return (
      <div className={styles.admin_login}>
        <main>
          <h2>Moderator Login</h2>
          <div className={styles.inputs}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAdminAuthenticate}>Authenticate</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <main>
        <h2>Pending Posts</h2>

        <div className={styles.posts}>
          {pendingPosts.length <= 0 ? (
            <h3>No Pending Posts!</h3>
          ) : (
            pendingPosts.map((post, i) => (
              <PendingPosts
                authorName={post.authorName}
                content={post.content}
                postId={post.postId}
                timestamp={post.timestamp}
                key={i}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
