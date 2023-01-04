import React from "react";
import { useState, useEffect } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);
  console.log(memos);
  return (
    <>
      <div className="grid h-2 place-items-center">
      <p className="font-bold text-4xl ">Messages:👇🏽</p>
      {memos.map((memo) => {
        return (
            <table >
              <thead >
                <th className="px-6 py-1 rounded-l-lg">Name</th>
                <th className="px-6 py-1">Message</th>
                <th className="px-6 py-1 ">TImestamp</th>
                <th className="px-6 py-1 rounded-l-lg">Wallet Address</th>
              </thead>
              <tbody>
                <tr className="">
                  <td>{memo.name}</td>
                  <td>{memo.message}</td>
                  <td>{new Date(memo.timestamp * 1000).toLocaleString()}</td>
                  <td>{memo.from}</td>
                </tr>
              </tbody>
            </table>
        );
    })}
    </div>
    </>
  );
};

export default Memos;
