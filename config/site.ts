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
  categoryOGImage: string;
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
  categoryOGImage:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80",
};

export default siteConfig;
