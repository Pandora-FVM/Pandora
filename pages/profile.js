import React, { useEffect, useState } from "react";
import { posts, allPosts, postCID } from "./smart-contract-functions";
import Ether from "ethers";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const provider = new Ether.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const accounts = await provider.getSigner().getAddress();
        setProvider(provider);
        setAccount(accounts);
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    if (!provider || !account) return;
    getPosts(provider, setPosts);
  }, [provider, account]);

  if (!provider || !account) {
    return (
      <div className="container mx-auto text-center py-10">
        <h1 className="text-xl font-bold">
          Please connect to a wallet to view your profile
        </h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-2">{post.content}</p>
          <div className="flex justify-between mb-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
              onClick={() => upvote(web3, account, post.id)}
            >
              Upvote
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              onClick={() => downvote(web3, account, post.id)}
            >
              Downvote
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Upvotes: {post.upvotes} Downvotes: {post.downvotes}
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Comments</h3>
            {post.comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <p className="text-gray-700">{comment.text}</p>
                <div className="text-gray-500 text-xs">
                  Commented by {comment.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
