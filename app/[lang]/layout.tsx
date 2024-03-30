import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: `${siteConfig.siteName} | %s `,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="pt-10 min-h-[calc(100vh-300px)]">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
