import Head from "next/head";
import Image from "next/image";
import logo from "../public/logo.jpeg";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cloudlinq</title>
        <meta name="description" content="Share your links" />
      </Head>
      <main>
        <h1 className={"text-4xl font-bold text-primary-600 text-center"}>
          Cloudlinq
        </h1>
        <h2 className={"text-lg text-center text-gray-700 font-semibold"}>
          Networking is one button away.
        </h2>
        <div className={"w-full max-w-xl mx-auto"}>
          <Image src={logo} placeholder="blur" />
        </div>
      </main>
    </div>
  );
}
