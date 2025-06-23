import Appbar from '../components/Appbar'
import {BlogCard} from '../components/BlogCard'
import BlogSkeleton from '../components/BlogSkeleton';
import { useBlogs } from '../hooks/bloghook'

const Blogs = () => {
  const {loading, blogs} = useBlogs();

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
          <BlogSkeleton/>
          <BlogSkeleton/>
        </div>
      </div>
    </div>
    
  }
  return (
    <div>
      <Appbar/>
      <div className='flex justify-center'>
        <div className='max-w-xl'>
          {blogs.map((blog, i) => 
            <BlogCard id={blog.id}  key={i}
            authorName={blog.author.name || "Tushu Sachdeva"}
            title = {blog.title}
            content = {blog.content}
            publishDate = {"15th June 2025"}
          />
        )}
          
        </div>
      </div>
    </div>
  )
}

export default Blogs