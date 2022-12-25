import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";

import useAuth from "../hooks/useAuth";
import WalletModel from "./Model";
function Header() {
  const { active, account } = useWeb3React();
  const { logout } = useAuth();
  const [model, setModel] = useState(false);
  const handleModel = () => {
    console.log("in this model");
    setModel(!model);
  };

  return (
    <div className="bg-[#00004c] fixed w-full">
      {model ? <WalletModel model={model} /> : null}
      <div className="h-[80px] max-w-[1350px] mx-auto flex justify-between items-center px-5">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/images/heavylogo.png"}
            alt="logo"
            className="w-[200px]"
          />
        </div>

        <div>
          {" "}
          {!active ? (
            <p
              className="cursor-pointer  p-4 bitfont inline-block px-[20px] py-[10px] items-center justify-center mx-2 bg-[#ff3196] text-xl rounded-lg py-1 px-2 border-2 text-white text-center  mx-2 md:m-2 "
              onClick={handleModel}>
              Connect Wallet
            </p>
          ) : (
            <button onClick={(e) => logout()}>
              <p className="cursor-pointer  bitfont text-xl inline-block px-[20px] py-[10px] items-center justify-center mx-2 bg-[#ff3196] rounded-lg py-1 px-2 border-2 text-white text-center  mx-2 md:m-2 ">
                {account.slice(0, 4) + "...." + account.slice(38, 42)}
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
