import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthorizationContext } from "../context/tokenAuth";
import axios from "axios";
import { BASE_URL } from "../services/baseUrl";

const RegisterPage = () => {
  const { setIsAuthorized } = useContext(tokenAuthorizationContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      setError("Please fill the missing fields");
      return;
    }

    try {
      const result = await axios.post(`${BASE_URL}/api/users`, {
        name,
        email,
        password,
      });
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
        setError(result.data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5 w-2/4 mx-auto">
      <h1 className="text-4xl font-bold">Sign up</h1>
      <p>
        <Link to="/login" className="text-green-400 hover:underline">
          Have an Account?
        </Link>
      </p>
      <form className="flex flex-col w-full mx-auto justify-center items-center gap-5" onSubmit={handleRegister}>
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
          type="password"
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

        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="btn w-32 bg-green-400 text-white hover:text-black"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
