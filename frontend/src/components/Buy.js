import { ethers } from "ethers";
import React from "react";

const Buy = ({ state }) => {
  const buyChai = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    // const paisa = document.querySelector("#amount").value;
    const paisaInEth = {value: ethers.utils.parseEther("0.0001")};
    console.log(name, message);
    
    const transaction = await contract.buyChai(name, message,paisaInEth);
    await transaction.wait();
    console.log("Tx Done");
  };

  return (
    <>
      <form action="" onSubmit={buyChai}>
        <label>Name</label>
        <input type="text" id="name" placeholder="Your name" />
        <label>  Message</label>
        <input type="text" id="message" placeholder="Your message" />
        {/* <label>  ⟠Amount:</label>
        <input type="number" id="amount" placeholder="Enter Amount in ETH" /> */}
        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default Buy;
