import { POST } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

interface PostProps {
  post: POST;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Link href={`/post/${post.slug}`} className="grid grid-cols-2 gap-10">
      <Image src={post.image} alt={post.title} width={600} height={300} />
      <div>{post.title}</div>
    </Link>
  );
};

export default PostCard;
