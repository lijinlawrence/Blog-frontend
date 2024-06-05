  import React, { useContext, useEffect, useState } from "react";
  import { FaHeart, FaRegTrashAlt } from "react-icons/fa";
  import profileImage from "../assets/profileimage.png";
  import { deleteUserPostApi, userPostApi } from "../services/allApi";
  import { AddPostResponseContext } from "../context/contextShare";
  import axios from "axios";
  import { Link, useParams } from "react-router-dom";

  const MyArticle = () => {
    const { addPostResponse, setAddPostResponse } = useContext(
      AddPostResponseContext
    );
    const [userPosts, setUserPosts] = useState([]);

  
   



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

    // const handleDelete = async (id) => {
    //   const token = sessionStorage.getItem("token");
    //   const reqHeader = {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   };

    //   try {
    //     const result = await deleteUserPostApi(id, reqHeader);
    //     if (result.status === 200) {
    //       getUserPosts(); // Fetch the updated posts list
    //     } else {
    //       console.error(result.response.data.message);
    //     }
    //   } catch (error) {
    //     console.error(error.message);
    //   }
    // };



    // delete Article

    const handleDelete = async (id) => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:7000/api/posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        const confirmation = window.confirm(
          "Are You sure You Want delete this post "
        );

        if (!confirmation) {
          return;
        }
        if (response.status === 200) {
          await getUserPosts();
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  

    return (
      <div className="w-3/4 mx-auto">
        {userPosts?.length > 0? (
          userPosts.map((article) => (
            <div className="py-5" key={article._id}>
              <div className="flex justify-between py-5">
                <div className="flex gap-5">
                  <img src={profileImage} alt="" className="w-10 h-10" />
                  <div>
                    <h1 className="text-green-500 hover:underline hover:text-gray-400">
                      {article.name || "Author Name"}
                    </h1>
                    <p className="font-thin text-xs">
                      {new Date(article.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                <div className="gap-5 flex">
                  <button className="btn bg-transparent border-green-500 hover:bg-green-500 hover:text-white text-green-500 text-xs">
                    <FaHeart />
                    {article.likes || 0}
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn bg-transparent border-red-500 hover:bg-red-500 hover:text-white text-red-500 text-xs"
                  >
                    <FaRegTrashAlt />
                    delete
                  </button>
                </div>
              </div>
              <div>
              <Link to={`/single/${article._id}`}><h1 className="text-2xl font-bold">{article.title}</h1>
                <p className="font-thin">{article.about}</p></Link>  
                <br />
                <br />
                <div className="flex justify-between">
                <Link to={`/single/${article._id}`}><span>read more...</span></Link>  
                  <div className="flex cursor-pointer gap-2">
                    {article.tags.map((tag, index) => (
                      <p
                        key={index}
                        className="h-6 text-xs border-2 text-center rounded-2xl px-2 bg-transparent"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        ):<div className=" flex justify-center items-center text-4xl">No Posts Found</div>}
      
      </div>
    );
  };

  export default MyArticle;
