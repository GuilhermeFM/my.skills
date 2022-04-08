/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";

dotenv.config();

const { API_URL_POLYGON, API_URL_ROPSTEN, PRIVATE_KEY } = process.env;

export default {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},

    ropsten: {
      url: API_URL_ROPSTEN,
      accounts: [`0x${PRIVATE_KEY}`],
    },

    polygon: {
      url: API_URL_POLYGON,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
