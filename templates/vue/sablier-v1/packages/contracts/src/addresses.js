/**
 * See all ids below
 * https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids
 */
export const GOERLI_ID = 5;
export const KOVAN_ID = 42;
export const MAINNET_ID = 1;
export const RINKEBY_ID = 4;
export const ROPSTEN_ID = 3;

const commonContracts = {
  payroll: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  sablier: "0xc04Ad234E01327b24a831e3718DBFcbE245904CC",
};

export default {
  [GOERLI_ID]: commonContracts,
  [KOVAN_ID]: commonContracts,
  [MAINNET_ID]: {
    payroll: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
    sablier: "0xA4fc358455Febe425536fd1878bE67FfDBDEC59a",
  },
  [RINKEBY_ID]: commonContracts,
  [ROPSTEN_ID]: commonContracts,
};
