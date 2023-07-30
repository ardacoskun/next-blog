import CTACard from "@/components/Elements/CTACard";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";
import { DUMMY_POSTS } from "@/DUMMY_DATA";

export default function Home() {
  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={DUMMY_POSTS[0]} />
        <PostList posts={DUMMY_POSTS.slice(1, 3)} />
        <CTACard />
        <PostCard post={DUMMY_POSTS[3]} reverse />
        <PostList posts={DUMMY_POSTS.slice(4, 6)} />
      </main>
    </PaddingContainer>
  );
}
