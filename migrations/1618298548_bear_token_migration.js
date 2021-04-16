let BearToken = artifacts.require("./BearToken.sol");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(BearToken);  
};
