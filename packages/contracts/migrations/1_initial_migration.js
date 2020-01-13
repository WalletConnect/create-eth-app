/* global artifacts */
const Migrations = artifacts.require("./Migrations.sol");

module.exports = async deployer => {
  await deployer.deploy(Migrations);
};
