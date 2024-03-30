import Script from "next/script";
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
    openGraph: {
      title: siteConfig.siteName,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "https://localhost:3000/opengraph-image.png",
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de`,
      },
    },
    verification: {
      google: "yfBhPU2hnS7qqio5bRjc21xgYcvUuWqCwAx6usPZYEk",
    },
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
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-H5CK1FLD8R"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-H5CK1FLD8R');`}
      </Script>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="pt-10 min-h-[calc(100vh-300px)]">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
