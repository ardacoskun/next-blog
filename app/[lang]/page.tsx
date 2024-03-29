import { notFound } from "next/navigation";
import CTACard from "@/components/Elements/CTACard";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";
import directus from "@/lib/directus";

const getData = async (locale: string) => {
  try {
    const res = await directus.items("post").readByQuery({
      fields: [
        "*",
        "author.id",
        "author.first_name",
        "author.last_name",
        "category.id",
        "category.title",
        "category.translations.*",
        "translations.*",
      ],
    });

    if (locale === "en") {
      return res.data;
    }

    const localisedRes = res.data?.map((item) => {
      return {
        ...item,
        title: item.translations[0].title,
        description: item.translations[0].description,
        body: item.translations[0].body,
        category: {
          ...item.category,
          title: item.category.translations[0].title,
        },
      };
    });

    return localisedRes;
  } catch (error) {
    console.log("error");
    throw new Error("Error fetching posts!");
  }
};

export default async function Home({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const posts = await getData(lang);

  if (!posts) {
    return notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} locale={lang} />
        <PostList posts={posts.slice(1, 3)} locale={lang} />
        <CTACard locale={lang} />
        <PostCard post={posts[3]} reverse locale={lang} />
        <PostList posts={posts.slice(4, 6)} locale={lang} />
      </main>
    </PaddingContainer>
  );
}
