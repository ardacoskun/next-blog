import { notFound } from "next/navigation";
import { DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostHero from "@/components/Post/PostHero";
import SocialLink from "@/components/Elements/SocialLink";
import PostBody from "@/components/Post/PostBody";
import CTACard from "@/components/Elements/CTACard";

const Page = ({ params }: { params: { slug: string } }) => {
  const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

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
      <PostHero post={post} />
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
        <PostBody body={post?.body}/>
      </div>
      <CTACard />
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
