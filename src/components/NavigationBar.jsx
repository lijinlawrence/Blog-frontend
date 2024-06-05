import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { tokenAuthorizationContext } from "../context/tokenAuth";
import { MdOutlineOpenInNew } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AddPostResponseContext } from "../context/contextShare";

const NavigationBar = () => {

  const [userName ,setUserName] = useState("")

  const { isAuthorized, setIsAuthorized } = useContext(
    tokenAuthorizationContext
  );


  useEffect(()=>{

    const user = JSON.parse(sessionStorage.getItem("existingUser"))?.name;
    console.log(user);

    
    if(user){
      setUserName(user)
    }
   
  },[])

  

  return (
    <div>
      <div className=" navbar  flex justify-around items-center">
        <div className="">
          <Link to="/" className="text-2xl text-green-500 font-bold ">
            Conduit{" "}
          </Link>
        </div>
        {isAuthorized && userName ? (
          <div>
            <div className="">
              <ul className=" flex gap-10 px-1">
                <li>
                  <Link to="/" className=" text-black">
                    Home
                  </Link>
                </li>
                <li className="flex">
                  <Link to="/newPost" className=" text-gray-400 hover:text-black flex gap-2 justify-center items-center">
                    <MdOutlineOpenInNew />
                    New Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className=" text-gray-400 hover:text-black flex gap-2 justify-center items-center"
                  >
                    <IoSettingsOutline />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/article"
                    className=" text-gray-400 hover:text-black"
                  >
                    {userName}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="">
            <ul className=" flex gap-5 px-1">
              <li>
                <Link to="/" className=" text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className=" text-gray-400 hover:text-black">
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className=" text-gray-400 hover:text-black"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
