import React from "react";
import { useState, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const web3_ = new Web3(window.ethereum);

const Header = () => {
  const { login, logout } = useAuth();

  const { active } = useWeb3React();
  const [windowWidth, setWindowWidth] = useState(window.pageYOffset);

  const handleResize = () => {
    setWindowWidth(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  const [navbar, setNavbar] = useState(false);

  return (
    <div className="header border-b drop-shadow-2x sticky top-0 z-[999]">
      <nav className="w-full bg-[#262425] text-white">
        <div className="justify-between  px-2 py-2 md:px-4 py-4 mx-auto lg:max-w-[1700px] md:items-center md:flex md:px-8 gap-5">
          <div className="flex items-center justify-between md:block">
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "./assets/logos/logometa.gif"}
                width="300px"
              />
            </Link>
            <div className={"md:hidden "}>
              <button
                className="p-2 rounded-md outline-none "
                onClick={() => setNavbar(!navbar)}
                style={{ color: "#ff3196" }}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={` md:flex items-center justify-center gap-[30px] ${
              navbar ? "block" : "hidden"
            }`}>
            <div>
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-3 md:space-y-0 m-0">
                <li className="text-white-600 uppercase hover:text-blue-600">
                  <a
                    href="javascript:void(0)"
                    className="text-white text-md lg:text-xl">
                    <div className="">
                      <button class="peer px-1 py-2  text-white hover:text-blue-600">
                        <span className="hidden xl:block">HOW TO BUY </span>
                        <span className="block xl:hidden ">BUY</span>
                        <div className="hidden peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                          <a className="px-5 py-3 hover:bg-gray-200" href="#">
                            About Us
                          </a>
                          <a className="px-5 py-3 hover:bg-gray-200" href="#">
                            Contact Us
                          </a>
                          <a className="px-5 py-3 hover:bg-gray-200" href="#">
                            Privacy Policy
                          </a>
                        </div>
                      </button>

                      <div className="hidden absolute peer-hover:flex hover:flex flex-col bg-[#b231c4] drop-shadow-lg">
                        <Link
                          to="/how-trust"
                          className="px-2 py-2 text-black hover:bg-gray-200">
                          How to set up TrustWallet
                        </Link>
                        <Link
                          to="/how-metamask"
                          className="px-2 py-2 text-black hover:bg-gray-200">
                          How to set up Metamask
                        </Link>
                        <Link
                          to="/how-eth"
                          className="px-2 py-2 text-black hover:bg-gray-200">
                          How to buy with ETH
                        </Link>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="text-white-600 uppercase hover:text-blue-600">
                  <a
                    href="https://metacade.co/whitepaper.pdf"
                    target="_blank"
                    className="text-white  text-md lg:text-xl">
                    whitepaper
                  </a>
                </li>
                <li className="text-white-600 uppercase hover:text-blue-600">
                  <a
                    href="https://metacade.co/audit.pdf"
                    className="text-white   text-md lg:text-xl"
                    target="_blank">
                    Audit
                  </a>
                </li>

                <li className="text-white-600 uppercase hover:text-blue-600">
                  <Link
                    to="/press"
                    // href="https://luckyblock.com/press/"
                    className="text-white   text-md lg:text-xl">
                    press
                  </Link>
                </li>

                <li className="text-white-600 uppercase hover:text-blue-600">
                  <Link
                    to="/claim"
                    // href="https://luckyblock.com/press/"
                    className="text-white   text-md lg:text-xl">
                    claim
                  </Link>
                </li>
                <li className="text-white-600 uppercase hover:text-blue-600">
                  <a
                    href="https://metacade.co/audit.pdf"
                    target="_blank"
                    className="text-white   text-md lg:text-xl">
                    store
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-3 md:space-y-0 m-0">
                <li className="relative text-white-600 uppercase hover:text-blue-600">
                  <a href="javascript:void(0)">
                    <img
                      className="relative  md:w-full w-auto mx-auto"
                      src={process.env.PUBLIC_URL + "./assets/header_btn.png"}
                    />
                    <i className="absolute flex top-[0] text-black  text-2xl h-full w-full justify-center items-center z-[100] peer px-2 py-2  text-white hover:text-blue-600">
                      <FaGlobe />
                    </i>
                    <div className="hidden absolute peer-hover:flex hover:flex flex-col bg-yellow-600 drop-shadow-lg">
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        RUSSIAN
                      </a>

                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        TURKISH
                      </a>

                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        CHINESE (Traditional)
                      </a>

                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        CHINESE (Simplified)
                      </a>

                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        KOREAN
                      </a>

                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        ARABIC
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        JAPANESE
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="#">
                        POLISH
                      </a>
                    </div>
                  </a>
                </li>
                <li className="relative text-white-600 uppercase hover:text-blue-600">
                  <a href="javascript:void(0)">
                    <img
                      className="relative w-full  md:w-full w-auto mx-auto"
                      src={process.env.PUBLIC_URL + "./assets/header_btn.png"}
                    />
                    <i className="absolute flex top-[0] text-black  text-2xl h-full w-full justify-center items-center z-[100] peer px-2 py-2  text-white hover:text-blue-600">
                      <FiShare2 />
                    </i>
                    <div className="hidden absolute peer-hover:flex hover:flex flex-col bg-yellow-600 drop-shadow-lg">
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://twitter.com/Metacade_">
                        Coming Later today
                      </a>

                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://twitter.com/Metacade_Crypto">
                        Twitter
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://www.facebook.com/metacade">
                        Facebook
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://t.me/+rfvHWK2AfNMzMjQ0">
                        Telegram
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://www.youtube.com/channel/UCVA_TZHxuqziubGe1ExEUQg">
                        YouTube
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://discord.com/channels/@metacade">
                        Discord
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://www.instagram.com/metacade_/">
                        Instagram
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="https://www.tiktok.com/@metacade_official">
                        Tiktok
                      </a>
                      <a
                        className="px-2 py-2 text-black hover:bg-gray-200"
                        href="
                https://www.linkedin.com/company/metacade/">
                        Linkedin
                      </a>
                    </div>
                  </a>
                </li>
                <Link to="/joinpresale">
                  <li className="relative text-white-300 uppercase hover:text-blue-600  text-base">
                    <a className="" href="buy.metacade.co " target="_blank">
                      <img
                        className="relative md:w-full  mx-auto max-w-[200px] h-[60px] "
                        src={
                          process.env.PUBLIC_URL +
                          "./assets/join-presale-active.png"
                        }
                      />
                    </a>
                  </li>
                </Link>
                {!active && (
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        onClick={login}
                        className="relative md:w-full  mx-auto max-w-[200px] h-[60px]"
                        src={process.env.PUBLIC_URL + "./assets/connectbtn.png"}
                        //  onMouseOver={(e) =>
                        //       (e.currentTarget.src =
                        //         process.env.PUBLIC_URL +
                        //         "./assets/join-presale-hover.png")
                        //     }
                        //     onMouseOut={(e) =>
                        //       (e.currentTarget.src =
                        //         process.env.PUBLIC_URL + "./assets/connectbtn.png")
                        //     }
                      />
                    </a>
                  </li>
                )}

                {active && (
                  <li>
                    <a href="javascript:void(0)">
                      <img
                        onClick={logout}
                        className="relative md:w-full  mx-auto max-w-[200px] h-[60px]"
                        src={process.env.PUBLIC_URL + "./assets/disconnect.png"}
                        //  onMouseOver={(e) =>
                        //       (e.currentTarget.src =
                        //         process.env.PUBLIC_URL +
                        //         "./assets/join-presale-hover.png")
                        //     }
                        //     onMouseOut={(e) =>
                        //       (e.currentTarget.src =
                        //         process.env.PUBLIC_URL + "./assets/connectbtn.png")
                        //     }
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
