import { POST } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "../PostContent";

interface PostProps {
  post: POST;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="grid grid-cols-2 gap-10 items-center"
    >
      <Image
        src={post.image}
        alt={post.title}
        width={600}
        height={300}
        className="rounded-md w-full object-cover object-center max-h-[300px]"
      />
      <PostContent post={post} />
    </Link>
  );
};

export default PostCard;
