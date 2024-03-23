import { notFound } from "next/navigation";
import { DUMMY_CATEGORIES } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostList from "@/components/Post/PostList";
import directus from "@/lib/directus";
import { POST } from "@/types/collection";

const getData = async (category: string) => {
  try {
    const res = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: category,
        },
      },
      fields: [
        "*",
        "posts.*",
        "posts.author.id",
        "posts.author.first_name",
        "posts.author.last_name",
        "posts.author.title",
      ],
    });

    return res?.data?.[0];
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching category!");
  }
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  const category = await getData(params.category);

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
      <PostList posts={typeCorrectedCategory?.posts} />
    </PaddingContainer>
  );
};

export default Page;

export const generateStaticParams = async () => {
  return DUMMY_CATEGORIES.map((category) => {
    return {
      category: category.slug,
    };
  });
};
