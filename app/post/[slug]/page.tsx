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
      <div className="flex gap-10 mt-10">
        <div className="relative">
          <div className="sticky top-20">Share</div>
        </div>
        <div className="h-[1200px] bg-slate-200 w-full">Post Body</div>
      </div>
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
