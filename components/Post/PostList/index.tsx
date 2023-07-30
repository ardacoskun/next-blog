import { POST } from "@/types/collection";
import PostCard from "../PostCard";

interface PostListProps {
  posts: POST[];
  layout?: "vertical" | "horizontal";
}

const PostList = ({ posts, layout = "vertical" }: PostListProps) => {
  return (
    <div className="grid grid-cols-2 gap-10">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} layout={layout} />
      ))}
    </div>
  );
};

export default PostList;
