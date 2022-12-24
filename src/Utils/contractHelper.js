import Web3 from "web3";
import {
  ICOContractAddress,
  TokenContractAddress,
  USDTTokenAddress,
} from "../config/Contracts/contract";
import ICO_ABI from "../config/ABI/ICO_ABI";
import { USDT_ABI } from "../config/ABI/USDT_ABI";
import { Provider } from "react-redux";
import { TokenABI } from "../config/ABI/TOKEN_ABI";

const getContract = (contractAddress, ABI, provider) => {
  const web3_ = new Web3(provider);
  return new web3_.eth.Contract(ABI, contractAddress);
};

export const checkAddressInArrary = (provider, addressList, user) => {
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.isAddressInArray(addressList, user);
};
export const showAllTrade = (provider) => {
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.showAllTrade();
};
export const metacadeBuyContract = (provider) => {
  return getContract(
    ICOContractAddress,

    ICO_ABI,
    provider
  ).methods.SaleICOToken("100000000000000000");
};
export const transferBNB = (provider, account, ammount) => {
  return getContract(
    TokenContractAddress,

    TokenABI,
    provider
  ).methods.transfer(account, ammount);
};
export const usdtContractApprove = (provider) => {
  return getContract(USDTTokenAddress, USDT_ABI, provider).methods.approve(
    ICOContractAddress,
    "100000000000000000"
  );
};

export const SaleICOTokenBYEtherum = (
  provider,
  _live_price,
  _numberOfTokens
) => {
  console.log("yess");
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.SaleICOTokenByETH(_live_price, _numberOfTokens);
};
export const SaleICOTokenBYEtherumData = (
  provider,
  _live_price,
  _numberOfTokens
) => {
  console.log("yess");
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.SaleICOTokenByETH(
    new Web3().utils.toWei(_live_price.toString(), "ether"),
    new Web3().utils.toWei(_numberOfTokens.toString(), "ether")
  );
};
export const GetTokonomicStatus = (provider) => {
  return getContract(ICOContractAddress, ICO_ABI, provider)
    .methods.getTokenomics()
    .call();
};

export const GetIcoStatus = (provider) => {
  return getContract(ICOContractAddress, ICO_ABI, provider)
    .methods.isIcoOver()
    .call();
};

export const GetRefundstatus = (provider) => {
  return getContract(ICOContractAddress, ICO_ABI, provider)
    .methods.isRefundDone()
    .call();
};

export const GetHardCapStatus = (provider) => {
  return getContract(ICOContractAddress, ICO_ABI, provider)
    .methods.isHardCapReached()
    .call();
};

export const GetSoftCapStatus = (provider) => {
  return getContract(ICOContractAddress, ICO_ABI, provider)
    .methods.isSoftCapReached()
    .call();
};

export const GetApprove = (provider, ammount, USDTTokenAddress) => {
  return getContract(USDTTokenAddress, USDT_ABI, provider).methods.approve(
    ICOContractAddress,
    new Web3().utils.toWei(ammount.toString(), "ether")
  );
};

export const UserClaimTokens = (provider) => {
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.ClaimTokens();
};

export const sellICOToken = (provider, ammount, index) => {
  console.log(provider);
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.SaleICOToken(
    new Web3().utils.toWei(ammount.toString(), "ether"),
    index
  );
};
export const sellICOTokenUSDT = (provider, _number_of_tokens, _Api_Data) => {
  console.log(provider);
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.SaleICOToken(
    new Web3().utils.toWei(_number_of_tokens.toString(), "ether"),
    _Api_Data.toString()
  );
};
export const sellICOTokenEth = (provider, _live_price, _number_of_tokens) => {
  console.log(provider);
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.SaleICOTokenByETH(
    new Web3().utils.toWei(_live_price.toString(), "ether"),
    _number_of_tokens.toString()
  );
};
export const SaleICOToken = (provider, ammount) => {
  return getContract(
    ICOContractAddress,
    ICO_ABI,
    provider
  ).methods.SaleICOToken(new Web3().utils.toWei(ammount.toString(), "ether"));
};
// approve
export const getWalletBalance = (provider, account) => {
  const web3_ = new Web3(provider);
  return new web3_.eth.getBalance(account);
};

export const Position = async (provider) => {
  return await getContract(ICOContractAddress, ICO_ABI, provider)
    .methods.currentPosition()
    .call();
};
export const Transfer = async (provider, address, amount) => {
  return await getContract(
    TokenContractAddress,
    TokenABI,
    provider
  ).methods.transfer(address, amount);
};
// balaceof
// export const getAccountbalance = (provider, account) => {
//   const web3_ = new Web3(provider);
//   return new web3_.eth.balanceOf(account);
// };
