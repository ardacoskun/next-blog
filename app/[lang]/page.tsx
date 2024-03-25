import { notFound } from "next/navigation";
import CTACard from "@/components/Elements/CTACard";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";
import directus from "@/lib/directus";

const getData = async () => {
  try {
    const res = await directus.items("post").readByQuery({
      fields: [
        "*",
        "author.id",
        "author.first_name",
        "author.last_name",
        "category.id",
        "category.title",
      ],
    });

    return res.data;
  } catch (error) {
    console.log("error");
    throw new Error("Error fetching posts!");
  }
};

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const posts = await getData();

  if (!posts) {
    return notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={posts[0]} />
        <PostList posts={posts.slice(1, 3)} />
        <CTACard />
        <PostCard post={posts[3]} reverse />
        <PostList posts={posts.slice(4, 6)} />
      </main>
    </PaddingContainer>
  );
}
