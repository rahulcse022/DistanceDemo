import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { useHistory } from "react-router-dom";
import { injected, walletconnect } from "../Utils/connectors";

// import { ConnectWallet } from "../Redux/actions";
export const useAuth = () => {
  const { activate, deactivate } = useWeb3React();
  const history = useHistory();

  const login = () => {
    activate(injected).then();
  };
  const mobileLogin = () => {
    activate(walletconnect);
  };
  const logout = async () => {
    // refreshState();
    deactivate();
  };
  return { login, logout, mobileLogin };
};

export default useAuth;
