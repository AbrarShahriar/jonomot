import React, { useEffect } from "react";
import styles from "./About.module.scss";
import wave from "../assets/about-wave.svg";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { PiLinkSimpleFill } from "react-icons/pi";
import Member from "../components/Member";
import ReactGA from "react-ga4";

const team = [
  {
    name: "মারজুক মুসফি",
    qualification: "ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/marzukmusfi",
    profilePic:
      "https://scontent.fspd5-1.fna.fbcdn.net/v/t39.30808-1/455811753_1018770793254889_7647576871286705138_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHtxPRuVBnihACjawTE3rIq8Love4mJRA3wui97iYlEDezoSm4q__5Af93WZG40Xj4xRKHAfvo4iJSvF71OSrPX&_nc_ohc=zWl9JNkh9m4Q7kNvgGIfXmw&_nc_ht=scontent.fspd5-1.fna&oh=00_AYCqPwvsKMh0wylO344W_-3l4R-MfXX2AxyjyURHtBZwPA&oe=66CD5C10",
  },
  {
    name: "মোহাম্মদ শরীফ",
    qualification: "ব্র্যাক বিশ্ববিদ্যালয়",
    link: "https://www.facebook.com/mohammad.sharif.961993",
    profilePic:
      "https://scontent.fspd5-1.fna.fbcdn.net/v/t39.30808-1/454937932_3165449516924950_3773328714362265547_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFOZgeRxA8_uCUY9w47aYHjvl2jSh8K7Da-XaNKHwrsNj7UMYUwqpkzsvUmzBjLXjMV5kCcL5GmCHJ2FuD9Tiva&_nc_ohc=nQfW6zLnVuUQ7kNvgHFQEpo&_nc_ht=scontent.fspd5-1.fna&oh=00_AYBFxDYMTkYU8sPvr2Ov229sXgW1qcg38mRGV5mFZQL8fg&oe=66CD4E88",
  },
];

export default function About() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/about",
      title: "About",
    });
  }, []);
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
        <h1>রিভিউয়ার টিম</h1>
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
