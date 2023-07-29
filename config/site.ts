export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and citiest around the world",
  currentlyAt: "Budapest",
  socialLinks: {
    twitter: "https://twitter.com/",
    youtube: "https://www.youtube.com/",
    github: "https://github.com/ardacoskun",
    linkedin: "https://www.linkedin.com",
    instagram: "https://instagram.com/",
  },
};

export default siteConfig;
