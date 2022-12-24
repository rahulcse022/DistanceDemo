import React, { useState, useEffect } from "react";
import transakSDK from "@transak/transak-sdk";
import { useWeb3React } from "@web3-react/core";
import {
  GetHardCapStatus,
  GetIcoStatus,
  SaleICOToken,
  SaleICOTokenBYEtherumData,
  sellICOTokenEth,
  sellICOTokenETh,
  sellICOTokenUSDT,
} from "../../Utils/contractHelper";
import axios from "axios";
import { USDTTokenAddress } from "../../config/Contracts/contract";
import {
  GetTokonomicStatus,
  GetApprove,
  GetRefundstatus,
  getWalletBalance,
  sellICOToken,
  SaleICOTokenBYEtherum,
  Position,
} from "../../Utils/contractHelper";
import Swal from "sweetalert2";
import Web3 from "web3";
import { USDT_ABI } from "../../config/ABI/USDT_ABI";
import { InputNumber } from "antd";
import Creditcard from "./Presalecc";

const JoinPresale = () => {
  const [showModal, setShowModal] = useState(false);

  const [tokenomics, setTokenomics] = useState("");
  const [error, setError] = useState("");
  const { library, account, active } = useWeb3React();
  const [number_of_tokens, setnumber_of_tokens] = useState("");
  const [_numberOfTokens, set_numberOfTokens] = useState("");
  const [Eth, set_ETh] = useState("");
  const [position, setPosition] = useState("");
  const [isHardCapReached, setIsHardCapReached] = useState("");
  const [isSoftCapReached, setIsSoftCapReached] = useState("");
  const [isRefundCalled, setIsRefundCalled] = useState("");
  const [isIcoOver, setIsIcoOver] = useState("");
  const [ETHWalletBalance, setETHWalletBalance] = useState(0);

  useEffect(async () => {
    if (active) {
      await getWalletBalance(library.provider, account).then((res) =>
        setETHWalletBalance(parseInt(res) / Math.pow(10, 18))
      );
      setTokenomics(await GetTokonomicStatus(library.provider));

      Position(library.provider)
        .then((res) => {
          console.log(res);
          setPosition(res / Math.pow(10, 18));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setIsRefundCalled(await GetRefundstatus(library.provider));
    setIsSoftCapReached(await GetRefundstatus(library.provider));
    setIsHardCapReached(await GetHardCapStatus(library.provider));
    setIsIcoOver(await GetIcoStatus(library.provider));
  }, [active]);

  async function getFinalPrice(_currentPosition, _number_of_tokensOfTokens) {
    let presaleRate = [
      8000000000000000, 10000000000000000, 12000000000000000, 13000000000000000,
      14000000000000000, 15500000000000000, 17000000000000000,
      18500000000000000, 20000000000000000,
    ];
    let finalPrice = 0;
    for (
      let i = _currentPosition;
      i < _currentPosition + _number_of_tokensOfTokens;
      i++
    ) {
      if (i >= 0 && i <= 140000000) {
        finalPrice += presaleRate[0];
      } else if (i > 140000000 && i <= 140000000 + 157500000) {
        finalPrice += presaleRate[1];
      } else if (i > 140000000 + 157500000 && i <= 140000000 + 157500000 * 2) {
        finalPrice += presaleRate[2];
      } else if (
        i > 140000000 + 157500000 * 2 &&
        i <= 140000000 + 157500000 * 3
      ) {
        finalPrice += presaleRate[3];
      } else if (
        i > 140000000 + 157500000 * 3 &&
        i <= 140000000 + 157500000 * 4
      ) {
        finalPrice += presaleRate[4];
      } else if (
        i > 140000000 + 157500000 * 4 &&
        i <= 140000000 + 157500000 * 5
      ) {
        finalPrice += presaleRate[5];
      } else if (
        i > 140000000 + 157500000 * 5 &&
        i <= 140000000 + 157500000 * 6
      ) {
        finalPrice += presaleRate[6];
      } else if (
        i > 140000000 + 157500000 * 6 &&
        i <= 140000000 + 157500000 * 7
      ) {
        finalPrice += presaleRate[7];
      } else if (
        i > 140000000 + 157500000 * 7 &&
        i <= 140000000 + 157500000 * 8
      ) {
        finalPrice += presaleRate[8];
      }
    }

    console.log("USDT AMount  : ", finalPrice);
    console.log("USDT AMount  : ", finalPrice / 10 ** 18);

    return finalPrice;
  }

  // const SaleEth = async () => {
  //   if (active) {
  //     let ethAMT = getFinalPrice(position, number_of_tokens);
  //     console.log(ethAMT, "log is usdt");
  //     let data = await axios.get(
  //       "https://cex.io/api/last_price/" + "ETH" + "/USD"
  //     );
  //     console.log(data.data.lprice);

  //     SaleICOTokenBYEtherumData(
  //       library.provider,
  //       data.data.lprice,
  //       number_of_tokens
  //     )
  //       .send({ from: account })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     console.log(tokenomics, "this is the data");
  //     console.log(isRefundCalled, "kxvnkfnvkfdnfkdn");
  //     // console.log(vestingstatus, "vesting status");
  //     console.log(ETHWalletBalance, "this the walletr data.....");

  //     if (number_of_tokens == "" || number_of_tokens == 0) {
  //       Swal.fire("Please Add Valid Amount");
  //     } else if (new Date().getTime() / 1000 <= tokenomics[3]) {
  //       Swal.fire("ICO Sale not started yet");
  //     } else if (new Date().getTime() / 1000 > tokenomics[4]) {
  //       Swal.fire("ICO Sale ended");
  //     } else if (parseFloat(number_of_tokens) > ethAMT) {
  //       Swal.fire("Insuficient Eth Balance");
  //     } else {
  //     }
  //   } else {
  //     Swal.fire("Please Connect To The Wallet");
  //   }
  // };
  const handleInputEth = (e) => {
    let pattern = /^[0-9\b]+$/;
    if (e.target.value.match(pattern)) {
      console.log("yess");
      set_numberOfTokens(e.target.value);
    } else {
      set_numberOfTokens("");
      setError("Please input positive values");
    }
    console.log(e.target.value, "This iks input value");
  };
  const handleInputBNB = (e) => {
    let pattern = /^[0-9\b]+$/;
    if (e.target.value.match(pattern)) {
      console.log("yess");
      set_ETh(e.target.value);
    } else {
      set_ETh("");
      setError("Please input positive values");
    }
    console.log(e.target.value, "This iks input value");
  };
  const TokenSaleByUSDT = async () => {
    console.log("Token Buy with USDT called");
    console.log(JSON.stringify(isIcoOver), "Is Ico Over ");

    const d = new Date();
    let curretTime = parseInt(d.getTime() / 1000);
    let startTime = tokenomics[3];
    let EndTime = tokenomics[4];
    let SoldOutTokens = tokenomics[5];
    let hardcap = tokenomics[8];
    // console.log(curretTime, "Current Time ");
    // console.log(startTime, "startTime Time ");
    // console.log(EndTime, "EndTime Time ");
    // console.log(isRefundCalled, "Is Refund Done ");
    // console.log(_numberOfTokens, "Number of Tokens by input filed");
    // console.log(SoldOutTokens, "This is the soldouttoken");
    // console.log(hardcap / Math.pow(10, 18), "This is the hardcape");

    if (active) {
      if (isIcoOver) {
        Swal.fire("Warning", "ICO is already Over", "warning");
      } else if (_numberOfTokens == 0 && _numberOfTokens == "") {
        Swal.fire("Warning", "Please Input valid number", "warning");
      } else if (curretTime < startTime) {
        Swal.fire("Warning", "ICO Not Started Yet", "warning");
      } else if (isRefundCalled) {
        Swal.fire("Warning", "You have initiated Refund already.", "warning");
      } else if (
        parseInt(SoldOutTokens) + parseInt(_numberOfTokens) >
        hardcap
      ) {
        Swal.fire("Warning", "This transaction may exceed Hardcap.", "warning");
      } else {
        const data = await getFinalPrice(position, _numberOfTokens);
        console.log(data, "this is the api code", position, "this is positon");
        GetApprove(library.provider, _numberOfTokens, USDTTokenAddress)
          .send({
            from: account,
          })
          .then(() => {
            sellICOTokenUSDT(library.provider, _numberOfTokens, data)
              .send({
                from: account,
              })
              .then(() => {
                setnumber_of_tokens("");
                Swal.fire("Transaction is succesfull");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      Swal.fire("Please Connect To The Wallet");
    }
  };
  const TokenSaleByETH = async () => {
    console.log("Token Buy with USDT called");
    console.log(isIcoOver, "Is Ico Over ");

    const d = new Date();
    let curretTime = parseInt(d.getTime() / 1000);
    let startTime = tokenomics[3];
    let EndTime = tokenomics[4];
    let SoldOutTokens = tokenomics[5];
    let hardcap = tokenomics[8];
    // console.log(curretTime, "Current Time ");
    // console.log(startTime, "startTime Time ");
    // console.log(EndTime, "EndTime Time ");
    // console.log(isRefundCalled, "Is Refund Done ");
    // console.log(_numberOfTokens, "Number of Tokens by input filed");
    // console.log(SoldOutTokens, "This is the soldouttoken");
    // console.log(hardcap / Math.pow(10, 18), "This is the hardcape");

    if (active) {
      if (isIcoOver) {
        Swal.fire("Warning", "ICO is already Over", "warning");
      } else if (Eth == 0 && Eth == "") {
        Swal.fire("Warning", "Please Input valid number", "warning");
      } else if (curretTime < startTime) {
        Swal.fire("Warning", "ICO Not Started Yet", "warning");
      } else if (isRefundCalled) {
        Swal.fire("Warning", "You have initiated Refund already.", "warning");
      } else if (
        parseInt(SoldOutTokens) + parseInt(_numberOfTokens) >
        hardcap
      ) {
        Swal.fire("Warning", "This transaction may exceed Hardcap.", "warning");
      } else {
        // const data = await getFinalPrice(position, _numberOfTokens);
        // console.log(data, "this is the api code");
        let liveEth_to_USDT = await axios.get(
          "https://cex.io/api/last_price/" + "ETH" + "/USD"
        );
        console.log(liveEth_to_USDT.data.lprice);
        console.log("(position, Eth)", position, Eth);
        const usdtAmount = await getFinalPrice(
          parseInt(position),
          parseInt(Eth)
        );
        console.log(
          parseInt(position),
          parseInt(Eth),
          usdtAmount,
          liveEth_to_USDT.data.lprice,
          "Position, Eth, USDTAmuount, liveEth_to_USDT"
        );

        let finalValue =
          (parseInt(usdtAmount) /
            Math.pow(10, 18) /
            parseFloat(liveEth_to_USDT.data.lprice)) *
          Math.pow(10, 18);

        console.log(
          "FInal Vlae : ",
          parseInt(finalValue)
          // new Web3().utils.toWei(finalValue.toString(), "ether")
        );

        console.log(
          "usdtAmount / (liveEth_to_USDT.data.lprice * Math.pow(10, 18));",
          (parseFloat(usdtAmount) / parseFloat(liveEth_to_USDT.data.lprice)) *
            Math.pow(10, 18)
        );

        sellICOTokenEth(library.provider, liveEth_to_USDT.data.lprice, Eth)
          .send({
            from: account,
            value: parseInt(finalValue),
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      Swal.fire("Please Connect To The Wallet");
    }
  };
  return (
    <div className=" bg-[#000]">
      {console.log(tokenomics, "this is the tokenomics --- ")}
      {console.log(position, "this is the position")}
      {console.log(isHardCapReached, "this is the isHardCapReached")}
      {console.log(isSoftCapReached, "this is the isSoftCapReached")}
      {console.log(isRefundCalled, "this is the isRefundCalled")}
      {console.log(ETHWalletBalance, "this is the ETHWalletBalance")}

      <div className=" relative mx-auto">
        <div className="relative">
          <img
            className=""
            src={process.env.PUBLIC_URL + "/assets/headerpage.png"}
            alt=""
          />

          <div className="flex absolute top-[40%] w-full justify-center ">
            <div className="flex flex-wrap gap-10">
              <h1
                className="text-3xl text-[#B231C4] font-bold uppercase"
                style={{ fontFamily: "Bit Sans" }}
              >
                join presale
              </h1>
            </div>
          </div>
          <img
            src={process.env.PUBLIC_URL + "./assets/brown.png"}
            className=" absolute z-[100] w-full"
          />
        </div>
        {/*===================================== join presale sec==============================================*/}
        <div className="px-[2rem] md:pt-[14rem] pt-[4rem] pb-[5rem]">
          <div className="grid grid-cols-1  md:grid-cols-2 gap-[20px] justify-center items-center">
            <div>
              <Creditcard />
            </div>
            <div className="flex flex-col gap-5">
              <div className="bgccimg  ">
                <div className="" style={{ width: "fit-content" }}>
                  <input
                    className="w-full h-full p-3 outline-0 text-right text-[#757474;]"
                    type="number"
                    step="1"
                    min="1"
                    onChange={(e) => handleInputBNB(e)}
                    style={{
                      borderRadius: "20px",
                      border: "0 solid #000000",
                      backgroundColor: "gray",
                    }}
                    value={Eth}
                    placeholder="0.0 ETH"
                  ></input>

                  <p className="text-right text-[#757474] font-base mr-5 text-lg">
                    0.0 MCADE TO 1 ETH{" "}
                  </p>

                  <div>
                    <img
                      onClick={TokenSaleByETH}
                      src={process.env.PUBLIC_URL + "./assets/buy-mcade.png"} //Buy with ETH
                      className="float-right max-w-[150px] md:max-w-[200px]"
                    />
                  </div>
                </div>
              </div>

              <div className="bgccimg1  ">
                <div className="" style={{ width: "fit-content" }}>
                  <input
                    className="w-full h-full p-3 outline-0 text-right text-[#757474;]"
                    type="number_of_tokens"
                    value={_numberOfTokens}
                    onChange={(e) => handleInputEth(e)}
                    style={{
                      borderRadius: "20px",
                      border: "0 solid #000000",
                      backgroundColor: "gray",
                    }}
                    placeholder="0.0 ETH"
                  ></input>
                  <p className="text-right text-[#757474] font-base mr-5 text-lg">
                    <span className="color-white">{error}</span>
                    0.0 MCADE TO 1 USDT{" "}
                  </p>

                  <div>
                    <img
                      onClick={TokenSaleByUSDT}
                      src={process.env.PUBLIC_URL + "./assets/buy-mcade.png"} // Buy with USDT Token
                      className="float-right max-w-[150px] md:max-w-[200px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[3rem]">
            <img
              src={process.env.PUBLIC_URL + "./assets/connect-wallet.png"}
              className=" max-w-[200px] md:max-w-[400px]  mx-auto"
            />
          </div>
        </div>
        // buttonsec
        <section className="relative button1-sec ">
          <div className="text-center">
            <img
              src={process.env.PUBLIC_URL + "./assets/logo.png"}
              className=" mx-auto py-5"
            />
          </div>
          <div className="flex flex-col sm:flex-row  justify-center items-center pt-[4rem] mt-[30px] button_div gap-10">
            <div className="relative first-button">
              <img
                className="relative md:w-full  mx-auto max-w-[200px] h-[60px] "
                src={process.env.PUBLIC_URL + "./assets/joinpre.png"}
                onMouseOver={(e) =>
                  (e.currentTarget.src =
                    process.env.PUBLIC_URL + "./assets/joinprehover.png")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src =
                    process.env.PUBLIC_URL + "./assets/joinpre.png")
                }
              />
            </div>

            <div className="relative second-button">
              <img
                className="relative md:w-full  mx-auto max-w-[200px] h-[60px] "
                src={process.env.PUBLIC_URL + "./assets/howto.png"}
                onMouseOver={(e) =>
                  (e.currentTarget.src =
                    process.env.PUBLIC_URL + "./assets/hover_btn.png")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src =
                    process.env.PUBLIC_URL + "./assets/howto.png")
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JoinPresale;
