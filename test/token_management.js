const TokenZendR = artifacts.require('./TokenZendR.sol');  
  
const should = require('chai')  
 .use(require('chai-as-promised'))  
 .should();  
  
let sender;  
  
contract('token_management', async (accounts) => {
  beforeEach(async () => {  
    sender = await TokenZendR.new();  
    await sender.addNewToken(web3.utils.fromAscii("OPEN"), '0x69c4BB240cF05D51eeab6985Bab35527d04a8C64');  
  });

  it("should add new supported token", async() => {  
    let address = await sender.tokens.call(web3.utils.fromAscii("OPEN"));  
    
    address.should.equal('0x69c4BB240cF05D51eeab6985Bab35527d04a8C64');  

  });

  it("should update supported token address", async() => {  
    await sender.addNewToken(web3.utils.fromAscii("OPEN"), '0x3472059945ee170660a9A97892a3cf77857Eba3A');  
    
    let address = await sender.tokens.call(web3.utils.fromAscii("OPEN")); 
    
    address.should.equal('0x3472059945ee170660a9A97892a3cf77857Eba3A');  
  });

  it("should remove unused supported token address", async() => {
    await sender.removeToken(web3.utils.fromAscii("OPEN"));

    let address = await sender.tokens.call(web3.utils.fromAscii("OPEN"));

    address.should.equal('0x0000000000000000000000000000000000000000');
  });
  
});