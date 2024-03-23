import parse from "html-react-parser";

const PostBody = ({ body }: { body: string }) => {
  return <div className="rich-text">{parse(body)}</div>;
};

export default PostBody;
