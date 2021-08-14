import firebase from "@/utils/firebase";
import useUser from "@/utils/useUser";
import Link from "next/link";
const Page = ({ name, creator, creatorName, profileImage, error }) => {
  const { user } = useUser();
  if (error) {
    return <div>404</div>;
  }
  return (
    <div className={"flex flex-col items-center text-center"}>
      {user && creator === user.uid && (
        <Link href={`/${name}/edit`}>
          <a
            className={
              "bg-primary-300 px-2 py-1 rounded-md hover:scale-110 duration-150 my-4"
            }
          >
            Edit your page
          </a>
        </Link>
      )}
      <img
        src={profileImage}
        alt={`${creatorName}'s image`}
        className={"h-48 w-48 rounded-full border-primary-200 border-4"}
      />
      <h1 className={"text-3xl mt-4 font-bold"}>{creatorName}</h1>
      <h2 className={"text-xl mt-2 text-gray-700"}>@{name}</h2>
    </div>
  );
};

export default Page;

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = async ({ params }) => {
  const db = firebase.database();
  const currentPageKey = await db
    .ref(`pageNames/${params.pagename}`)
    .once("value")
    .then((snap) => snap.val());
  if (!currentPageKey) {
    return {
      props: {
        error: true,
      },
    };
  }
  const pageInfo = await db
    .ref(`pages/${currentPageKey}`)
    .once("value")
    .then((snap) => snap.val());
  return {
    props: {
      error: false,
      ...pageInfo,
    },
  };
};
