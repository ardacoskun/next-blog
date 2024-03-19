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
    id: 3,
    platform: "github",
    link: siteConfig.socialLinks.github,
  },
  {
    id: 4,
    platform: "youtube",
    link: siteConfig.socialLinks.youtube,
  },
  {
    id: 5,
    platform: "linkedin",
    link: siteConfig.socialLinks.linkedin,
  },
];

const Footer = () => {
  return (
    <div className="py-8 mt-10 border-t">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">
            <Link href="/">{siteConfig.siteName}</Link>
          </h2>
          <p className="max-w-md mt-2 text-neutral-700">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-4 mt-6">
          <div>
            <div className="text-lg font-medium">#exploretheworld</div>
            <div className="flex items-center gap-3 mt-2 text-neutral-600">
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
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-md">
              <div className="w-2 h-2 bg-emerald-400" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 mt-16 border-t">
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
