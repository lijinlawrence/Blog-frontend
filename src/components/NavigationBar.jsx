import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { tokenAuthorizationContext } from "../context/tokenAuth";
import { MdOutlineOpenInNew } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const NavigationBar = () => {
  const [userName, setUserName] = useState("");

  const { isAuthorized } = useContext(tokenAuthorizationContext);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))?.name;
    console.log(user);

    if (user) {
      setUserName(user);
    }
  }, [isAuthorized]);

  return (
    <div>
      <div className="navbar flex justify-around items-center">
        <div>
          <NavLink to="/" className="text-2xl text-green-500 font-bold">
            Conduit
          </NavLink>
        </div>
        {isAuthorized && userName ? (
          <div>
            <ul className="flex gap-10 px-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="flex">
                <NavLink
                  to="/newPost"
                  className={({ isActive }) =>
                    isActive ? "text-black flex justify-center items-center" : "text-gray-400 hover:text-black flex justify-center items-center"
                  }
                >
                  <MdOutlineOpenInNew />
                  New Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? "text-black flex justify-center items-center" : "text-gray-400 hover:text-black flex justify-center items-center " 
                  }
                >
                  <IoSettingsOutline />
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/article"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }
                >
                  {userName}
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <ul className="flex gap-5 px-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
