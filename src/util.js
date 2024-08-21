export const handleError = (error) => {
  console.log(error.code);

  switch (error.code) {
    case "auth/email-already-in-use":
      alert("ইমেলটি ইতিমধ্যেই ব্যবহার করা হচ্ছে৷");
      break;

    case "auth/invalid-credential":
      alert("ভুল ইমেল বা পাসওয়ার্ড");
      break;

    default:
      alert("অজানা ত্রুটি ঘটেছে, দয়া করে আবার চেষ্টা করুন");
      break;
  }
};
