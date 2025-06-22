import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks/bloghook"
import { useParams } from "react-router-dom";

const Blog = () => {
  const {id} = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  });
  if(loading) {
    return <div>loading...</div>
  }
  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog