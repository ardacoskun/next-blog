import { POST } from "@/types/collection";
import PostCard from "../PostCard";

interface PostListProps {
  posts: POST[];
  layout?: "vertical" | "horizontal";
  locale: string;
}

const PostList = ({ posts, layout = "vertical", locale }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} layout={layout} locale={locale} />
      ))}
    </div>
  );
};

export default PostList;
