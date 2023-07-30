import { ArrowUpRight } from "lucide-react";
import { POST } from "@/types/collection";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";
interface PostContentProps {
  post: POST;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="space-y-2">
      <div className="@md:text-sm text-xs flex gap-2 items-center text-neutral-400 ">
        <div
          className={`font-medium ${
            post.category.title === "Cities"
              ? "text-emerald-600"
              : "text-indigo-500"
          }`}
        >
          {post.category.title}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getReadingTime(post.body)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getRelativeDate(post.date_created)}</div>
      </div>
      <div>
        <h2 className="font-medium @lg:text-3xl text-xl @md:text-2xl">
          {post.title}
        </h2>
        <p className="text-neutral-600 leading-snug text-base @lg:text-lg">
          {post.description}
        </p>
        <div className="flex items-center gap-2 pt-3">
          Read More <ArrowUpRight size="14" />
        </div>
      </div>
    </div>
  );
};

export default PostContent;
