import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cloudlinq</title>
        <meta name="description" content="Share your links" />
      </Head>
      <main className="pt-24 space-y-24">
        <section className="w-full max-w-5xl mx-auto">
          <div className={"max-w-lg mt-8 space-y-8"}>
            <h1 className={"text-4xl font-semibold text-primary-600"}>
              Network <span className={"text-gray-900"}>All-In-One Link</span>
            </h1>
            <p className={"text-xl"}>
              Share your profile with the people who matter most and maximize
              views of your social bio in just one click.
            </p>
            <button
              className={
                "bg-gradient-to-r from-primary-400 to-primary-500 px-4 py-2 rounded-md hover:scale-110 duration-150 text-white font-medium text-xl"
              }
            >
              Get Started
            </button>
          </div>
        </section>
        <section>
          <h2 className={"text-center font-semibold text-3xl"}>
            One Streamlined Bio Link for You
          </h2>
          <div
            className={
              "mt-8 grid grid-cols-3 gap-8 max-w-5xl mx-auto text-center"
            }
          >
            <div>
              <h3 className={"mb-4 text-xl font-medium text-primary-500"}>
                Just One Link
              </h3>
              <p>
                Create a unique bio link and add new content to the gallery over
                time
              </p>
            </div>
            <div>
              <h3 className={"mb-4 text-xl font-medium text-primary-500"}>
                Powerful Integration
              </h3>
              <p>
                Connect to Google to create your account easily and seamlessly
              </p>
            </div>
            <div>
              <h3 className={"mb-4 text-xl font-medium text-primary-500"}>
                Easy Accessibility
              </h3>
              <p>
                See the profiles of other users and gain inspiration to further
                make progress
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
