let CubToken = artifacts.require("./CubToken.sol");  

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(CubToken);  
};
