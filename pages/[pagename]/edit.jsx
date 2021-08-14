import FourOhFour from "@/components/FourOhFour";
import useUser from "@/utils/useUser";
import getPageInfo from "@/utils/getPageInfo";
import { useRef, useState } from "react";
import firebase from "@/utils/firebase";
import { useRouter } from "next/router";
import { FiPlusSquare } from "react-icons/fi";
import Social from "@/components/Social";
import Link from "next/link";

const unsavedDefaults = {
  creatorName: false,
  profileImage: false,
  about: false,
  socials: false,
};

const EditPage = ({
  error,
  name,
  creator,
  creatorName,
  profileImage,
  about,
  pageKey,
  socials = [],
}) => {
  const { user, loading } = useUser();
  const [newCreatorName, setNewCreatorName] = useState(creatorName);
  const [newAbout, setNewAbout] = useState(about);
  const [newImage, setNewImage] = useState(profileImage);
  const [newSocials, setNewSocials] = useState(socials);

  const [unsaved, setUnsaved] = useState(unsavedDefaults);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const router = useRouter();
  const inputRef = useRef();

  const checkForUnsavedChanges = () => {
    for (const val of Object.values(unsaved)) {
      console.log(val);
      if (val) {
        setHasUnsavedChanges(true);
        return;
      }
    }
    setHasUnsavedChanges(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener(
        "load",
        async (e) => {
          setNewImage(e.target.result);
          unsaved.profileImage = true;
          setUnsaved({ ...unsaved });
          checkForUnsavedChanges();
        },
        false
      );
    } else {
      setNewImage(profileImage);
      unsaved.profileImage = false;
      setUnsaved({ ...unsaved });
      checkForUnsavedChanges();
    }
  };

  const addNewSocial = () => {
    console.log("addnew");
    setNewSocials([...newSocials, { link: "", description: "" }]);
  };

  const saveChanges = async () => {
    const updatedVals = {
      creatorName: newCreatorName,
      about: newAbout,
      socials: newSocials,
    };
    if (unsaved.profileImage) {
      const storage = firebase.storage();
      await storage
        .ref(`pages/${pageKey}/profileImage`)
        .putString(newImage, "data_url");
      const newImageUrl = await storage
        .ref(`pages/${pageKey}/profileImage`)
        .getDownloadURL();
      updatedVals.profileImage = newImageUrl;
    }
    const db = firebase.database();
    await db.ref(`pages/${pageKey}`).update(updatedVals);
    setUnsaved(unsavedDefaults);
    setHasUnsavedChanges(false);
    router.replace(router.asPath, router.asPath, { scroll: false });
  };
  if (loading) {
    return null;
  }
  if (error || !user || user.uid !== creator) {
    return <FourOhFour />;
  }
  return (
    <div className={"my-8 flex flex-col w-full max-w-4xl mx-auto"}>
      <div>
        <button
          className={`${
            hasUnsavedChanges ? "block" : "hidden"
          } fixed bottom-8 right-8 bg-primary-200 px-4 py-1 rounded-md`}
          onClick={() => saveChanges()}
        >
          Save Changes
        </button>
      </div>

      <img
        src={newImage}
        alt={`${creatorName}'s image`}
        className={
          "self-center h-48 w-48 rounded-full border-primary-200 border-4"
        }
      />
      <input
        type="file"
        accept="image/*"
        className={"self-center w-max text-center"}
        ref={inputRef}
        onChange={handleImageChange}
      />
      <label className={"self-center mt-4"}>
        <p>Your name</p>
        <input
          type="text"
          value={newCreatorName}
          onChange={(e) => {
            setNewCreatorName(e.target.value);
            unsaved.creatorName = e.target.value !== creatorName;
            setUnsaved({ ...unsaved });
          }}
          onBlur={() => checkForUnsavedChanges()}
          className={"borderless-input text-3xl mt-1 font-bold text-center"}
        />
      </label>
      <Link href={`/${name}`}>
        <a
          className={
            "self-center text-xl mt-2 text-primary-600 font-medium hover:wavy"
          }
        >
          @{name}
        </a>
      </Link>
      <div className={"mt-8"}>
        <label>
          <h3 className={"text-xl font-medium wavy mb-2"}>About Me</h3>
          <textarea
            value={newAbout}
            onChange={(e) => {
              setNewAbout(e.target.value);
              unsaved.about = e.target.value !== about;
              setUnsaved({ ...unsaved });
            }}
            onBlur={() => checkForUnsavedChanges()}
            className={"text-lg text-gray-800 borderless-input w-full h-36"}
            placeholder={"Describe yourself!"}
          />
        </label>
      </div>
      <div className={"mt-8"}>
        <div className={"flex justify-between"}>
          <h3 className={"text-xl font-medium wavy mb-2"}>My Socials</h3>
          <button
            className={
              "flex items-center gap-2 bg-primary-100 px-4 py-1 rounded-md"
            }
            onClick={() => addNewSocial()}
          >
            <FiPlusSquare />
            Add new
          </button>
        </div>
        <p>You can find me at:</p>
        <div className={"mt-4 space-y-8"}>
          {newSocials.map(({ link, description }, idx) => (
            <Social
              key={idx}
              link={link}
              description={description}
              edit
              onLinkChange={(e) => {
                newSocials[idx].link = e.target.value;
                setNewSocials([...newSocials]);
                unsaved.socials = true;
                setUnsaved({ ...unsaved });
              }}
              onDescriptionChange={(e) => {
                newSocials[idx].description = e.target.value;
                setNewSocials([...newSocials]);
                unsaved.socials = true;
                setUnsaved({ ...unsaved });
              }}
              onLinkBlur={() => checkForUnsavedChanges()}
              onDescriptionBlur={() => checkForUnsavedChanges()}
            />
          ))}
        </div>
        {newSocials.length == 0 && <p>Nothing here yet!</p>}
      </div>
    </div>
  );
};

export default EditPage;

export const getServerSideProps = async ({ params }) => {
  return {
    props: await getPageInfo(params.pagename),
  };
};
