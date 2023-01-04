import React from "react";

const Header = () => {
  return (
    <header classNameName="w-full bg-gray-300 py-2">
      <ul className="flex justify-between">
        <li className="mr-3">
          <h1 className="font-bold text-3xl px-4">Buy Me a Coffe - DApp</h1>
        </li>

        <li className="mr-3">
          <a
            className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed"
            href="#"
          >
            Disabled Pill
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
