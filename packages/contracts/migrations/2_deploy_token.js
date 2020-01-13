const CeaErc20 = artifacts.require("./CeaErc20.sol");

module.exports = (deployer) => {
  deployer.deploy(CeaErc20);
};
