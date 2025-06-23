import Appbar from "../components/Appbar";
import BlogSkeleton from "../components/BlogSkeleton";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks/bloghook"
import { useParams } from "react-router-dom";

const Blog = () => {
  const {id} = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  });
  if(loading) {
    return <div>
      <Appbar/>
      <div className='flex justify-center'>
        <div>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
        </div>
      </div>
    </div>
    
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