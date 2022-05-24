/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()  
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {

    development: {
      provider: () => new HDWalletProvider(process.env.ganacheMNEMONIC, `http://127.0.0.1:8545`)
      ,            // Standard Ethereum port (default: none)
       network_id: "*",       // Any network (default: none)
       gas: 0x1fffffffffff,           // Gas sent with each transaction (default: ~6700000)
       gasPrice: 2000000,  // 20 gwei (in wei) (default: 100 gwei)

    
      },
    
    bsc: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `https://data-seed-prebsc-1-s2.binance.org:8545`),    /// [Note]: New RPC Endpoint
      //provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-2-s1.binance.org:8545`),  /// [Note]: 503 eror
      network_id: 97,
      networkCheckTimeout: 9999,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,   
    },
    
    matic: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.MubaiApiKey}`),
      network_id: 80001,
      gas: 5000000,        
      confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50,  // # of blocks before a deployment times out  (minimum/default: 50)
      networkCheckTimeout: 300000, //amount of time for Truffle to wait for a response from the node when testing the provider (in milliseconds)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    // cronos: {
    //   provider: new HDWalletProvider(process.env.mnemonic, "https://evm-t3.cronos.org/"), 
    //   network_id: "338",
    //   skipDryRun: true
    // },

    kovan: {
      provider: () => new HDWalletProvider(process.env.mnemonic, `wss://kovan.infura.io/ws/v3/2fb04d7a47b640f18ba2f704d0b7c38b`),
      network_id: 42,       // kovan's id
      gas: 5000000,        // kovan has a lower block limit than mainnet
      confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 50,  // # of blocks before a deployment times out  (minimum/default: 50)
      networkCheckTimeout: 300000, //amount of time for Truffle to wait for a response from the node when testing the provider (in milliseconds)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
