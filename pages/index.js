import { useEffect, useState } from "react";
import Image from "next/image";
import Web3 from "web3";
import Router from "next/router";
import logo from "..//public/logo.png";

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isConnected) {
      Router.push("/profile");
    }
  }, [isConnected]);

  const connect = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setWeb3(web3);
      setAccount(accounts[0]);
      setIsConnected(true);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const disconnect = async () => {
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      await window.ethereum.close();
      setWeb3(null);
      setAccount(null);
      setIsConnected(false);
    }
  };

  return (
    <>
      <div className="relative h-screen overflow-x-hidden bg-gradient-to-t from-primary to-primary">
        <link rel="icon" href="/favicon.ico" />
        <nav className="flex justify-between bg-primary p-6 text-2xl">
          <div className="flex-1 text-left">
            <Image src={logo} alt="Logo" className="w-10 h-10 mr-2" />
            <h1 className="text-white">Pandora</h1>
          </div>
          <div className="flex-1 text-right">
            <button
              className="text-secondary px-2 py-1 rounded hover:bg-primary-dark mx-auto  md:inline-block"
              onClick={isConnected ? disconnect : connect}
            >
              {isConnected ? "Disconnect" : "Connect"}
            </button>
          </div>
        </nav>
        <div className="px-6 py-12 text-center text-secondary">
          <h1 className="mb-8 text-center font-heading text-8xl font-black bg-gradient-to-r from-gradientl to-gradientr inline-block text-transparent bg-clip-text">
            Connect, Collaborate, and Grow
          </h1>
          <p>
            Pandora is a social media platform for developers who are interested
            in blockchain technology. You can post and share content, and get
            paid with tokens based on the engagement and popularity of your
            posts. You can also vote on other people's posts, and comment to
            have conversations with the community.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
