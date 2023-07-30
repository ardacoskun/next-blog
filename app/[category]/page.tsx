import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/Layout/PaddingContainer";
import PostList from "@/components/Post/PostList";

const Page = ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLocaleLowerCase() === params.category
  );
  return (
    <PaddingContainer>
      <PostList posts={posts} />
    </PaddingContainer>
  );
};

export default Page;

export const generateStaticParams = async () => {
  return DUMMY_CATEGORIES.map((category) => {
    return {
      category: category.slug,
    };
  });
};
