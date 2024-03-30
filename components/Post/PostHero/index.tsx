import { POST } from "@/types/collection";
import PostContent from "../PostContent";
import Image from "next/image";

interface PostHeroProps {
  post: POST;
  locale: string;
}

const PostHero = ({ post, locale }: PostHeroProps) => {
  return (
    <div>
      <PostContent post={post} locale={locale} isPostPage />
      <Image
        priority
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${post.image}`}
        width={1280}
        height={500}
        alt={post.title}
        className="object-cover object-center rounded-md h-[300px] md:h-[500px] mt-6"
      />
    </div>
  );
};

export default PostHero;
