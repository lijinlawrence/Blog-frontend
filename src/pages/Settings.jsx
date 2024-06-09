import React, { useContext, useState, useEffect } from "react";
import { tokenAuthorizationContext } from "../context/tokenAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/baseUrl";

const Settings = () => {
  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthorizationContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostData(response.data.user);
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);



// logout
  const handleLogout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();

      Object.keys(postData).forEach((key) => {
        formData.append(key, postData[key]);
      });

      if (file) {
        formData.append('profileImage', file);
      }

      const response = await axios.put(`${BASE_URL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert("Profile updated successfully");
        navigate("/user/article")
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      setError("An error occurred while updating the profile");
    }
  };

  return (
    <div className="w-3/4 mx-auto flex-col flex justify-center items-center py-20">
      <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center items-center gap-5">
        <h1 className="text-4xl">Your Settings</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <input
          type="file"
          name="image"
          placeholder="Upload Image"
          className="input input-bordered w-full max-w-4xl"
          onChange={handleFileChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="input input-bordered w-full max-w-4xl"
          value={postData.name}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Update Bio"
          className="textarea textarea-bordered textarea-lg h-40 w-full max-w-4xl"
          value={postData.bio}
          onChange={handleChange}
        ></textarea>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="input input-bordered w-full max-w-4xl"
          value={postData.email}
          disabled
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="input input-bordered w-full max-w-4xl"
          value={postData.password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-transparent btn text-green-500 hover:bg-green-700 hover:text-white btn-wide mt-5">
          Update Settings
        </button>
      </form>
      <div className="flex justify-between gap-10">
        <button
          onClick={handleLogout}
          className="bg-transparent btn text-red-500 hover:bg-red-700 hover:text-white btn-wide mt-5"
        >
          Click Here to Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
