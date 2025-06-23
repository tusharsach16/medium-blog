import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={'/blogs'} className="flex justify-center flex-col">Medium</Link>
      <div>
        <Link to={'/publish'}>
          <button className="mr-6 border bg-green-300 rounded-2xl px-2 cursor-pointer hover:bg-green-600">New Blog</button>
        </Link>
        <Avatar name="tushar" size="big"/>
      </div>
    </div>
  )
}

export default Appbar