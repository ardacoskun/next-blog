import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostCard from "@/components/Post/PostCard";
import { DUMMY_POSTS } from "@/DUMMY_DATA";

export default function Home() {
  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={DUMMY_POSTS[0]} />
        <PostCard post={DUMMY_POSTS[5]} layout="vertical" />
      </main>
    </PaddingContainer>
  );
}
