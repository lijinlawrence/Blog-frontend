import React from "react";
import { FaHeart } from "react-icons/fa";
import profileImage from "../assets/profileimage.png";

const Feeds = () => {
  return (
    <div className="w-2/4 mx-auto py-5">
      <h1>Global Feed</h1>
      <hr />
      <div className="py-5">
        <div className=" flex justify-between py-5">
          <div className=" flex gap-5">
            <img src={profileImage} alt="" className=" w-10 h-10" />
            <div>
              <h1 className=" text-green-500 hover:underline hover:text-gray-400">
                Maksin Estabin
              </h1>
              <p className=" font-thin text-xs ">january 4 2024</p>
            </div>
          </div>
          <div>
            <button className="btn bg-transparent border-green-500 hover:bg-green-500 hover:text-white text-green-500  text-xs ">
              <FaHeart />
              559
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            Ill quantify the redundant TCP bus, that should hard drive the ADP
            bandwidth!
          </h1>
          <p className=" font-thin">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum,
            fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            amet sit commodi excepturi, ratione animi repellendus provident ab
          </p>
          <br />
          <br />

          <div className="flex justify-between">
            <span>read more...</span>
            <div className=" flex cursor-pointer gap-2">
              <p className="  h-6 text-xs border-2 text-center rounded-2xl px-2   bg-transparent">
                oijrf
              </p>
              <p className="  h-6 text-xs border-2 text-center rounded-2xl px-2 justify-center items-center   bg-transparent">
                uihfbduiqdba
              </p>
              <p className="  h-6 text-xs border-2 text-center rounded-2xl px-2   bg-transparent">
                oijrf
              </p>
              <p className="  h-6 text-xs border-2 text-center rounded-2xl px-2   bg-transparent">
                oijrf
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Feeds;
