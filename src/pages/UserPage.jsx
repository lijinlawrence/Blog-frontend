import React, { useEffect, useState } from "react";
import profile from "../assets/profileimage.png";
import { Link, NavLink } from "react-router-dom";
import MyArticle from "./MyArticle";
import FavoriteArticels from "./FavoriteArticels";
const UserPage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))?.name;
    console.log(user);

    if (user) {
      setUserName(user);
    }
  }, []);

  return (
    <div>
      <div className=" h-[30%] w-full bg-gray-200 py-12 flex justify-center items-center flex-col">
        <img className="w-24" src={profile} alt="" />
       {userName && <p className="  text-xl text-black">{userName}</p> } 
      </div>
      <div className=" py-10">
        <div className=" w-3/4 mx-auto">
          <ul className=" flex gap-5">
            <li className="">
              <NavLink
                to="article"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 "
                    : "text-gray-400 hover:text-black"
                }
              >
                My Articles
              </NavLink>{" "}
            </li>
            <li className="">
              <NavLink
                to="favorite"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 "
                    : "text-gray-400 hover:text-black"
                }
              >
                Favorite Articles
              </NavLink>{" "}
            </li>
          </ul>
          <hr className=" mt-3" />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
