import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Please replace this with your own Infura ID
// You can get a free key at https://infura.io/register
const INFURA_ID = "8e1441aac766490a8671d8800c334c64";

// Web3Modal also supports many other wallets.
// You can see other options at https://github.com/Web3Modal/web3modal
export const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

export const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  window.location.reload();
};
