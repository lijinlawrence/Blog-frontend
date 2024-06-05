import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPostApi, userPostApi } from "../services/allApi.js";
import { AddPostResponseContext } from "../context/contextShare.jsx";

const EditArticle = () => {
  const {addPostResponse,setAddPostResponse}=useContext(AddPostResponseContext)
  const [userPosts, setUserPosts] = useState({});
  console.log(userPosts);

  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: userPosts[0].title,
    about:"",
    body: "",
    tags: ""
  });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(userPosts);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
    }); 
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  //  Fetch User Posts
  const getUserPosts = async () => {
    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(sessionStorage.getItem("existingUser"))?._id;

    if (token && userId) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await userPostApi(userId, reqHeader);
        if (result.status === 200) {
          setUserPosts(result.data);
        } else {
          setError(result.response.data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("User is not authenticated.");
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [addPostResponse]);

  const handlePublish = async () => {
    const { title,about, body, tags } = postData;
 

    if (!title || !about || !body || !tags) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reqBody = { title,about, body, tags: tags.split(",").map(tag => tag.trim()) };
    console.log("Request Body:", reqBody); // Log request body

      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
        console.log("Request Header:", reqHeader); // Log request headers

    

        const response = await updatePostApi(postData, reqHeader);
        console.log("Response:", response); // Log the response

        if (response.status === 201) {
          alert("Post created successfully");
          navigate("/user/article");
          setAddPostResponse(response.data)
          console.log(addPostResponse);
        } else {
          console.error('Failed response:', response);
          alert("Failed to publish the article");
        }
      } else {
        alert("Token is missing");
      }
    } catch (error) {
      console.error('Error during post creation:', error);
      setError('An error occurred while publishing the article');
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
          placeholder="What's this articel about?"
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
          {loading ? 'Publishing...' : 'Publish Article'}
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
