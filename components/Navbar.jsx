import useUser from "@/utils/useUser";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <nav className={"bg-gray-100 h-16 sticky w-full top-0 px-16"}>
      <div
        className={"h-full flex items-center justify-between max-w-5xl mx-auto"}
      >
        <div className={"space-x-12"}>
          <Link href={"/"}>
            <a className={"font-bold hover:wavy"}>Cloudlinq</a>
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
