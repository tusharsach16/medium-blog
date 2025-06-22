import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string
  }
}


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setBlogs(response.data.blogs);
    })
    .catch(error => {
      console.error("Failed to fetch blogs:", error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return { loading, blogs };
};



export interface blogi {
  content: string;
  title: string;
  author: {
    name: string
  }
}
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<blogi | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${BACKEND_URL}/api/v1/blog/getBlog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setBlog(response.data.blog);
    })
    .catch(error => {
      console.error("Failed to fetch blogs:", error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id]);

  return { loading, blog };
}