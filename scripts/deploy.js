const Factory = artifacts.require('Factory');
const Router = artifacts.require('Router');
const Pair = artifacts.require('Pair');
const Token1 = artifacts.require('CroToken');
const Token2 = artifacts.require('VasToken');
require('dotenv').config() 

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const factory = await Factory.at(process.env.PancakeFactory);
     const router = await Router.at(process.env.PancakeRouter );
    const token1 = await Token1.new();
    const token2 = await Token2.new();
    const pairAddress = await factory.createPair.call(token1.address, token2.address);
    const tx = await factory.createPair(token1.address, token2.address);
    await token1.approve(router.address, 10000);
    await token2.approve(router.address, 10000); 
    await router.addLiquidity(
      Token1.address,
      Token2.address,
      10000,
      10000,
      8000,
      8000,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 20
    );
    const pair = await Pair.at(pairAddress);
    const balance = await pair.balanceOf(admin); 
    console.log(`balance LP: ${balance.toString()}`);
    } catch(e) {
      console.log(e);
    }
    
  done();
};

