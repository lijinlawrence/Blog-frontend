import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/baseUrl";
import profilePlaceholder from "../assets/profileimage.png"; // Placeholder image

const UserPage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log(userData.image);

  return (
    <div>
      <div className="h-[30%] w-full bg-gray-200 py-12 flex-col">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-24  rounded-full"
            src={userData.image}
            alt="Profile"
          />
          {userData.name && <p className="text-xl text-black">{userData.name}</p>}
          {userData.bio && <p className=" text-2xl mt-5">{userData.bio}</p>}
        </div>
        <div className="flex justify-around">
          <div></div>
          <Link to="/settings">
            <button className="bg-transparent border-white btn hover:text-white btn-sm mt-5">
              Edit Profile settings
            </button>
          </Link>
        </div>
      </div>

      <div className="py-10">
        <div className="w-3/4 mx-auto">
          <ul className="flex gap-5">
            <li>
              <NavLink
                to="article"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-gray-400 hover:text-black"
                }
              >
                My Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="favorite"
                className={({ isActive }) =>
                  isActive ? "text-green-500" : "text-gray-400 hover:text-black"
                }
              >
                Favorite Articles
              </NavLink>
            </li>
          </ul>
          <hr className="mt-3" />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
