import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthorizationContext } from "../context/tokenAuth.jsx";
import { loginApi } from "../services/allApi.js";

const LoginPage = () => {
  const { isAuthorized, setIsAuthorized } = useContext(
    tokenAuthorizationContext
  );

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = userData;

    if (!email || !password) {
      alert("please fill the missing field");
    } else {
      const result = await loginApi(userData);
      console.log(result);

      if (result.status === 200) {
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.user)
        );
        sessionStorage.setItem("token", result.data.token);

        setIsAuthorized(true);
        navigate("/");

        setUserData({
          email: "",
          password: "",
        });
      } else {
        alert("invalid email or password");
      }
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen flex-col gap-5 w-2/4 mx-auto">
      <h1 className=" text-4xl font-bold">Sign in</h1>
      <p>
        <Link to="/register" className=" text-green-400 hover:underline">
          Need an Account?
        </Link>{" "}
      </p>
      <div className="  flex flex-col w-full mx-autojustify-center items-center gap-5 ">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full max-w-lg h-14"
          value={userData.email}
          onChange={(e) => {
            setUserData({
              ...userData,
              email: e.target.value,
            });
          }}
        />

        <input
          type="text"
          placeholder="Password"
          className="input input-bordered w-full max-w-lg h-14"
          value={userData.password}
          onChange={(e) => {
            setUserData({
              ...userData,
              password: e.target.value,
            });
          }}
        />
      </div>
      <div className="  ">
        <button
          className="btn w-32  bg-green-400 text-white hover:text-black  "
          onClick={handleLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
