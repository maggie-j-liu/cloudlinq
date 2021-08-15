import ProfileCard from "@/components/ProfileCard";
import firebase from "@/utils/firebase";
const Explore = ({ pages }) => {
  return (
    <div
      className={"bg-primary-50 text-primary-600 bg-circut py-24 min-h-screen"}
    >
      <section className={"max-w-4xl mx-auto w-full text-gray-900"}>
        <h1 className={"text-4xl font-semibold"}>Explore</h1>
        <h2 className={"text-2xl mt-2"}>
          Discover others' profiles to connect and meet new friends.
        </h2>
        <div className={"grid grid-cols-3 gap-8 mt-16"}>
          {Object.values(pages).map((page) => (
            <ProfileCard page={page} key={page.name} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;

export const getServerSideProps = async () => {
  const db = firebase.database();
  const allPages =
    (await db
      .ref("previews")
      .once("value")
      .then((snap) => snap.val())) ?? {};

  return {
    props: {
      pages: allPages,
    },
  };
};
