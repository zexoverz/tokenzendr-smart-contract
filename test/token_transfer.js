const TokenZendR = artifacts.require('./TokenZendR.sol');
const BearToken = artifacts.require('./BearToken.sol');
const CubToken = artifacts.require('./CubToken.sol');

const BigNumber = web3.utils.BN;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();


let sender, bear, cub;

contract('token_transfer', async (accounts) => {

    let accountA, accountB, accountC, accountD;

    [accountA, accountB, accountC, accountD ] = accounts;

    let bytes32Bear = web3.utils.fromAscii("BEAR");
    let bytes32CUB = web3.utils.fromAscii("CUB");
    beforeEach(async () => {
        sender = await TokenZendR.new();
        bear = await BearToken.new();
        cub = await CubToken.new();

        await sender.addNewToken(bytes32Bear, bear.address);
        await sender.addNewToken(bytes32CUB, cub.address);
    });

    it("should be able to transfer sender token to another wallet", async() => {
        // When transfering  token, multiple by
        //figure of decimal to get exact token e.g
        //to send 5 BEAR = 5e5, where 5 is the decimal places 
        let amount = new BigNumber(500000e5);

        //Account a approve contract to spend on behalf
        await bear.approve(sender.address, amount,{from: accountA});

        await sender.transferTokens(bytes32Bear,accountB, amount,{from: accountA});

        let balance = ((await  bear.balanceOf(accountB)).toString());

        balance.should.equal(amount.toString())
        
    });

});