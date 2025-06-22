import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number;
}
export const BlogCard = ({authorName, title, content, publishDate, id} : BlogCardProps ) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b w-screen max-w-screen-md border-slate-200 p-4 cursor-pointer">
        <div className="flex items-center flex-row">
          <div className="ml-1">
            <Avatar name={authorName}/> 
          </div>
          <div className="text-sm font-extralight pl-2"> {authorName}</div>
          <div className="ml-1 ">
            <Circle/>  
          </div> 
          <div className="pl-1 font-thin text-slate-500">
            {publishDate} 
          </div>
        </div>
        <div className="font-semibold text-xl mt-3">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0,100) + "..."}
        </div>

        <div className="mt-2 text-slate-500 text-sm font-thin">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>

      </div>
    </Link>
  )
}

function Circle() {
  return (
    <div className="h-1 w-1 rounded-full bg-slate-800">

    </div>
  )
}

export function Avatar({ name, size="small" }: { name: string, size?: "small" | "big" }) {
  const initials = name
    .split(" ")
    .filter(Boolean) // remove extra spaces
    .slice(0, 2)      // take first two words
    .map(word => word[0].toUpperCase())
    .join("");

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={` text-gray-600 dark:text-gray-300
        ${size === "small" ? "text-xs" : "text-md"}`}>
        {initials}
      </span>
    </div>
  );
}



