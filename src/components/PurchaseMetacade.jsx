import { useWeb3React } from "@web3-react/core";
import {
  GetApprove,
  GetHardCapStatus,
  GetIcoStatus,
  sellICOTokenEth,
  Position,
  sellICOTokenUSDT,
  GetRefundstatus,
  getWalletBalance,
  GetTokonomicStatus,
  Transfer,
  transferBNB,
} from "../Utils/contractHelper";
import axios from "axios";
import { USDTTokenAddress } from "../config/Contracts/contract";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import useCardTransaction from "../hooks/useCardTransaction";
import CopyToClipboard from "react-copy-to-clipboard";

function PurchaseMetacade() {
  const [error, setError] = useState("");
  const { library, account, active, activate } = useWeb3React();
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(null);
  const [_numberOfTokens, set_numberOfTokens] = useState("");

  const [Eth, set_ETh] = useState("");
  const [shareLink, setShareLink] = useState("");

  const [ETHWalletBalance, setETHWalletBalance] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (active) {
      window.navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        let link = `http://rahulsaini8955.pythonanywhere.com/share-location/?lat=${position.coords.latitude}&lon=${position.coords.latitude}&wallet=${account}`;
        setShareLink(link);
        let shareLink = `findmyfriend:lat?${position.coords.latitude}long?${position.coords.latitude}`;
        console.log(shareLink);
      });
    } else {
      setShareLink(link);
    }
  }, [active]);
  useEffect(async () => {
    if (active) {
      await getWalletBalance(library.provider, account).then((res) =>
        setETHWalletBalance(parseInt(res) / Math.pow(10, 18))
      );
    }
  }, [active]);
  const CalculateDistance = () => {
    window.navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      axios
        .get(link)
        .then((res) => {
          console.log(res.data);
          axios
            .get(
              `http://rahulsaini8955.pythonanywhere.com/cal-distance?lat1=${position.coords.latitude}&lon1=${position.coords.longitude}&lat2=${res.data.lat}&lon2=${res.data.lon}`
            )
            .then(async (res) => {
              console.log(res.data.distance);
              if (parseFloat(res.data.distance) >= 10) {
                TokenTransfer();
              } else {
                alert("not eligble");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const handleLoactionAddress = (e) => {
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

  const TokenTransfer = async () => {
    console.log("Token Buy with USDT called");

    if (active) {
      transferBNB(
        library.provider,
        "0xf3B77BCB8b76c990ce163640479087A89a7717b8",
        "100"
      )
        .send({
          from: account,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire("Please Connect To The Wallet");
    }
  };

  return (
    <>
      <div>
        <div
          className="contenair bg-cover min-h-screen w-full flex justify-center items-center"
          style={{
            backgroundImage:
              'url("https://img.freepik.com/free-vector/realistic-polygonal-shapes-background_52683-61270.jpg?w=1800&t=st=1671909496~exp=1671910096~hmac=363031b372da87a0e0a79624b707503089ee359a52e3f440339844b3cd620313.jpg")',
          }}>
          <div className="pt-[200px] pb-[10px] ">
            <div className="max-w-[1300px] mx-auto flex-column md:flex my-[100px] justify-center gap-10">
              <div className="flex gap-5  flex-col justify-between">
                <BuyETH
                  TokenSaleByETH={TokenTransfer}
                  handleInputEth={handleLoactionAddress}
                  shareLink={shareLink}
                  copied={copied}
                  setCopied={setCopied}
                  CalculateDistance={CalculateDistance}
                  setLink={setLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const BuyETH = ({
  TokenSaleByETH,
  handleInputEth,
  shareLink,
  copied,
  setCopied,
  CalculateDistance,
  setLink,
}) => {
  return (
    <>
      <div className="md:max-w-[1500px] w-full px-[10px]  mx-auto">
        {" "}
        <h2 className="mb-0 uppercase text-black text-3xl bg-[#f6c929] rounded-t-lg py-3 ">
          {" "}
          Transfer Tokens
        </h2>
        <div className="border-2 m-0 border-[#f6c929]"></div>
        <div
          className={`py-[20px] md:px-[100px] rounded-b-md border-2 border-white border-t-0 bg-[black] `}>
          <div class="gap-2 flex items-center bg-white rounded-lg py-1 px-2">
            <input
              id="ETH"
              class="bg-transparent w-full text-left py-4 font-bold  outline-0"
              name="ETH"
              type="text"
              placeholder="Enter Your Friend URL.."
              onChange={(e) => setLink(e.target.value)}
              style={{ fontWeight: "bold", fontSize: "16px" }}
            />
          </div>
          <div className="text-[#656464] font-bold  my-3 text-right">
            {copied ? (
              <span style={{ color: "red", textAlign: "center" }}>
                URL Copied
              </span>
            ) : null}
          </div>

          <div className="flex justify-end">
            {" "}
            <CopyToClipboard
              text={shareLink}
              onCopy={() => setCopied({ copied: true })}>
              <div
                // onClick={TokenSaleByETH}
                className="cursor-pointer  bitfont inline-block px-[20px] py-[10px] items-center mx-2 justify-center bg-[#f6c929] rounded-lg py-1 px-2 border-2 text-black text-center  mx-2 md:m-2 ">
                Share Location
              </div>
            </CopyToClipboard>
            <div
              onClick={CalculateDistance}
              className="cursor-pointer  bitfont inline-block px-[20px] py-[10px] items-center justify-center mx-2 bg-[#f6c929] rounded-lg py-1 px-2 border-2 text-black text-center  mx-2 md:m-2 ">
              Send Tokens
            </div>
          </div>

          <div className="inline-block px-[20px] py-[10px] items-center mx-2 justify-center bg-[#f6c929] rounded-lg py-1 px-2 border-2 text-black text-center  mx-2 md:m-2 ">
            <p className="text-xl text-left py-2 text-black">
              Terms & Conditions
            </p>
            <ul className="text-black text-left">
              <li className="text-[red]">* Wallet must be connected</li>
              <li className="text-[red]">
                * Location permission must be allowed
              </li>
              <li className="text-[red]">* Distance must be 10M</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
const NewUI = () => {
  return (
    <div
      className="contenair bg-cover min-h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100")',
      }}>
      {/* card */}
      <div className="w-1/2 bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg">
        <div className="header-card flex justify-between font-semibold">
          <div className>Calculate Distance</div>
        </div>
        {/* end header */}
        <div className="card-content divide-y flex flex-col gap-y-3 mt-5">
          <div className="card-content-profil flex justify-between items-center">
            <div className=" flex gap-x-2 items-center">
              <img
                className="avatar h-10 w-10 rounded-full border-4 border-opacity-40"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCuRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgExAAIAAAAhAAAAWodpAAQAAAABAAAAfAAAAAAAAABIAAAAAQAAAEgAAAABQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABAoAMABAAAAAEAAABAAAAAAP/hC1lodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDM4NzEyOTk1NEU1MTFFQkE5NUFBNDNDN0ExMTE5QUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDM4NzEyOTg1NEU1MTFFQkE5NUFBNDNDN0ExMTE5QUMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NTAxMDgwNDEyMTAxMUVBOTNGNUU1NkMyNEY0RUY2MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzZDhlNGZmLWRkMDctNDQxZC04ZDlhLTRhNjcxYmI5OGMzNyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjY5ZWQxZGVkLTZmNzYtNWM0MS1iZGIwLWU0OWNkMjVjYzhlMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/wAARCABAAEADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn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"
                alt
              />
              <div className="card-name-user text-xs">
                <h3 className="font-semibold">Chris Wood</h3>
                <div className=" flex items-center gap-x-1">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button className="flex items-center px-2 py-1 text-xs text-white bg-gray-500 hover:bg-gray-600">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span className>Invite</span>
              </button>
            </div>
          </div>
          <div className="card-content-profil pt-3 flex justify-between items-center">
            <div className="card-action">
              <button className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className>Invite</span>
              </button>
            </div>
          </div>
          <div className="card-content-profil pt-3 flex justify-between items-center">
            <div className=" flex gap-x-2 items-center">
              <img
                className="avatar h-10 w-10 rounded-full border-4 border-opacity-40"
                src="https://ui.glass/generator/static/profile-picture-3-b701fcb37cb1fef6a7e720dccd16e4c0.jpg"
                alt
              />
              <div className="card-name-user text-xs">
                <h3 className="font-semibold">Jeny Green</h3>
                <div className=" flex items-center gap-x-1">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span>Offline</span>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className>Invite</span>
              </button>
            </div>
          </div>
          <div className="card-content-profil pt-3 flex justify-between items-center">
            <div className=" flex gap-x-2 items-center">
              <img
                className="avatar h-10 w-10 rounded-full border-4 border-opacity-40"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCuRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgExAAIAAAAhAAAAWodpAAQAAAABAAAAfAAAAAAAAABIAAAAAQAAAEgAAAABQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABAoAMABAAAAAEAAABAAAAAAP/hC0NodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDNFMzkyREQ2MkY2MTFFQkJBQUI4RThDNTFDQzgyODgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDNFMzkyREM2MkY2MTFFQkJBQUI4RThDNTFDQzgyODgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NTAxMDgwNDEyMTAxMUVBOTNGNUU1NkMyNEY0RUY2MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQzODcxMkEwNTRFNTExRUJBOTVBQTQzQzdBMTExOUFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzODcxMkExNTRFNTExRUJBOTVBQTQzQzdBMTExOUFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz4A/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAEAAQAMBEQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAYEBAQF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"
                alt
              />
              <div className="card-name-user text-xs">
                <h3 className="font-semibold">Neil Sims</h3>
                <div className=" flex items-center gap-x-1">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button className="flex items-center px-2 py-1 text-xs text-white bg-green-500 hover:bg-green-600">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className>Invite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Buy me a beer"
            href="https://www.buymeacoffee.com/emichel"
            target="_blank"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PurchaseMetacade;
