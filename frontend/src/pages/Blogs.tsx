import Appbar from '../components/Appbar'
import {BlogCard} from '../components/BlogCard'

const Blogs = () => {
  return (
    <div>
      <Appbar/>
      <div className='flex justify-center'>
        <div className='max-w-xl'>
          <BlogCard 
            authorName={"Tushar Sachdve"}
            title = {"How an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            content = {"How an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            publishDate = {"15th June 2025"}
          />
          <BlogCard 
            authorName={"Tushar Sachdve"}
            title = {"How an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            content = {"How an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            publishDate = {"15th June 2025"}
          />
          <BlogCard 
            authorName={"Tushar Sachdve"}
            title = {"How an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            content = {"How an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            publishDate = {"15th June 2025"}
          />
          <BlogCard 
            authorName={"Tushar Sachdve"}
            title = {"How an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            content = {"How an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketingHow an ugly single page webbsite makes $5000 a month without affiliate marketing"}
            publishDate = {"15th June 2025"}
          />
        </div>
      </div>
    </div>
  )
}

export default Blogs