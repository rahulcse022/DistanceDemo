import { useWeb3React } from "@web3-react/core";
import { Modal } from "antd";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
const WalletModel = ({ model }) => {
  const [switchModal, setSwicthModal] = React.useState(model);
  const [showModal, setShowModal] = React.useState(switchModal);

  const { login, mobileLogin } = useAuth();
  const { active } = useWeb3React();
  return (
    <>
      {showModal && !active ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <div
                    className="text-slate-500 text-lg leading-relaxedcursor-pointer flex items-center  justify-start"
                    onClick={login}>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/mm.png"}
                      width={300}
                      className="cursor-pointer"
                    />
                  </div>
                  <div
                    className="text-slate-500 text-lg leading-relaxed cursor-pointer flex items-center justify-start"
                    onClick={mobileLogin}>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/wcc.png"}
                      width={300}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex justify-center items-center justify-end p-6 border-t border-solid border-slate-200 bg-black">
                  <button
                    className="text-orange-500 text-2xl flex justify-center background-transparent font-bold uppercase px-6 py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default WalletModel;
