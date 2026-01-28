import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000";

const TweetCard = ({ tweet, currentUserId, onDelete, onUpdate }) => {
  const isOwner = String(tweet.author._id) === String(currentUserId);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(tweet.text);
  const [loading, setLoading] = useState(false);

  const deleteTweet = async () => {
    await axios.delete(`/api/tweets/${tweet._id}`, {
      withCredentials: true,
    });
    onDelete(tweet._id);
  };

  const updateTweet = async () => {
    if (!editText.trim()) return;

    try {
      setLoading(true);
      const res = await axios.put(
        `/api/tweets/${tweet._id}`,
        { text: editText },
        { withCredentials: true }
      );
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <div className="flex items-center gap-3">
          <img
            src={
              tweet.author.profilePic
                ? `${API_BASE}${tweet.author.profilePic}`
                : "/default-avatar.png"
            }
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">{tweet.author.uname}</p>
            <p className="text-xs text-gray-500">
              {new Date(tweet.createdAt).toLocaleString()}
            </p>
          </div>

          {isOwner && (
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
              >
                Edit
              </button>
              <button
                onClick={deleteTweet}
                className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p className="mt-3 whitespace-pre-wrap">{tweet.text}</p>

        {tweet.image && (
          <div className="mt-3 flex justify-center bg-gray-400">
            <img
              src={`${API_BASE}${tweet.image}`}
              alt="tweet"
              className="rounded-lg max-h-80 object-cover"
            />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-4">
            <h3 className="font-semibold mb-2">Edit Tweet</h3>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              maxLength={280}
              rows={4}
              className="w-full border rounded-md p-2"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateTweet}
                disabled={loading}
                className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetCard;
