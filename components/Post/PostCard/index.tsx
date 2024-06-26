import { POST } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "../PostContent";

interface PostProps {
  post: POST;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}

const PostCard = ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}: PostProps) => {
  return (
    <Link
      href={`/${locale}/post/${post.slug}`}
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          : "space-y-10"
      } `}
    >
      <Image
        priority
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${post.image}`}
        alt={post.title}
        width={600}
        height={300}
        className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${
          reverse ? "md:order-last" : ""
        }`}
      />
      <PostContent post={post} locale={locale} />
    </Link>
  );
};

export default PostCard;
