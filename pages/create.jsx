import Link from "next/link";
import { useState } from "react";
import firebase from "@/utils/firebase";
import useUser from "@/utils/useUser";
const Create = () => {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const validRegex = /^[a-zA-Z0-9-]+$/;
  const validateUsername = () => {
    if (username.length > 0 && !validRegex.test(username)) {
      setError(
        "Usernames may only contain alphanumeric characters and dashes."
      );
    } else {
      setError("");
    }
  };
  const createPage = async () => {
    if (!!error) {
      return;
    }
    const db = firebase.database();
    const key = db.ref("pages").push({
      name: username,
    }).key;
    await db.ref(`users/${user.uid}/pages`).update({
      [key]: username,
    });
    setUsername("");
  };
  if (!user) {
    return null;
  }
  return (
    <div className={"flex flex-col items-center gap-8 mt-16"}>
      <h1 className={"text-4xl font-bold text-center"}>
        Create your own <span className={"text-primary-500"}>Cloudlinq</span>{" "}
        page!
      </h1>
      <label className="flex flex-col items-center gap-4 w-max">
        <p className={"text-xl"}>Choose your username</p>
        <input
          type="text"
          className={`w-72 mx-auto input-box ${
            error ? "!border-red-400 !ring-red-400" : ""
          }`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={validateUsername}
        />
        <p className={"text-sm text-red-400"}>{error.length > 0 && error}</p>
      </label>
      <button
        className={
          "disabled:bg-gray-400 disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-500 text-white text-xl px-2 py-1 rounded-md"
        }
        disabled={!!error}
        onClick={() => createPage()}
      >
        Create!
      </button>
      <p>
        Your page will appear at{" "}
        <Link href={`/${username}`}>
          <a className={"hover:font-bold"}>
            <span className={"wavy"}>cloudlinq.co/</span>
            {username ? (
              <span className={"text-primary-600 wavy"}>{username}</span>
            ) : (
              <span className={"text-gray-500 wavy"}>{"<your-username>"}</span>
            )}
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Create;
