import Link from "next/link";
import hexToHsl from "hex-to-hsl";

const ProfileCard = ({ page }) => {
  const hsl = hexToHsl(page.color);
  return (
    <Link href={`/${page.name}`} key={page.name}>
      <a
        className={
          "root bg-white px-4 py-8 rounded hover:shadow-xl group relative"
        }
      >
        <div
          className={
            "bg-theme-light h-20 absolute top-0 left-0 right-0 rounded-t"
          }
        ></div>
        <div className={"flex flex-col items-center relative"}>
          <img
            src={page.profileImage}
            alt={`${page.creatorName}'s image`}
            className={"h-24 w-24 rounded-full border-theme border-4"}
          />
          <h3 className={"text-xl font-semibold mt-4"}>{page.creatorName}</h3>
          <p className={"group-hover:wavy text-theme"}>@{page.name}</p>
          <h4 className={"mt-4 self-start font-medium"}>
            About {page.creatorName}
          </h4>
          <p
            className={
              "text-gray-600 self-start line-clamp-5 whitespace-pre-wrap w-full"
            }
          >
            {page.about}
          </p>
        </div>
        <style jsx>
          {`
            .root {
              --theme-hue: ${hsl[0]};
              --theme-saturation: ${hsl[1]}%;
              --theme-lightness: ${hsl[2]}%;
              --color-theme-base: hsl(
                var(--theme-hue),
                var(--theme-saturation),
                calc(min(var(--theme-lightness), 80%))
              );
              --color-theme-light: hsl(
                var(--theme-hue),
                var(--theme-saturation),
                calc(min(var(--theme-lightness) + 30%, 95%))
              );
              --color-theme-lighter: hsl(
                var(--theme-hue),
                var(--theme-saturation),
                calc(min(var(--theme-lightness) + 35%, 97%))
              );
              --color-theme-dark: hsl(
                var(--theme-hue),
                var(--theme-saturation),
                calc(max(var(--theme-lightness) - 25%, 5%))
              );
              --color-theme-darker: hsl(
                var(--theme-hue),
                var(--theme-saturation),
                calc(max(var(--theme-lightness) - 30%, 3%))
              );
              --color-theme-bg: hsl(
                var(--theme-hue),
                calc(var(--theme-saturation) - 10%),
                calc(min(var(--theme-lightness) + 70%, 95%))
              );
            }
          `}
        </style>
      </a>
    </Link>
  );
};

export default ProfileCard;
