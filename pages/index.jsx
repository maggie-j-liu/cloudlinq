import Head from "next/head";
import Image from "next/image";
import link from "../public/link.png";
import google from "../public/google.png";
import key from "../public/key.png";
import Link from "next/link";
import useUser from "@/utils/useUser";
import demoimage from "../public/demoimage.png";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      <Head>
        <title>Cloudlinq</title>
        <meta name="description" content="Share your links" />
      </Head>
      <main className="pt-24 pb-16 space-y-24">
        <section className="w-full max-w-5xl mx-auto flex justify-between">
          <div className={"max-w-lg mt-8 space-y-8"}>
            <h1 className={"text-4xl font-semibold text-primary-600"}>
              Network <span className={"text-gray-900"}>All-In-One Link</span>
            </h1>
            <p className={"text-xl"}>
              Share your profile with the people who matter most and maximize
              views of your social bio in just one click.
            </p>
            <Link href={user ? "/create" : "/sign-in"}>
              <a
                className={
                  "block w-max bg-gradient-to-r from-primary-400 to-primary-500 px-4 py-2 rounded-md hover:scale-110 duration-150 text-white font-medium text-xl"
                }
              >
                Get Started
              </a>
            </Link>
          </div>
          <div className={"max-w-md"}>
            <Image src={demoimage} placeholder="blur" />
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
            <div className={"space-y-4"}>
              <Image src={link} height={56} width={56} placeholder="blur" />
              <h3 className={"mb-4 text-xl font-medium text-primary-500"}>
                Just One Link
              </h3>
              <p>
                Create a unique bio link and add new content to the gallery over
                time
              </p>
            </div>
            <div className={"space-y-4"}>
              <Image src={google} height={56} width={56} placeholder="blur" />
              <h3 className={"text-xl font-medium text-primary-500"}>
                Powerful Integration
              </h3>
              <p>
                Connect to Google to create your account easily and seamlessly
              </p>
            </div>
            <div className={"space-y-4"}>
              <Image src={key} height={56} width={56} placeholder="blur" />
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
