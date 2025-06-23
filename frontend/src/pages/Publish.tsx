import { useState } from "react";
import { BACKEND_URL } from "../../config";
import Appbar from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem('token');


      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/postBlog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/blog/${response.data.blogId}`);
    } catch (err) {
      setError("Failed to publish blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center mt-20">
        <div className="w-full max-w-screen-lg px-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <textarea
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="mb-4 block px-3 py-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter a title..."
          ></textarea>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="mb-4 block px-3 py-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            rows={10}
          ></textarea>

          {error && (
            <div className="text-red-500 mb-4 text-sm">{error}</div>
          )}

          <button
            onClick={handlePublish}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
