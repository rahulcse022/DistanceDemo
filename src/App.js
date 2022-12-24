import { useWeb3React } from "@web3-react/core/dist";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WalletModel from "./components/Model";
import PurchaseMetacade from "./components/PurchaseMetacade";
import useAuth from "./hooks/useAuth";

function App() {
  return (
    <div className="App relative">
      <Header />
      <main className=" ">
        {/* <HeroSection /> */}
        {/* <!-- Metacode Start --> */}
        {/* <Section2 /> */}
        <PurchaseMetacade />
        {/* <Section3 />
        <Section4 /> */}
        {/* metacash */}
        {/* <Section5 /> */}
        {/* <MetaCashFooter /> */}
      </main>
      <Footer />
      <TopBtn />
    </div>
  );
}
const HeroSection = () => {
  return (
    <>
      <div
        // className={` bg-no-repeat bg-[url(${
        //   process.env.PUBLIC_URL + "/assets/images/new/hero-header.png"
        // })] py-[20px] md:py-[100px] bg-bottom`}
        className={` bg-no-repeat bg-[url(${
          process.env.PUBLIC_URL + "/assets/images/new/hero-header.png"
        })] py-[20px] min-h-[580px] bg-bottom`}
        style={{ backgroundSize: "100% 500px" }}>
        <div>
          <h2
            className="pt-[20px] md:pt-[100px] mt-[20px] mx-auto font-bold  text-5xl text-[#b231c4]"
            style={{
              textShadow:
                "2px 2px 2px #fff, 2px 2px 2px #fff, 2px 2px 2px #fff, 2px 2px 4px #fff",
              letterSpacing: "2px",
            }}>
            JOIN PRESALE
          </h2>
        </div>
        <div className="flex justify-center py-[30px] md:py-[50px]">
          <div>
            <a href="https://www.metacade.co/whitepaper.pdf" target="_blank">
              {" "}
              <img
                alt="fd"
                src={
                  process.env.PUBLIC_URL + "/assets/images/new/wp-active.png"
                }
              />
            </a>
          </div>

          <div>
            <a
              href="https://www.metacade.co/pages/buy-metacade.html"
              target="_blank">
              <img
                alt="fd"
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/new/how-to-active.png"
                }
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
const Section2 = () => {
  const { login, mobileLogin } = useAuth();
  const [model, setModel] = useState(false);
  const handleModel = () => {
    console.log("in this model");
    setModel(!model);
  };

  return (
    <>
      {console.log(model)}
      {model ? <WalletModel model={model} /> : null}
      <div
        className={` bg-auto bg-[url(${
          process.env.PUBLIC_URL + "/assets/images/new/brown-dots-down.png"
        })] h-[80px] bg-center`}></div>
      <div className="px-5 max-w-[1300px] mx-auto">
        <div className="flex-column my-[60px] justify-center gap-[50px] md:flex">
          <div className="text-left uppercase flex-1 ">
            <div style={{ fontFamily: "goshareg" }}>
              <h2 className="text-5xl">
                GET IN EARLY TO RECEIVE MORE{" "}
                <span className="text-[#f66329]">MCADE </span>
                <br />
                FOR YOUR MONEY
              </h2>

              <p className="text-2xl pt-[50px]">EXAMPLE</p>
              <p className="text-[#f6c929] text-lg">
                Beta sale: YOU GET 125 MCADE FOR 1 USDT{" "}
              </p>
              <p className="text-[#009fe3] text-lg">
                STAGE 8: YOU GET 50 MCADE FOR 1 USDT
              </p>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="max-w-[500px] w-full mx-auto mr-0">
              <div className="mb-5">
                {/* <a href="https://buy.metacade.co"> */}
                <img
                  src="assets/images/new/connect-wallet-active.png"
                  className=""
                  alt="btn-connect"
                  onClick={handleModel}
                  style={{ cursor: "pointer" }}
                />
                {/* </a> */}
              </div>
              <div
                className="bg-[#b231c4] border-4 border-white max-w-[570px] w-full uppercase p-10 w-full text-left "
                style={{ fontFamily: "goshareg" }}>
                <p className="md:text-5xl">140,000,000</p>
                <p className="mb-[50px] text-3xl">MCADE REMAINING IN BETA </p>

                <p className="text-3xl">NEXT STAGE PRICE INCREASE</p>
                <p className="text-2xl">1 USDT = 100 MCADE</p>
              </div>
            </div>
          </div>
        </div>

        {/* metaearlyfig */}
        <div className="flex-column my-[60px] justify-center gap-[50px] items-end md:flex">
          <div className="flex-1">
            <div className="text-left">
              <h4 className="text-3xl">BETA SALE: 0 / 140,000,000</h4>
              <p className="text-lg pb-3">1 USDT = 125 MCADE</p>
              <img
                src={process.env.PUBLIC_URL + "assets/images/new/raise-bar.png"}
                alt=""
                className="max-w-[550px] w-full "
              />
            </div>
          </div>
          <div className="flex-1 text-right">
            <div class="early-column">
              <div class="stagetotal ">
                <p className="text-2xl">TOTAL AMOUNT</p>
                <p className="text-2xl"> RAISED</p>
                <h3 className="text-3xl md:text-5xl">$00,000,000</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Section3 = () => {
  const [usdtPrice, setUSDTstate] = useState(1);
  const [presale, setPresale] = useState(125);
  return (
    <>
      <div
        className={` bg-auto bg-[url(${
          process.env.PUBLIC_URL + "assets/images/new/black-dots-up.png"
        })] h-[80px] bg-center`}></div>
      <div className="">
        <img
          alt="fsdkjf"
          className="mx-auto pb-[50px] max-w-[900px] w-full"
          src={process.env.PUBLIC_URL + "assets/json/spacefire.gif"}
        />
        <div className="border-2 border-white max-w-[1300px] mx-auto rounded-md mb-[50px] ">
          <div className="bg-[#ff6837] text-xl md:text-3xl py-[20px] ">
            <h2
              style={{
                fontFamily: "8bitfont",
                fontWeight: "bold",
              }}>
              PRESALE PURCHASE CALCULATOR
            </h2>
          </div>
          <div className="bg-[#f6c929] px-[40px] py-[60px] ">
            <div className="my-[30px] flex-column gap-2 justify-center md:flex bitfont">
              <div className="flex-1 flex items-center bg-white rounded-lg p-3py-1 px-2 justify-end">
                <input
                  id="USDT"
                  className="bg-transparent "
                  name="USDT"
                  type="text"
                  defaultValue={1}
                  style={{
                    textAlign: "right",
                    fontFamily: "initial",
                    paddingRight: "10px",
                  }}
                  onChange={(e) => {
                    console.log("USDT:", e.target.value);
                    setUSDTstate(e.target.value);
                  }}
                />
                USDT
              </div>
              <select
                onChange={(e) => setPresale(e.target.value)}
                className=" w-full flex-1 flex items-center font-bold bg-[#b231c4] p-10 text-xl text-black py-1 px-2 rounded-md border-2 text-white  ">
                <option value="125">PRESALE BETA</option>
                <option value="100">STAGE 1</option>
                <option value="83">STAGE 2</option>
                <option value="77">STAGE 3</option>
                <option value="71">STAGE 4</option>
                <option value="64">STAGE 5</option>
                <option value="58">STAGE 6</option>
                <option value="54">STAGE 7</option>
                <option value="50">STAGE 8</option>
              </select>
              <div
                className="inline-flex items-center justify-center bg-[#009fe3] rounded-lg py-1 px-2 border-2 text-white text-center  mx-auto md:m-0 "
                style={{
                  boxShadow: "inset 0 0 5px #009fe3",
                  fontFamily: "8bitfont",
                  fontWeight: "bold",
                }}>
                CONVERT
              </div>
              <div className="flex-1 flex items-center bg-white rounded-lg py-1 px-2 justify-end ">
                <input
                  id="USDT"
                  className="bg-transparent "
                  name="USDT"
                  type="text"
                  value={usdtPrice * presale}
                  disabled={true}
                  style={{
                    paddingRight: "10px",
                    textAlign: "right",
                    fontFamily: "initial",
                    paddingRight: "10px",
                  }}
                />
                <span>MCADE</span>
              </div>
            </div>
            <p className=" text-xl text-black uppercase goshareg">
              Get your early bird tokens now! Use our calculator to compare
              stage prices and see <br />
              how much you can gain!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const Section4 = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <div
              className={`max-w-[600px] mx-auto  py-[20px] md:px-[100px] rounded-md border-2 border-white    bg-[url(${
                process.env.PUBLIC_URL + "assets/images/new/dot-back.png"
              })]`}>
              <p className=" text-xl mb-[20px] goshareg">
                For the latest announcements join us on...
              </p>
              <div className="flex justify-center gap-5 items-center">
                <button className="bg-[#0064C8] px-5  py-2 rounded-md    ">
                  <i class="fa-brands fa-telegram  text-[#0064C8]"></i>{" "}
                  <span className="text-white font-bold ">TELEGRAM</span>
                </button>
                <button className="bg-[#0064C8] px-5  py-2 rounded-md   ">
                  <i class="fa-brands fa-discord text-[#0064C8]"></i>{" "}
                  <span className="text-white font-bold ">DISCORD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-[600px] goshareg mx-auto rounded-md border-2 bg-[#b231c4] py-5 my-10">
            <p className="text-xl ">MCADE Contract address</p>
            <p className="text-[10px] md:text-xl flex gap-2  p justify-center my-3">
              <span className="bg-[#832590] rounded-sm p-2">
                0xAB20074b1908C162c5AA9A207D2a389412781498
              </span>
              <button className="bg-[#832590] rounded-sm p-2">
                <i class="fa-regular fa-copy"></i>
              </button>
            </p>
            <p className="text-xl">Decinmals: 9</p>
          </div>
        </div>
      </div>
    </>
  );
};
const MetaCashFooter = () => {
  return (
    <>
      <div
        className={` bg-no-repeat bg-[url(${
          process.env.PUBLIC_URL + "assets/images/new/footer-hero.jpg"
        })] py-[20px] min-h-[500px] bg-bottom`}
        style={{ backgroundSize: "100% 500px" }}>
        <div>
          <img
            alt="fd"
            className="pt-[20px] md:pt-[60px] mx-auto  max-w-[500px] w-full "
            src={process.env.PUBLIC_URL + "/assets/images/full_logo.gif"}
          />
        </div>
        <div className="flex justify-center py-[30px] md:py-[70px]">
          <div>
            <a href="https://www.metacade.co/whitepaper.pdf" target="_blank">
              {" "}
              <img
                alt="fd"
                src={
                  process.env.PUBLIC_URL + "/assets/images/new/wp-active.png"
                }
              />
            </a>
          </div>

          <div>
            <a
              href="https://www.metacade.co/pages/buy-metacade.html"
              target="_blank">
              <img
                alt="fd"
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/new/how-to-active.png"
                }
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
const Section5 = () => {
  return (
    <>
      <div
        className={` bg-auto bg-[url(${
          process.env.PUBLIC_URL + "/assets/images/new/orange-dots-up.png"
        })] h-[80px] bg-center`}></div>

      <div className="bg-[#f66329]">
        <div className="py-[80px]">
          <p
            className=" pb-[40px] px-3 text-2xl"
            style={{ fontFamily: "goshareg" }}>
            audited by solid proof and verified by coinsnipper
          </p>
          <div className="max-w-[1000px] mx-auto grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/new/100percent.png"
                  }
                  alt=""
                  className="mx-auto"
                />
              </div>
            </div>
            <div>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/new/solid-proof.png"
                  }
                  alt=""
                  className="mx-auto"
                />
              </div>
            </div>
            <div>
              <div>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/new/code-sniper.png"
                  }
                  alt=""
                  className="mx-auto"
                />
              </div>
            </div>
            <div>
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/new/certik.png"}
                  alt=""
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={` bg-auto bg-[url(${
            process.env.PUBLIC_URL + "/assets/images/new/plum-dots-up.png"
          })] h-[80px] bg-center`}></div>
      </div>
    </>
  );
};
const TopBtn = () => {
  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);
  function scrollFunction() {
    let mybutton = document.getElementById("myBtn");

    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <>
      <div
        onClick={topFunction}
        id="myBtn"
        className=" top-btn cursor-pointer  p-5 inline-block rounded-md fixed  z-100 right-[50px] bottom-[50px]   bg-[#f6c929]">
        Top
      </div>
    </>
  );
};

export default App;
