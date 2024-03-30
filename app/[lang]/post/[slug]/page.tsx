import { notFound } from "next/navigation";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostHero from "@/components/Post/PostHero";
import SocialLink from "@/components/Elements/SocialLink";
import PostBody from "@/components/Post/PostBody";
import CTACard from "@/components/Elements/CTACard";
import directus from "@/lib/directus";

const getData = async (slug: string, locale: string) => {
  try {
    const res = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: slug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "author.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const postData = res?.data?.[0];

    if (locale === "en") {
      return postData;
    }

    const localisedRes = {
      ...postData,
      title: postData?.translations?.[0]?.title,
      description: postData?.translations?.[0]?.description,
      body: postData?.translations?.[0]?.body,
      category: {
        ...postData?.category,
        title: postData?.category?.translations?.[0]?.title,
      },
    };

    return localisedRes;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching post!");
  }
};

const Page = async ({ params }: { params: { slug: string; lang: string } }) => {
  const post = await getData(params.slug, params.lang);

  if (!post) {
    notFound();
  }

  const socialLinks = [
    {
      id: 1,
      platform: "facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}}`,
    },
    {
      id: 2,
      platform: "twitter",
      link: `https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}}`,
    },
    {
      id: 3,
      platform: "linkedin",
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}}`,
    },
  ];

  return (
    <PaddingContainer>
      <div className="space-y-10">
        <PostHero post={post} locale={params.lang} />
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="relative">
            <div className="sticky flex items-center gap-5 md:flex-col top-20">
              <div className="font-medium md:hidden">Share this content:</div>
              {socialLinks.map((item) => (
                <SocialLink
                  isShareUrl
                  key={item.id}
                  platform={item.platform}
                  link={item.link}
                />
              ))}
            </div>
          </div>
          <PostBody body={post?.body} />
        </div>
        <CTACard locale={params.lang} />
      </div>
    </PaddingContainer>
  );
};

export default Page;

export const generateStaticParams = async () => {
  try {
    const res = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const mapCategoryParams = (lang: string) => {
      return res?.data?.map((item) => {
        return {
          slug: item.slug as string,
          lang,
        };
      });
    };

    const params = mapCategoryParams("en");
    const localisedParams = mapCategoryParams("de");

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
  } catch (error) {
    throw new Error("Error fetching post!");
  }
};
