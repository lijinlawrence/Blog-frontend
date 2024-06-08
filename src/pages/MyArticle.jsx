import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegTrashAlt } from "react-icons/fa";
import profileImage from "../assets/profileimage.png";
import { AddPostResponseContext } from "../context/contextShare";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../services/baseUrl";

const MyArticle = () => {
  const { addPostResponse, setAddPostResponse } = useContext(AddPostResponseContext);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);

  const getUserPosts = async () => {
    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(sessionStorage.getItem("existingUser"))?._id;

    if (token && userId) {
      const reqHeader = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const result = await axios.get(`${BASE_URL}/api/posts/userPost/${userId}`, reqHeader);  
        if (result.status === 200) {
          setUserPosts(result.data);
        } else {
          setError(result.response.data.message);
        }
      } catch (error) {
        setError(error.response?.data?.message );
      }
    } else {
      setError("User is not authenticated.");
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [addPostResponse]);


  // delete Article

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this post?");
    if (!confirmation) return;

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/api/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while deleting the post.");
    }
  };


  // add Favorite
  const handleFavorite = async (postId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/posts/favorite/${postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? response.data.post : post))
        );
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while updating the favorite status.");
    }
  };

  return (
    <div className="w-2/4 mx-auto py-5">
      {error && <p className="text-red-500">{error}</p>}
      {userPosts.length === 0 ? (
        <p className="text-4xl flex justify-center items-center">No articles found.</p>
      ) : (
        userPosts.map((post) => (
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
                <button
                  className="btn bg-transparent border-red-500 hover:bg-red-500 hover:text-white text-red-500 text-xs ml-2"
                  onClick={() => handleDelete(post._id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
            <div>
              <Link to={`/single/${post._id}`}>
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="font-thin">{post.about}</p>
              </Link>
              <br />
              <br />
              <div className="flex justify-between">
                <Link to={`/single/${post._id}`}>
                  <span>read more...</span>
                </Link>
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
        ))
      )}
    </div>
  );
};

export default MyArticle;
