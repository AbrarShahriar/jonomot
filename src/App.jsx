import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Post from "./components/Post";
import { LuSendHorizonal } from "react-icons/lu";
import { useStateStore } from "./store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "./firebaseService";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const user = useStateStore((state) => state.user);
  const setUser = useStateStore((state) => state.setUser);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dataPosts = [];
      const dataVotes = [];

      const queryPosts = await getDocs(collection(firebaseDb, "posts"));
      queryPosts.forEach((doc) => {
        dataPosts.push({
          postId: doc.id,
          ...doc.data(),
        });
      });

      setPosts(dataPosts);

      const queryVotes = await getDocs(collection(firebaseDb, "votes"));
      queryVotes.forEach((doc) => {
        dataVotes.push({
          postId: doc.id,
          ...doc.data(),
        });
      });
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.section_1}>
          <button onClick={() => navigate("/about")}>
            আমাদের বেপারে জানুন
          </button>
        </div>
        <div className={styles.section_2}>
          <button>বিস্তারিত নির্দেশনা</button>
          {user ? (
            <img
              onClick={() => {
                signOut(firebaseAuth)
                  .then(() => {
                    setUser(null);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
              src={user.photoURL}
              alt="avatar"
            />
          ) : (
            <FaRegUserCircle
              color="white"
              size={32}
              cursor="pointer"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </header>

      <main className={styles.main}>
        <h2>মতামত সমূহ</h2>
        <div className={styles.posts}>
          {posts.map((post, i) => (
            <Post
              key={i}
              authorName={post.authorName}
              authorPicture={post.authorPicture}
              content={post.content}
              timestamp={post.timestamp.toDate()}
              totalVotes={20}
              voted={true}
            />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.comment}>
          <input type="text" placeholder="আপনার মতামত এখানে লিখুন" />
          <button>
            <LuSendHorizonal size={22} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
