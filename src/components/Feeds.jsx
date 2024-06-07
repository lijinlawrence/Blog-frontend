import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import profileImage from "../assets/profileimage.png";
import axios from "axios";
import { BASE_URL } from "../services/baseUrl";

const Feeds = ({ isFavorite = false }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPosts = async (page = 1) => {
    try {
      const url = isFavorite
        ? `${BASE_URL}/api/posts/favorites`
        : `${BASE_URL}/api/posts`;
      const response = await axios.get(url, {
        params: { page },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setPosts(response.data.posts || response.data.favoritePosts);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async (postId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await axios.put(
        `${BASE_URL}/api/posts/favorite/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? response.data.post : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage, isFavorite]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="w-2/4 mx-auto py-5">
      <h1>{isFavorite ? "Favorite Posts" : "Global Feed"}</h1>
      <hr />
      {posts.map((post) => (
        <div key={post._id} className="py-5">
          <div className="flex justify-between py-5">
            <div className="flex gap-5">
              <img src={profileImage} alt="" className="w-10 h-10" />
              <div>
                <h1 className="text-green-500 hover:underline hover:text-gray-400">
                  {post.name}
                </h1>
                <p className="font-thin text-xs">
                  {new Date(post.createdAt).toDateString()}
                </p>
              </div>
            </div>
            <div>
              <button
                className="btn bg-transparent border-green-500 hover:bg-green-500 hover:text-white text-green-500 text-xs"
                onClick={() => handleFavorite(post._id)}
              >
                <FaHeart />
                {post.favorites.length || 0}
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="font-thin">{post.body}</p>
            <br />
            <br />
            <div className="flex justify-between">
              <span>read more...</span>
              <div className="flex cursor-pointer gap-2">
                {post.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="h-6 text-xs border-2 text-center rounded-2xl px-2 bg-transparent"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
      <div className="flex justify-between mt-5">
        <button
          className={`btn ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`btn ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feeds;
