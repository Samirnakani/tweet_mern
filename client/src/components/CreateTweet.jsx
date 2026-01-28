import React, { useRef, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { FaImage } from "react-icons/fa";
const CreateTweet = ({ onTweetCreated }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("/api/tweets", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setText("");
      setImage(null);
      fileRef.current.value = "";
      onTweetCreated(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-500 flex flex-col gap-10">
      <Navbar />
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-xl p-4 shadow w-1/2 mx-auto mb-4"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={280}
          placeholder="What's happening?"
          className="w-full resize-none border rounded-md p-2 focus:outline-none"
          rows={3}
        />

        <p className="text-xs text-gray-500 text-right">{text.length}/280</p>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              <FaImage />
              <span className="text-sm">Photo</span>
            </button>

            {image && (
              <span className="text-xs text-gray-500 truncate max-w-37.5">
                {image.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold disabled:opacity-50"
          >
            {loading ? "Posting..." : "Tweet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTweet;
