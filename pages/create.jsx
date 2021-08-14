import Link from "next/link";
import { useEffect, useState } from "react";
import firebase from "@/utils/firebase";
import useUser from "@/utils/useUser";
import router from "next/router";
const notAllowedPageNames = ["create", "sign-in"];
const Create = ({ usedNames }) => {
  const { user } = useUser();
  const [pageName, setPageName] = useState("");
  const [error, setError] = useState("");
  const [userPages, setUserPages] = useState([]);
  useEffect(() => {
    if (!user) {
      return;
    }
    const getPages = async () => {
      const db = firebase.database();
      const pages =
        (await db
          .ref(`users/${user.uid}/pages`)
          .once("value")
          .then((snap) => snap.val())) ?? {};
      const pageNames = Object.values(pages);
      setUserPages(pageNames);
    };
    getPages();
  }, [user]);
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
      creatorName: user.displayName,
      profileImage: user.photoURL,
      about: `Hi! I'm ${user.displayName}.`,
    }).key;
    const updates = {};
    updates[`users/${user.uid}/pages/${key}`] = pageName;
    updates[`pageNames/${pageName}`] = key;
    await db.ref().update(updates);
    usedNames.push(pageName);
    setUserPages([...userPages, pageName]);
    setPageName("");
    router.replace(router.asPath, router.asPath, { scroll: false });
  };
  if (!user) {
    return null;
  }
  return (
    <div className={""}>
      <section className={"flex flex-col items-center gap-8 my-16"}>
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
          <Link href={`/${pageName}`} prefetch={false}>
            <a className={"hover:font-bold"}>
              <span className={"wavy"}>cloudlinq.co/</span>
              {pageName ? (
                <span className={"text-primary-600 wavy"}>{pageName}</span>
              ) : (
                <span className={"text-gray-500 wavy"}>
                  {"<your-pagename>"}
                </span>
              )}
            </a>
          </Link>
        </p>
      </section>
      <section className={"bg-gray-100 w-full py-20"}>
        <div className={"max-w-5xl mx-auto"}>
          <h2 className={"text-2xl"}>Your Cloudlinq Pages</h2>
          <div className={"grid grid-cols-3 gap-4 mt-4"}>
            {userPages.map((page) => (
              <Link href={`/${page}`}>
                <a
                  className={
                    "bg-white py-4 px-4 rounded block shadow-md hover:font-medium hover:wavy hover:shadow-xl"
                  }
                >
                  {page}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
