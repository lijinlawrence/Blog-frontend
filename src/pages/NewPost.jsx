import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddPostResponseContext } from "../context/contextShare.jsx";
import axios from "axios";
import { BASE_URL } from "../services/baseUrl.js";

const NewPost = () => {
  const { addPostResponse, setAddPostResponse } = useContext(AddPostResponseContext);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    about: "",
    body: "",
    tags: ""
  });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

  const handlePublish = async () => {
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
        tags
      };

      const reqHeader = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`${BASE_URL}/api/posts`, reqBody, reqHeader);

      if (response.status === 201) {
        alert("Post created successfully");
        navigate("/user/article");
        setAddPostResponse(response.data);
      } else {
        console.error("Failed response:", response);
        alert("Failed to publish the article");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
      setError("An error occurred while publishing the article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/4 mx-auto flex justify-center items-center py-20">
      <div className="flex flex-col w-full justify-center items-center gap-5">
        {error && <div className="alert alert-error">{error}</div>}
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
          onClick={handlePublish}
          className="bg-green-500 btn text-white hover:bg-green-700 btn-wide mt-5"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish Article"}
        </button>
      </div>
    </div>
  );
};

export default NewPost;
