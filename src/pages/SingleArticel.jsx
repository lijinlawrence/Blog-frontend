import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import profileImage from "../assets/profileimage.png";
import { BASE_URL } from "../services/baseUrl";


const SingleArticle = () => {
  const { id } = useParams(); // Get the article ID from URL params
  const [article, setArticle] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/posts/${id}`
        );
        setArticle(response.data); 
        console.log(article);
        // Set the fetched article to state
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle(); // Call the fetchArticle function when the component mounts
  }, [id]); // Include id in the dependency array to re-fetch article when ID changes

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/api/posts/${id}`,
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
      }else{
          navigate('/user/article')
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

  // Render loading message while fetching article
  if (!article) {
    return <div>Loading...</div>;
  }

  // Render article details
  return (
    <div>
      <div className="h-[30%] w-full bg-gray-950     py-12 flex justify-center items-start flex-col">
        <div className=" w-3/4 mx-auto">
          <h1 className="text-4xl text-white ">{article.title}</h1>
          <div className=" flex gap-5 mt-5 items-center">
            <div className=" flex">

            <img src={profileImage} alt="" className="w-10 h-10" />
              <div>
              <h1 className="text-green-500 hover:underline hover:text-gray-400">
                {article.name || "Author Name"}
              </h1>
              <p className="font-thin text-xs text-gray-400">
                {new Date(article.createdAt).toDateString()}
              </p>
              </div>
            </div>

            <div className="flex gap-3" >
            <Link to={`/editArticle/${article._id}`}>  <button className="btn w-36 btn-sm  bg-transparent text-white hover:text-black  ">
                <CiEdit />
                Edit Article
              </button></Link>
              <button  onClick={() => handleDelete(article._id)} className="btn w-36 btn-sm bg-transparent border-red-500 text-red-700 hover:text-white hover:bg-red-500  ">
                <MdDelete />
                Delete Article
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 mx-auto py-5">
        <h1 className="text-2xl font-bold"></h1>
        <p className="text-2xl font-bold">{article.about}</p>
        {/* Additional article details can be displayed here */}
        <p className=" mt-5">{article.body}</p>
        <div className="flex cursor-pointer gap-2 mt-5">
                    {article.tags.map((tag, index) => (
                      <p
                        key={index}
                        className="h-6 text-xs border-2 text-center rounded-2xl px-2 bg-transparent"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                  <hr className=" mt-6" />

                  <div className=" flex gap-5 mt-5 items-center justify-center  ">
            <div className=" flex">

            <img src={profileImage} alt="" className="w-10 h-10" />
              <div>
              <h1 className="text-green-500 hover:underline hover:text-gray-400">
                {article.name || "Author Name"}
              </h1>
              <p className="font-thin text-xs text-gray-400">
                {new Date(article.createdAt).toDateString()}
              </p>
              </div>
            </div>

            <div className="flex gap-3" >
            <Link to={`/editArticle/${article._id}`}>  <button className="btn w-36 btn-sm  bg-transparent  hover:text-black  ">
                <CiEdit />
                Edit Article
              </button></Link>
              <button  onClick={() => handleDelete(article._id)} className="btn w-36 btn-sm bg-transparent border-red-500 text-red-700 hover:text-white hover:bg-red-500  ">
                <MdDelete />
                Delete Article
              </button>
            </div>
          </div>
      </div>
   

    </div>
  );
};

export default SingleArticle;
