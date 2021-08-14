import firebase from "@/utils/firebase";
import useUser from "@/utils/useUser";
import Link from "next/link";
import getPageInfo from "@/utils/getPageInfo";
import FourOhFour from "@/components/FourOhFour";
const Page = ({ name, creator, creatorName, profileImage, about, error }) => {
  const { user } = useUser();
  if (error) {
    return <FourOhFour />;
  }
  return (
    <div className={"mt-8 flex flex-col w-full max-w-4xl mx-auto"}>
      {user && creator === user.uid && (
        <Link href={`/${name}/edit`}>
          <a
            className={
              "fixed bottom-4 right-9 bg-primary-300 px-2 py-1 rounded-md hover:scale-110 duration-150 my-4"
            }
          >
            Edit your page
          </a>
        </Link>
      )}
      <img
        src={profileImage}
        alt={`${creatorName}'s image`}
        className={
          "self-center h-48 w-48 rounded-full border-primary-200 border-4"
        }
      />
      <h1 className={"self-center text-3xl mt-4 font-bold"}>{creatorName}</h1>
      <h2 className={"self-center text-xl mt-2 text-gray-700"}>@{name}</h2>
      <div className={"mt-8"}>
        <h3 className={"text-xl font-medium wavy"}>About Me</h3>
        <p className={"mt-2 text-lg text-gray-500"}>{about}</p>
      </div>
    </div>
  );
};

export default Page;

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps = async ({ params }) => {
  return {
    props: await getPageInfo(params.pagename),
    revalidate: 60 * 60,
  };
};
