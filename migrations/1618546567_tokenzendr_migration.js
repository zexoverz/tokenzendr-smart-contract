let TokenZendR = artifacts.require("./TokenZendR.sol");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(TokenZendR);
};
