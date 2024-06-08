import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AddPostResponseContext } from "../context/contextShare.jsx";
import axios from "axios";
import { BASE_URL } from "../services/baseUrl.js";

const EditArticle = () => {
  const { setAddPostResponse } = useContext(AddPostResponseContext);
  const [postData, setPostData] = useState({
    title: "",
    about: "",
    body: "",
    tags: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const { postId } = useParams();
  console.log(postId);

  // getSingle Post

  const getSinglePost = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/posts/${postId}`
      );
      console.log(response);
      if (response.status === 200) {
        const post = response.data;
        setPostData({
          title: post.title || "",
          about: post.about || "",
          body: post.body || "",
          tags: post.tags ? post.tags.join(", ") : "",
        });
       
      } else {
        setError(result.response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    getSinglePost();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

 

  // updatePost

  const handleUpdate = async () => {
    const { title, about, body, tags } = postData;

    if (!title || !about || !body || !tags) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reqBody = {
        title,
        about,
        body,
        tags,
      };

      if (token) {
        const reqHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.put(
          `${BASE_URL}/api/posts/updatePost/${postId}`,
          reqBody,
          reqHeader
        );
        console.log(response);

        if (response.status === 200) {
          alert("Article updated successfully");
          navigate("/user/article");
          setAddPostResponse(response.data);
        } else {
          alert("Failed to update the article");
        }
      } else {
        alert("Token is missing");
      }
    } catch (error) {
      console.error("Error during article update:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/4 mx-auto flex justify-center items-center py-20">
      <div className="flex flex-col w-full justify-center items-center gap-5">
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          className="input input-bordered w-full max-w-4xl"
          value={postData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="about"
          placeholder="What's this article about?"
          className="input input-bordered w-full max-w-4xl"
          value={postData.about}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Write Your article (in markdown)"
          className="textarea textarea-bordered textarea-lg h-40 w-full max-w-4xl"
          value={postData.body}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="tags"
          placeholder="Enter Tags"
          className="input input-bordered w-full max-w-4xl"
          value={postData.tags}
          onChange={handleChange}
        />
        <button
          onClick={handleUpdate}
          className="bg-green-500 btn text-white hover:bg-green-700 btn-wide mt-5"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
