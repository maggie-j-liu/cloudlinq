import firebase from "@/utils/firebase";
import Link from "next/link";
const Explore = ({ pages }) => {
  return (
    <div
      className={"bg-primary-50 text-primary-600 bg-circut py-24 min-h-screen"}
    >
      <section className={"max-w-4xl mx-auto w-full"}>
        <h1 className={"text-4xl font-semibold"}>Explore</h1>
        <h2 className={"text-2xl mt-2"}>
          Discover others' profiles to connect and meet new friends.
        </h2>
        <div className={"grid grid-cols-3 gap-8 mt-16"}>
          {pages.map((page) => (
            <Link href={`/${page}`} key={page}>
              <a
                className={
                  "bg-white px-4 py-4 rounded hover:shadow-xl hover:font-medium hover:wavy"
                }
              >
                {page}
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;

export const getServerSideProps = async () => {
  const db = firebase.database();
  const allPages = await db
    .ref("pageNames")
    .once("value")
    .then((snap) => snap.val());
  return {
    props: {
      pages: Object.keys(allPages ?? {}),
    },
  };
};
