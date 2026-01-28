import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import CreateTweet from "./CreateTweet";
import TweetCard from "./TweetCard";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
    fetchTweets();
  }, []);

  const fetchUser = async () => {
    const res = await axios.get("/api/me", {
      withCredentials: true,
    });
    setUser(res.data);
  };

  const fetchTweets = async () => {
    const res = await axios.get("/api/tweets", {
      withCredentials: true,
    });
    setTweets(res.data);
  };

  const removeTweet = (id) => {
    setTweets((prev) => prev.filter((t) => t._id !== id));
  };

  const updateTweet = (updatedTweet) => {
    setTweets((prev) =>
      prev.map((t) => (t._id === updatedTweet._id ? updatedTweet : t))
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-cyan-500 flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="w-[90%] max-w-xl mx-auto pt-4">
        

          {tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              currentUserId={user.id}
              onDelete={removeTweet}
              onUpdate={updateTweet}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
