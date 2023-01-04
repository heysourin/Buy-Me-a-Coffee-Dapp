import { ethers } from "ethers";
import React from "react";
import banner from "../yellow.png";

const Buy = ({ state }) => {
    
  const buyChai = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    // const paisa = document.querySelector("#amount").value;
    const paisaInEth = { value: ethers.utils.parseEther("0.0001") };
    console.log(name, message);

    const transaction = await contract.buyChai(name, message, paisaInEth);
    await transaction.wait();
    console.log("Tx Done");
  };

  return (
    <>
      <div className="grid my-2 place-items-center">
        <form
          action=""
          onSubmit={buyChai}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs "
        >
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            //   for="username"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {" "}
            Message
          </label>
          <input
            type="text"
            id="message"
            placeholder="Your message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {/* <label>  ⟠Amount:</label>
        <input type="number" id="amount" placeholder="Enter Amount in ETH" /> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default Buy;
