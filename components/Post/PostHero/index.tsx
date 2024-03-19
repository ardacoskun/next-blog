import { POST } from "@/types/collection";
import PostContent from "../PostContent";
import Image from "next/image";

interface PostHeroProps {
  post: POST;
}

const PostHero = ({ post }: PostHeroProps) => {
  return (
    <div>
      <PostContent post={post} isPostPage />
      <Image
        src={post.image}
        width={1280}
        height={500}
        alt={post.title}
        className="object-cover object-center rounded-md h-[300px] md:h-[500px] mt-6"
      />
    </div>
  );
};

export default PostHero;
