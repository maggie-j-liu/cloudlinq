import Link from "next/link";
import { useState } from "react";
import firebase from "@/utils/firebase";
import useUser from "@/utils/useUser";
const notAllowedPageNames = ["create", "sign-in"];
const Create = ({ usedNames }) => {
  const { user } = useUser();
  const [pageName, setPageName] = useState("");
  const [error, setError] = useState("");
  const validRegex = /^[a-zA-Z0-9-]+$/;
  const validatepageName = () => {
    if (pageName.length > 0 && !validRegex.test(pageName)) {
      setError(
        "Page names may only contain alphanumeric characters and dashes."
      );
    } else if (
      notAllowedPageNames.includes(pageName) ||
      usedNames.includes(pageName)
    ) {
      setError("This page name is in use");
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
      name: pageName,
      creator: user.uid,
    }).key;
    const updates = {};
    updates[`users/${user.uid}/pages/${key}`] = pageName;
    updates[`pageNames/${pageName}`] = true;
    await db.ref().update(updates);
    usedNames.push(pageName);
    setPageName("");
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
        <p className={"text-xl"}>Choose your page's name</p>
        <input
          type="text"
          className={`w-72 mx-auto input-box ${
            error ? "!border-red-400 !ring-red-400" : ""
          }`}
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          onBlur={validatepageName}
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
        <Link href={`/${pageName}`}>
          <a className={"hover:font-bold"}>
            <span className={"wavy"}>cloudlinq.co/</span>
            {pageName ? (
              <span className={"text-primary-600 wavy"}>{pageName}</span>
            ) : (
              <span className={"text-gray-500 wavy"}>{"<your-pagename>"}</span>
            )}
          </a>
        </Link>
      </p>
    </div>
  );
};

export default Create;

export const getServerSideProps = async () => {
  const db = firebase.database();
  const usedNamesMap = await db
    .ref("pageNames")
    .once("value")
    .then((snap) => snap.val());
  const usedNames = Object.keys(usedNamesMap ?? []);

  console.log(usedNames);
  return {
    props: {
      usedNames: usedNames,
    },
  };
};
