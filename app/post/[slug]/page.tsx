import { notFound } from "next/navigation";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostHero from "@/components/Post/PostHero";

const Page = ({ params }: { params: { slug: string } }) => {
  const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      <PostHero post={post} />
    </PaddingContainer>
  );
};

export default Page;

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((post) => {
    return {
      slug: post.slug,
    };
  });
};
