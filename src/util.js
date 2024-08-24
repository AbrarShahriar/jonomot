import Swal from "sweetalert2";

export const handleError = (error) => {
  console.log(error.code);

  switch (error.code) {
    case "auth/email-already-in-use":
      return Swal.fire({
        icon: "error",
        text: "ইমেলটি ইতিমধ্যেই ব্যবহার করা হচ্ছে৷",
      });

    case "auth/invalid-credential":
      return Swal.fire({
        icon: "error",
        text: "ভুল ইমেল বা পাসওয়ার্ড",
      });

    default:
      return Swal.fire({
        icon: "error",
        text: "অজানা ত্রুটি ঘটেছে, দয়া করে আবার চেষ্টা করুন",
      });
  }
};

export const extractNameFromEmail = (email) => {
  return email.split("@")[0];
};
