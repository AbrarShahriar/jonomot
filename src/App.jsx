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
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import { TiThMenu } from "react-icons/ti";
import ReactGA from "react-ga4";
import Avatar from "./components/Avatar";
import Swal from "sweetalert2";

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

    if (!localStorage.getItem("disclaimer")) {
      Swal.fire({
        icon: "info",
        text: "এটি গণতান্ত্রিক চিন্তার অভিপ্রায়ে নির্মিত। কোনো ব্যক্তি, সম্প্রদায়, জাতি, ধর্ম, পেশা, গোষ্ঠী, লিঙ্গ, সংস্থা, বর্ণ বা রাজনৈতিক দলকে আঘাত করা এই অনুষ্ঠানের উদ্দেশ্য নয়। অংশগ্রহণকারীদের বক্তব্য, আচরণ বা মতামতের দায় সম্পূর্ণ ব্যক্তিগত। এ ক্ষেত্রে এই অনলাইন প্লাটফর্মটি রক্ষণাবেক্ষণের দায়িত্বে নিয়োজিত ব্যক্তিবর্গ কোনোভাবেই তার দায় বা দায়িত্ব গ্রহণ করবে না। জনমত জরিপের গণতান্ত্রিক ফলাফল সংক্রান্ত সিদ্ধান্তের সঙ্গে কর্তৃপক্ষ জড়িত নয় এবং এর জন্য কোনোভাবেই দায়ী নয়া।",
      });
      localStorage.setItem("disclaimer", JSON.stringify(true));
    }
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
      return Swal.fire({
        icon: "info",
        text: "প্রথমে লগইন করুন!!",
        confirmButtonText: "লগইন",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/login");
        }
      });
    }

    if (!inputContent) {
      return Swal.fire({
        icon: "info",
        text: "প্রথমে কিছু লিখুন!!",
      });
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
      return Swal.fire({
        icon: "success",
        text: "আপনার মতামত পোস্ট করা হয়েছে, কিছু সময় অপেক্ষা করুন",
      });
    } catch (e) {
      console.error(e);
      return Swal.fire({
        icon: "error",
        text: "কিছু ভুল হয়েছে অনুগ্রহ করে আবার চেষ্টা করুন",
      });
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
            আমাদের বিষয়ে জানুন
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
                আমাদের বিষয়ে জানুন
              </MenuItem>

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
          <button onClick={handleContentPost}>
            <LuSendHorizonal size={22} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
