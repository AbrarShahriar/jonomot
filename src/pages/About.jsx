import React from "react";
import styles from "./About.module.scss";
import wave from "../assets/about-wave.svg";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { PiLinkSimpleFill } from "react-icons/pi";
import Member from "../components/Member";

const team = [
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
  {
    name: "আরেফিন আহমেদ",
    qualification: "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/profile.php?id=100008444586562",
    profilePic: "https://avatars.githubusercontent.com/u/60544231?v=4",
  },
];

export default function About() {
  return (
    <div className={styles.about}>
      <header>
        <h1>আমাদের পরিচয়</h1>
      </header>
      <img src={wave} alt="wave" />

      <div className={styles.about_container}>
        <div className={styles.card}>
          <img
            src="https://avatars.githubusercontent.com/u/60544231?v=4"
            alt="Arefin"
          />
          <h1>আরেফিন আহমেদ</h1>
          <p>কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয়</p>
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/thearefinahmed/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
            <a target="_blank" href="https://github.com/TheArefinAhmed">
              <FaGithubSquare />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100008444586562"
            >
              <FaFacebookSquare />
            </a>
            <a target="_blank" href="https://github.com/TheArefinAhmed">
              <PiLinkSimpleFill />
            </a>
          </div>
        </div>
        <div className={styles.card}>
          <img
            src="https://avatars.githubusercontent.com/u/68944030?v=4"
            alt="Arefin"
          />
          <h1>আবরার শাহরিয়ার</h1>
          <p>কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং, ব্র্যাক বিশ্ববিদ্যালয় </p>
          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/abrar-shahriar-kabir/"
              target="_blank"
            >
              <FaLinkedin />
            </a>
            <a target="_blank" href="https://github.com/AbrarShahriar">
              <FaGithubSquare />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/abrar.shahriar.kabir/"
            >
              <FaFacebookSquare />
            </a>
            <a target="_blank" href="https://abrarshahriar.com/">
              <PiLinkSimpleFill />
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.team}>
        <h1>রিভিউয়ার টীম</h1>
        <div className={styles.members}>
          {team.map((el, i) => (
            <Member
              link={el.link}
              name={el.name}
              profilePic={el.profilePic}
              qualification={el.qualification}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
