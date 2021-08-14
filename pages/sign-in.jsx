import useUser from "@/utils/useUser";
import { FcGoogle } from "react-icons/fc";
import processUser from "@/utils/processUser";

const SignIn = () => {
  const { user, signInWithGoogle } = useUser();
  if (user) {
    return null;
  }
  return (
    <div className={"w-full flex justify-center items-start"}>
      <div
        className={
          "bg-gray-50 px-16 py-12 mt-14 flex flex-col items-center gap-6"
        }
      >
        <h1 className={"text-3xl glow font-semibold"}>
          Welcome to <span className={"wavy"}>Cloudlinq</span>!
        </h1>
        <button
          className={
            "bg-white glow flex items-center gap-2 justify-center border-2 border-red-300 px-4 py-2 rounded-md shadow-md hover:shadow-lg"
          }
          onClick={() => signInWithGoogle(processUser)}
        >
          <FcGoogle className={"h-6 w-6"} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignIn;
