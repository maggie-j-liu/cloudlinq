import useUser from "@/utils/useUser";

const SignIn = () => {
  const { user, signInWithGoogle } = useUser();
  if (user) {
    return null;
  }
  return (
    <div
      className={
        "w-full min-h-screen flex justify-center items-start bg-gray-50"
      }
    >
      <div className={"bg-white px-16 py-12 mt-14"}>
        <button
          className={"border-2 border-red-300 px-4 py-2 rounded-md shadow"}
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignIn;
