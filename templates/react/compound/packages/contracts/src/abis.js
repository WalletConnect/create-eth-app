import COMP from "./abis/COMP";
import base0bps_Slope2000bps from "./abis/base0bps_Slope2000bps";
import base200bps_Slope222bps_Kink90_Jump10 from "./abis/base200bps_Slope222bps_Kink90_Jump10";
import base200bps_Slope3000bps from "./abis/base200bps_Slope3000bps";
import base500bps_Slope1200bps from "./abis/base500bps_Slope1200bps";
import cBAT from "./abis/cBAT";
import cDAI from "./abis/cDAI";
import cETH from "./abis/cETH";
import cREP from "./abis/cREP";
import cSAI from "./abis/cSAI";
import cTBTC from "./abis/cTBTC";
import cUSDC from "./abis/cUSDC";
import cWBTC from "./abis/cWBTC";
import cZRX from "./abis/cZRX";
import comptroller from "./abis/comptroller";
import daiRateModel from "./abis/daiRateModel";
import governance from "./abis/governance";
import priceOracle from "./abis/priceOracle";
import timelock from "./abis/timelock";

export default {
  base0bps_Slope2000bps,
  base200bps_Slope222bps_Kink90_Jump10,
  base200bps_Slope3000bps,
  base500bps_Slope1200bps,
  comptroller,
  daiRateModel,
  governance,
  priceOracle,
  timelock,
  tokens: {
    COMP,
    cBAT,
    cDAI,
    cETH,
    cREP,
    cSAI,
    cTBTC,
    cUSDC,
    cWBTC,
    cZRX,
  },
};
