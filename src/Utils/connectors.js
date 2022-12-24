import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97],
});

export const walletconnect = new WalletConnectConnector({
  infuraId: "9c48d1f781404552b1a017d597f6bee1",
  bridge: "https://bridge.walletconnect.org",
  rpc: {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ["metamask", "trust"],
  },
  desktopLinks: ["encrypted ink"],
});
