const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider();
const ether = new ethers.Wallet(provider);

// Define the smart contract's ABI and address
const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "commentCID",
        type: "string",
      },
    ],
    name: "addComment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "string",
        name: "postCID",
        type: "string",
      },
    ],
    name: "addPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_username",
        type: "string",
      },
    ],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commentIndex",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "newCommentCID",
        type: "string",
      },
    ],
    name: "editComment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "newPostCID",
        type: "string",
      },
    ],
    name: "editPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "postId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "string",
            name: "postCID",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "commentCIDs",
            type: "string[]",
          },
          {
            internalType: "uint256",
            name: "commentCount",
            type: "uint256",
          },
        ],
        internalType: "struct UserProfile.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commentIndex",
        type: "uint256",
      },
    ],
    name: "getCommentCID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
    ],
    name: "getPost",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "postCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "posts",
    outputs: [
      {
        internalType: "uint256",
        name: "postId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "string",
        name: "postCID",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "commentCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0x5C54c468db96EbF13810e6baB7898c0eB921bD55";

// Check if the user has MetaMask installed
if (typeof window.ethereum !== "undefined") {
  const web3 = new Ether.Web3(window.ethereum);

  // Request the user's address
  window.ethereum.enable().then(async function (addresses) {
    const userAddress = addresses[0];

    // Create a contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Interact with the smart contract

    // Example: create/update a post
    await contract.methods
      .createPost(user, postCID)
      .send({ from: userAddress });

    // Example: fetch posts of a user
    // const posts = await contract.methods.getUserPosts(userAddress).call();

    // Example: fetch posts of all users
    const allPosts = await contract.methods.getAllPosts().call();

    // Example: store/fetch a post and its CID
    // const postCID = await contract.methods.getPostCID(...).call()
  });
} else if (typeof window.web3 !== "undefined") {
  const web3 = new Ether.Web3(window.web3.currentProvider);
  const userAddress = web3.eth.defaultAccount;

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Interact with the smart contract

  // Example: create/update a post
  (async function () {
    await contract.methods
      .createPost(user, postCID)
      .send({ from: userAddress });
  })();
  // Example: fetch posts of a user
  // const posts = await contract.methods.getUserPosts(userAddress).call();

  // Example: fetch posts of all users
  (async function () {
    const allPosts = await contract.methods.getAllPosts().call();
  })();

  // Example: store/fetch a post and its CID
  // const postCID = await contract.methods.getPostCID(...).call()
} else {
  console.error(
    "Please install an Ethereum-based wallet to interact with the Ethereum network."
  );
}
