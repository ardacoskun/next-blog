import { cache } from "react";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostList from "@/components/Post/PostList";
import directus from "@/lib/directus";
import { POST } from "@/types/collection";
import siteConfig from "@/config/site";

// category: string, locale: string değişmezse cachelenen data sonucunu getirir!!!
const getData = cache(async (category: string, locale: string) => {
  try {
    const res = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: category,
        },
      },
      fields: [
        "*",
        "translations.*",
        "posts.*",
        "posts.author.id",
        "posts.author.first_name",
        "posts.author.last_name",
        "posts.author.title",
        "posts.translations.*",
      ],
    });

    if (locale === "en") {
      return res?.data?.[0];
    }

    const fetchedCategory: any = res?.data?.[0];

    const localisedRes = {
      ...fetchedCategory,
      title: fetchedCategory?.translations[0].title,
      description: fetchedCategory?.translations[0].description,
      posts: fetchedCategory?.posts.map((item: any) => {
        return {
          ...item,
          title: item?.translations[0].title,
          description: item?.translations[0].description,
          body: item?.translations[0].body,
          category: {
            ...item.category,
            title: fetchedCategory?.translations[0].title,
          },
        };
      }),
    };

    return localisedRes;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching category!");
  }
});

export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const data = await getData(category, lang);

  // Eğer global templateten gelen metadata title verisini kullanmak istemiyorsak aşağıdaki gibi kullanmak gerekir.
  // return {
  //   title: {
  //     absolute:data?.title,

  //   },
  //   description: data?.description,
  // };

  return {
    title: data?.title,
    description: data?.description,
    openGraph: {
      title: data?.title,
      description: data?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
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
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
      },
    },
  };
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const category = await getData(params.category, params.lang);

  if (!category) {
    return notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: POST[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList posts={typeCorrectedCategory?.posts} locale={params.lang} />
    </PaddingContainer>
  );
};

export default Page;

export const generateStaticParams = async () => {
  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const mapCategoryParams = (lang: string) => {
      return categories?.data?.map((item) => {
        return {
          category: item.slug as string,
          lang: lang,
        };
      });
    };

    const params = mapCategoryParams("en");
    const localisedParams = mapCategoryParams("de");

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
  } catch (error) {
    throw new Error("Error fetching category!");
  }
};
