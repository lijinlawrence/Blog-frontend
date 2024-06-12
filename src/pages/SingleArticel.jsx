import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import profileImage from "../assets/profileimage.png";
import { BASE_URL } from "../services/baseUrl";
import { io } from "socket.io-client";

const socket = io(BASE_URL, {
  reconnection: true,
});

const SingleArticle = () => {
  const { id } = useParams(); // Get the article ID from URL params
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/posts/${id}`);
      setArticle(response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const handleAddComment = async () => {
   

    const confirmation = window.confirm("Are you sure you want to delete this post?");
    if (!confirmation) return;

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        `${BASE_URL}/api/posts/comments/${id}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setComment("");
        socket.emit("comment", response.data.post.comments);
        fetchArticle()
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = sessionStorage.getItem("token");

    try {
    const resposnse=  await axios.delete(`${BASE_URL}/api/posts/${id}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(resposnse.status===200){
        fetchArticle();
        alert("Comment Deleted Successfully")


      }

      socket.emit("commentDeleted", { postId: id, commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDelete = async (articleId) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.delete(`${BASE_URL}/api/posts/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        alert("Article Deleted Successfully");
        navigate('/'); // Navigate to the homepage or any other page after deletion
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };



  useEffect(() => {
    fetchArticle();
  }, [id]);

  useEffect(() => {
    socket.on("new-comment", (newComments) => {
      setComments(newComments);
    });

    socket.on("comment-deleted", ({ postId, commentId }) => {
      if (postId === id) {
        setComments((prevComments) => prevComments.filter((c) => c._id !== commentId));
      }
    });

    return () => {
      socket.off("new-comment");
      socket.off("comment-deleted");
    };
  }, [id]);

  if (!article) {
    return (
      <div className=" flex justify-center items-center text-3xl h-screen">
        Loading <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="h-[30%] w-full bg-gray-950 py-12 flex justify-center items-start flex-col">
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

            <div className="flex gap-3">
              <Link to={`/editArticle/${article._id}`}>
                <button className="btn w-36 btn-sm bg-transparent text-white hover:text-black">
                  <CiEdit />
                  Edit Article
                </button>
              </Link>
              <button
                onClick={() => handleDelete(article._id)}
                className="btn w-36 btn-sm bg-transparent border-red-500 text-red-700 hover:text-white hover:bg-red-500"
              >
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
        <p className="mt-5">{article.body}</p>
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
        <hr className="mt-6" />

        <div className="flex justify-center items-center flex-col">
          <textarea
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write Your Comments"
            value={comment}
            className="textarea textarea-bordered textarea-md w-full max-w-lg mt-5"
          ></textarea>
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={handleAddComment}
              className="btn btn-xs bg-green-500 text-white"
            >
              Post Comments
            </button>
          </div>
          <div className="w-2/4 mt-5">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="border-b py-2 flex justify-between items-center "
              >
                <div>
                  <p>{comment.text}</p>
                  <div className="">
                    <div className="flex gap-3 text-xs w-full text-gray-400">
                      <p className="">{comment.postedBy.name}</p>
                      <p>{new Date(comment.created).toDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <span onClick={() => handleDeleteComment(comment._id)}>
                    <button className="btn text-red-500">
                      <MdDelete />
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
