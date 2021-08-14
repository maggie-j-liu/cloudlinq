import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiLink,
  FiFacebook,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { RiSnapchatLine } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { HiOutlineTrash } from "react-icons/hi";
const popular = {
  github: {
    link: "github.com",
    icon: FiGithub,
  },
  instagram: {
    link: "instagram.com",
    icon: FiInstagram,
  },
  linkedin: {
    link: "linkedin.com",
    icon: FiLinkedin,
  },
  facebook: {
    link: "facebook.com",
    icon: FiFacebook,
  },
  twitter: {
    link: "twitter.com",
    icon: FiTwitter,
  },
  snapchat: {
    link: "snapchat.com",
    icon: RiSnapchatLine,
  },
  tiktok: {
    link: "tiktok.com",
    icon: SiTiktok,
  },
  youtube: {
    link: "youtube.com",
    icon: FiYoutube,
  },
};
const Social = ({
  link,
  description,
  edit = false,
  onLinkChange,
  onLinkBlur,
  onDescriptionBlur,
  onDescriptionChange,
  onDelete,
}) => {
  let Website = null;
  for (const [sitename, val] of Object.entries(popular)) {
    if (link.includes(val.link)) {
      Website = val.icon;
      break;
    }
  }
  if (edit) {
    return (
      <div className={"flex flex-col space-y-4"}>
        <div className={"flex items-center gap-4"}>
          {Website ? (
            <Website className={"h-6 w-6"} />
          ) : (
            <FiLink className={"h-6 w-6"} />
          )}
          <input
            type="url"
            value={link}
            onChange={onLinkChange}
            onBlur={onLinkBlur}
            className={"w-full borderless-input"}
          />
        </div>
        <div className={"w-full flex"}>
          <textarea
            className={"ml-10 flex-grow borderless-input"}
            value={description}
            placeholder={"Description (optional)"}
            onChange={onDescriptionChange}
            onBlur={onDescriptionBlur}
          />
        </div>
        <button
          className={
            "ml-auto flex items-center gap-2 bg-red-200 px-2 py-1 rounded-md hover:bg-red-300"
          }
          onClick={onDelete}
        >
          <HiOutlineTrash className={"h-5 w-5"} />
          Delete
        </button>
      </div>
    );
  }
  return (
    <a href={link} className={"block"}>
      <div className={"bg-gray-100 hover:shadow py-4 px-4 rounded"}>
        <div className="flex items-center gap-4 font-medium">
          {Website ? (
            <Website className={"h-6 w-6"} />
          ) : (
            <FiLink className={"h-6 w-6"} />
          )}
          {link}
        </div>
        {description && (
          <div className="w-full flex mt-2">
            <div className={"ml-10 flex-grow"}>{description}</div>
          </div>
        )}
      </div>
    </a>
  );
};
export default Social;
