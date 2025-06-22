import Appbar from "./Appbar";
import { type blogi } from "../hooks/bloghook";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: blogi }) => {
  const authorName = blog.author?.name || "Anonymous";
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  }); // Replace with blog.createdAt if available

  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl py-10">
        <div className="col-span-8">
          <div className="text-4xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-500">Posted on {date}</div>
          <div className="mt-2 whitespace-pre-line">
            {blog.content}
          </div>
        </div>
        <div className="col-span-4 p-3">
          <div className="text-lg font-medium mb-2">Author</div>
          <div className="flex flex-row">
            <div className="mr-2 flex justify-center flex-col">
              <Avatar name={authorName} />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl mt-1">{authorName}</div>
              <div className="text-slate-500 font-thin mt-1">
                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
