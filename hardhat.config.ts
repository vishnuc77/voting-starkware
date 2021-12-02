import "@shardlabs/starknet-hardhat-plugin";


//require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  networks: {
    myNetwork: {
      url: "http://localhost:5000"
    }
  }
}
