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
    addressResolver: "0x25ee175d78B22A55982c09e6A03D605aE5B5c17C",
    systemStatus: "0x5b01D9f87080CABcA881A0Cf4e45C0E2ccB7Edde",
    tokens: {
      SNX: "0x22f1ba6dB6ca0A065e1b7EAe6FC22b7E675310EF",
    },
    tokenStates: {
      SNX: "0x46824bFAaFd049fB0Af9a45159A88e595Bbbb9f7",
    },
  },
  [MAINNET_ID]: {
    addressResolver: "0x61166014E3f04E40C953fe4EAb9D9E40863C83AE",
    tokens: {
      SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
    },
    tokenStates: {
      SNX: "0x5b1b5fEa1b99D83aD479dF0C222F0492385381dD",
    },
  },
};
