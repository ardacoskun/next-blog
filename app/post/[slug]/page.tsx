import { notFound } from "next/navigation";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostHero from "@/components/Post/PostHero";
import SocialLink from "@/components/Elements/SocialLink";

const Page = ({ params }: { params: { slug: string } }) => {
  const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const socialLinks = [
    {
      id: 1,
      platform: "facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/post/${post.slug}}`,
    },
    {
      id: 2,
      platform: "twitter",
      link: `https://twitter.com/intent/tweet?url=http://localhost:3000/post/${post.slug}}`,
    },
    {
      id: 3,
      platform: "linkedin",
      link: `https://www.linkedin.com/shareArticle?mini=true&url=http://localhost:3000/post/${post.slug}}`,
    },
  ];

  return (
    <PaddingContainer>
      <PostHero post={post} />
      <div className="flex gap-10 mt-10">
        <div className="relative">
          <div className="sticky flex flex-col gap-5 top-20">
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
