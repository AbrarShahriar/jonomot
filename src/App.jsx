import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Post from "./components/Post";
import { LuSendHorizonal } from "react-icons/lu";
import { useStateStore } from "./store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth, firebaseDb } from "./firebaseService";
import { FaHamburger, FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import defaultUser from "./assets/default-user.jpg";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import { TiThMenu } from "react-icons/ti";
import ReactGA from "react-ga4";
import Avatar from "./components/Avatar";

function App() {
  ReactGA.initialize(import.meta.env.VITE_MEASUREMENT_ID);

  const user = useStateStore((state) => state.user);
  const setUser = useStateStore((state) => state.setUser);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [inputContent, setInputContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home",
    });
  }, []);

  useEffect(() => {
    const dataVotes = [];
    const dataPosts = [];

    onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      // console.log("loading user");

      // console.log("start fetching posts");

      // fetching posts
      const queryPosts = await getDocs(
        query(
          collection(firebaseDb, "posts"),
          where("published", "==", true),
          orderBy("voteCount", "desc")
        )
      );
      queryPosts.forEach((doc) => {
        dataPosts.push({
          postId: doc.id,
          ...doc.data(),
          userVoted: false,
        });
      });

      // console.log("fetched posts (dataPosts)", dataPosts);

      if (firebaseUser) {
        // console.log(firebaseUser);

        setUser(firebaseUser);

        // console.log("start fetching votes");
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
        // console.log("fetched votes (dataVotes)", dataVotes);

        // console.log("BOTH", dataPosts, dataVotes);

        // filter;
        dataVotes.forEach((voteData) => {
          dataPosts.forEach((postData, i) => {
            // console.log(voteData.postId, postData.postId);

            if (voteData.postId == postData.postId) {
              dataPosts[i].userVoted = true;
            }
          });
        });
        setPosts(dataPosts);
      } else {
        // console.log("Not logged in");
        setPosts(dataPosts);
      }

      setLoading(false);
    });
  }, []);

  const handleContentPost = async () => {
    if (!user) {
      return alert("প্রথমে লগইন করুন!!");
    }

    if (!inputContent) {
      return alert("প্রথমে কিছু লিখুন!!");
    }

    try {
      await addDoc(collection(firebaseDb, "posts"), {
        authorId: user.uid,
        authorEmail: user.email,
        content: inputContent,
        voteCount: 0,
        timestamp: serverTimestamp(),
        published: false,
      });
      alert("আপনার মতামত পোস্ট করা হয়েছে, কিছু সময় অপেক্ষা করুন");
    } catch (e) {
      console.error(e);
      alert("কিছু ভুল হয়েছে অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.section_1}>
          <button
            className={styles["button-pc"]}
            onClick={() => navigate("/about")}
          >
            আমাদের বেপারে জানুন
          </button>
          <div className={styles.menu}>
            <Menu
              menuButton={
                <MenuButton>
                  <TiThMenu size={16} />
                </MenuButton>
              }
              transition
            >
              <MenuItem onClick={() => navigate("/about")}>
                আমাদের বেপারে জানুন
              </MenuItem>
              <MenuItem>বিস্তারিত নির্দেশনা</MenuItem>

              {user && (
                <MenuItem
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
                  লগআউট
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
        <div className={styles.section_2}>
          <button className={styles["button-pc"]}>বিস্তারিত নির্দেশনা</button>
          {user && (
            <button
              className={styles["button-pc"]}
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
              লগআউট
            </button>
          )}
          {user ? (
            <Avatar inverted text={user.email} />
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
          {loading
            ? "Loading..."
            : posts.map((post, i) => (
                <Post
                  key={i}
                  postId={post.postId}
                  authorEmail={post.authorEmail}
                  content={post.content}
                  timestamp={post.timestamp}
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
