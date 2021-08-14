import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cloudlinq</title>
        <meta name="description" content="Share your links" />
      </Head>
      <main>
        <h1 className={"text-4xl font-bold text-indigo-800"}>Cloudlinq</h1>
      </main>
    </div>
  );
}