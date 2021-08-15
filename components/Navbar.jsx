import useUser from "@/utils/useUser";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <nav
      className={
        "bg-transparent backdrop-filter backdrop-blur-lg backdrop-saturate-150 h-16 fixed w-full top-0 px-16 z-10"
      }
    >
      <div
        className={"h-full flex items-center justify-between max-w-5xl mx-auto"}
      >
        <div className={"gap-12 flex items-center"}>
          <Link href={"/"}>
            <a
              className={
                "font-bold text-[#4aaee2] group hover:wavy flex items-center gap-4"
              }
            >
              <div
                className={
                  "bg-white rounded-full w-max flex items-center justify-center"
                }
              >
                <Image src={logo} height={48} width={48} />
              </div>
              Cloudlinq
              {/* <span className={"text-[#4AAEE2] group-hover:underline"}>C</span>
              <span className={"text-[#A3E1FF] group-hover:underline"}>l</span>
              <span className={"text-[#4AAEE2] group-hover:underline"}>o</span>
              <span className={"text-[#A3E1FF] group-hover:underline"}>u</span>
              <span className={"text-[#4AAEE2] group-hover:underline"}>d</span>
              <span className={"text-[#A3E1FF] group-hover:underline"}>l</span>
              <span className={"text-[#4AAEE2] group-hover:underline"}>i</span>
              <span className={"text-[#A3E1FF] group-hover:underline"}>n</span>
              <span className={"text-[#4AAEE2] group-hover:underline"}>q</span>*/}
            </a>
          </Link>
          <Link href={"/create"}>
            <a className={"hover:wavy"}>Create</a>
          </Link>
          <Link href={"/explore"}>
            <a className={"hover:wavy"}>Explore</a>
          </Link>
        </div>
        {user ? (
          <div className={"flex gap-4 items-center"}>
            <div className={"flex gap-2 items-center"}>
              <img
                src={user.photoURL}
                alt={`${user.displayName}'s picture`}
                className={"h-9 w-9 rounded-full"}
              />
              <span>{user.displayName}</span>
            </div>
            |
            <button className={"hover:wavy"} onClick={() => logout()}>
              Sign Out
            </button>
          </div>
        ) : (
          <Link href={"/sign-in"}>
            <a className={"hover:wavy"}>Sign In</a>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
