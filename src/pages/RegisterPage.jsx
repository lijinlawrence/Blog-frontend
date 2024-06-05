import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthorizationContext } from "../context/tokenAuth.jsx";
import { registerApi } from "../services/allApi.js";

const RegisterPage = () => {
  const { isAuthorized, setIsAuthorized } = useContext(
    tokenAuthorizationContext
  );
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      alert("please fill the missing field");
    } else {
      const result = await registerApi(userData);
      console.log(result);

      if (result.status === 201) {
        alert(`${result.data.name} has successfully registered`);
        setUserData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      } else {
        alert("Email Already registerd");
      }
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen flex-col gap-5 w-2/4 mx-auto">
      <h1 className=" text-4xl font-bold">Sign up</h1>
      <p>
        <Link to="/login" className=" text-green-400 hover:underline">
          Have an Account?
        </Link>{" "}
      </p>
      <div className="  flex flex-col w-full mx-autojustify-center items-center gap-5 ">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-lg h-14"
          value={userData.name}
          onChange={(e) => {
            setUserData({
              ...userData,
              name: e.target.value,
            });
          }}
        />

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
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
