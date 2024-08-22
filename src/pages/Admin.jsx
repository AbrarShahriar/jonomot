import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import {
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../firebaseService";
import PendingPosts from "../components/PendingPosts";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaRegUserCircle } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { useStateStore } from "../store";
import defaultUser from "../assets/default-user.jpg";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const user = useStateStore((state) => state.user);
  const setUser = useStateStore((state) => state.setUser);
  const [userLoggedInLoading, setUserLoggedInLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
      setUserLoggedInLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(
          collection(firebaseDb, "posts"),
          where("published", "==", false),
          orderBy("timestamp", "desc")
        ),
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
    }
  }, [user]);

  const handleAdminAuthenticate = async () => {
    setLoginLoading(true);
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
    setLoginLoading(false);
  };

  if (userLoggedInLoading) {
    return <div className={styles["full-screen"]}>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={styles["full-screen"]}>
        <p>
          Please{" "}
          <span
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/login")}
          >
            login
          </span>{" "}
          to the website using your general account first.
        </p>
      </div>
    );
  }

  if (!adminLoggedIn) {
    return (
      <div className={styles.admin_login}>
        <main>
          <h2>লগইন</h2>
          <div className={styles.inputs}>
            <input
              type="text"
              value={username}
              placeholder="ইউজার নেম"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loginLoading} onClick={handleAdminAuthenticate}>
              {loginLoading ? "অপেক্ষা" : "প্রবেশ"} করুন
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div className={styles.section_1}>
          <div className={styles.menu}>
            <Menu
              menuButton={
                <MenuButton>
                  <TiThMenu size={16} />
                </MenuButton>
              }
              transition
            >
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
          {user && <p>{user.displayName}</p>}
          {user ? (
            <object
              width={32}
              height={32}
              data={user.photoURL}
              type="image/png"
            >
              <img width={32} height={32} src={defaultUser} alt="avatar" />
            </object>
          ) : (
            <FaRegUserCircle color="white" size={32} />
          )}
        </div>
      </header>
      <div className={styles.container}>
        <main>
          <h2>Pending Posts</h2>

          <div className={styles.posts}>
            {pendingPosts.length <= 0 ? (
              <h3>No Pending Posts!</h3>
            ) : (
              pendingPosts.map((post, i) => (
                <PendingPosts
                  authorEmail={post.authorEmail}
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
    </div>
  );
}
