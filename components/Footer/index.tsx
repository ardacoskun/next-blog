import Link from "next/link";
import siteConfig from "@/config/site";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import SocialLink from "@/components/Elements/SocialLink";

const socialLinks = [
  {
    id: 1,
    platform: "twitter",
    link: siteConfig.socialLinks.twitter,
  },
  {
    id: 2,
    platform: "instagram",
    link: siteConfig.socialLinks.instagram,
  },
  {
    id: 1,
    platform: "github",
    link: siteConfig.socialLinks.github,
  },
  {
    id: 1,
    platform: "youtube",
    link: siteConfig.socialLinks.youtube,
  },
  {
    id: 1,
    platform: "linkedin",
    link: siteConfig.socialLinks.linkedin,
  },
];

const Footer = () => {
  return (
    <div className="py-8 border-t mt-10">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">
            <Link href="/">{siteConfig.siteName}</Link>
          </h2>
          <p className="max-w-md mt-2 text-neutral-700">
            {siteConfig.description}
          </p>
        </div>
        <div className="mt-6 flex justify-between gap-4 flex-wrap">
          <div>
            <div className="font-medium text-lg">#exploretheworld</div>
            <div className="flex items-center gap-3 text-neutral-600 mt-2">
              {socialLinks.map((item) => (
                <SocialLink
                  key={item.id}
                  platform={item.platform}
                  link={item.link}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">Currently At</div>
            <div className="bg-white shadow-md rounded-md px-3 py-2 flex items-center gap-2">
              <div className="bg-emerald-400 w-2 h-2" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        <div className="border-t py-3 flex items-center gap-4 flex-wrap justify-between mt-16">
          <div className="text-sm text-neutral-400">
            All rights are reserved | Copyright {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            Made with love by{" "}
            <Link
              href={siteConfig.socialLinks.github}
              target="_blank"
              className="underline underline-offset-4"
            >
              @ardacoskun
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;
