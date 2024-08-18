import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Post from "./components/Post";
import { LuSendHorizonal } from "react-icons/lu";
import { useStateStore } from "./store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "./firebaseService";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import defaultUser from "./assets/default-user.jpg";

function App() {
  const user = useStateStore((state) => state.user);
  const setUser = useStateStore((state) => state.setUser);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [inputContent, setInputContent] = useState("");

  useEffect(() => {
    const dataVotes = [];
    const dataPosts = [];

    onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      console.log("loading user");

      console.log("start fetching posts");

      // fetching posts
      const queryPosts = await getDocs(collection(firebaseDb, "posts"));
      queryPosts.forEach((doc) => {
        dataPosts.push({
          postId: doc.id,
          ...doc.data(),
          userVoted: false,
        });
      });

      console.log("fetched posts (dataPosts)", dataPosts);

      if (firebaseUser) {
        setUser(firebaseUser);

        console.log("start fetching votes");
        // fetching votes
        const queryVotes = await getDocs(
          query(
            collection(firebaseDb, "votes"),
            where("userId", "==", firebaseUser.uid)
          )
        );
        queryVotes.forEach((doc) => {
          dataVotes.push({
            ...doc.data(),
          });
        });
        console.log("fetched votes (dataVotes)", dataVotes);

        console.log("BOTH", dataPosts, dataVotes);

        // filter;
        dataVotes.forEach((voteData) => {
          dataPosts.forEach((postData, i) => {
            console.log(voteData.postId, postData.postId);

            if (voteData.postId == postData.postId) {
              dataPosts[i].userVoted = true;
            }
          });
        });
        setPosts(dataPosts);
      } else {
        console.log("Not logged in");
        setPosts(dataPosts);
      }
    });
  }, []);

  const handleContentPost = async () => {
    if (!user) {
      return alert("Login First!!");
    }

    if (!inputContent) {
      return alert("Write Something!!");
    }

    try {
      const docRef = await addDoc(collection(firebaseDb, "posts"), {
        authorId: user.uid,
        authorName: user.displayName,
        authorPicture: user.photoURL,
        content: inputContent,
        voteCount: 0,
        timestamp: serverTimestamp(),
      });
      alert("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
          {user && (
            <button
              onClick={() => {
                signOut(firebaseAuth)
                  .then(() => {
                    setUser(null);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}
          {user ? (
            <object data={user.photoURL} type="image/png">
              <img
                src={defaultUser}
                alt="avatar"
                onClick={() => {
                  signOut(firebaseAuth)
                    .then(() => {
                      setUser(null);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              />
            </object>
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
              postId={post.postId}
              authorName={post.authorName}
              authorPicture={post.authorPicture}
              content={post.content}
              timestamp={post.timestamp.toDate()}
              totalVotes={post.voteCount}
              voted={post.userVoted}
            />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.comment}>
          <input
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            type="text"
            placeholder="আপনার মতামত এখানে লিখুন"
          />
          <button disabled={!user || !inputContent} onClick={handleContentPost}>
            <LuSendHorizonal size={22} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
