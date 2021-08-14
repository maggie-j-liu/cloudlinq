import useUser from "@/utils/useUser";
import Link from "next/link";
const Navbar = () => {
  const { user, logout } = useUser();
  return (
    <nav className={"bg-gray-100 h-16 sticky w-full top-0 px-16"}>
      <div
        className={"h-full flex items-center justify-between max-w-5xl mx-auto"}
      >
        <Link href={"/"}>
          <a>Cloudlinq</a>
        </Link>
        {user ? (
          <button onClick={() => logout()}>Sign Out</button>
        ) : (
          <Link href={"/sign-in"}>
            <a>Sign In</a>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
