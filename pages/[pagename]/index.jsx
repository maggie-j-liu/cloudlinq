import firebase from "@/utils/firebase";
import useUser from "@/utils/useUser";
import Link from "next/link";
import getPageInfo from "@/utils/getPageInfo";
import FourOhFour from "@/components/FourOhFour";
import Social from "@/components/Social";
import hexToHsl from "hex-to-hsl";
import { FiEdit } from "react-icons/fi";
const Page = ({
  name,
  creator,
  creatorName,
  profileImage,
  about,
  socials = [],
  error,
  color,
}) => {
  const { user } = useUser();
  const hsl = hexToHsl(color);
  //console.log(hsl);
  if (error) {
    return <FourOhFour />;
  }
  return (
    <div className={"pt-24 pb-8 w-full bg-theme-bg min-h-screen"}>
      <div className={"max-w-4xl mx-auto flex flex-col"}>
        {user && creator === user.uid && (
          <Link href={`/${name}/edit`}>
            <a
              className={
                "flex gap-2 items-center fixed bottom-4 right-9 bg-theme-light px-2 py-1 rounded-md hover:scale-110 duration-150 my-4"
              }
            >
              <FiEdit />
              Edit your page
            </a>
          </Link>
        )}
        <img
          src={profileImage}
          alt={`${creatorName}'s image`}
          className={
            "self-center h-48 w-48 rounded-full border-theme-light border-4"
          }
        />
        <h1 className={"self-center text-3xl mt-4 font-bold"}>{creatorName}</h1>
        <Link href={`/${name}`}>
          <a
            className={
              "self-center text-xl mt-2 text-theme font-medium hover:wavy"
            }
          >
            @{name}
          </a>
        </Link>
        <div className={"mt-8"}>
          <h3 className={"text-xl font-medium wavy mb-2"}>About Me</h3>
          <p className={"text-lg text-gray-700 whitespace-pre-wrap"}>{about}</p>
        </div>
        <div className={"mt-8"}>
          <div className={"flex justify-between"}>
            <h3 className={"text-xl font-medium wavy mb-2"}>My Socials</h3>
          </div>
          <p>You can find me at:</p>
          <div className={"mt-4 space-y-8"}>
            {socials.map(({ link, description }, idx) => (
              <Social key={idx} link={link} description={description} />
            ))}
          </div>
          {socials.length == 0 && <p>Nothing here yet!</p>}
        </div>
        <style jsx>
          {`
            :global(:root) {
              --theme-hue: ${hsl[0]};
              --theme-saturation: ${hsl[1]}%;
              --theme-lightness: ${hsl[2]}%;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Page;

export const getServerSideProps = async ({ params }) => {
  return {
    props: await getPageInfo(params.pagename),
  };
};
