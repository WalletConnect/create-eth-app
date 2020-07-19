/**
 * See all ids below
 * https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids
 */
export const KOVAN_ID = 42;
export const MAINNET_ID = 1;

/**
 * Please note that these may not be the most up-to-date addresses for the Synthetix contracts.
 * https://docs.synthetix.io/addresses/
 */
export default {
  [KOVAN_ID]: {
    addressResolver: "0x242a3DF52c375bEe81b1c668741D7c63aF68FDD2",
    systemStatus: "0x5b01D9f87080CABcA881A0Cf4e45C0E2ccB7Edde",
    tokens: {
      SNX: "0x22f1ba6dB6ca0A065e1b7EAe6FC22b7E675310EF",
    },
    tokenStates: {
      SNX: "0x46824bFAaFd049fB0Af9a45159A88e595Bbbb9f7",
    },
  },
  [MAINNET_ID]: {
    readProxyAddressResolver: "0x4E3b31eB0E5CB73641EE1E65E7dCEFe520bA3ef2",
    tokens: {
      SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    },
    tokenStates: {
      SNX: "0x5b1b5fEa1b99D83aD479dF0C222F0492385381dD",
    },
  },
};
