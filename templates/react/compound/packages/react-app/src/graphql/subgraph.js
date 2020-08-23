import { gql } from "apollo-boost";

// See more example queries on https://thegraph.com/explorer/subgraph/graphprotocol/compound-v2
const GET_MONEY_MARKETS = gql`
  {
    markets(first: 7) {
      borrowRate
      cash
      collateralFactor
      exchangeRate
      interestRateModelAddress
      name
      reserves
      supplyRate
      symbol
      id
      totalBorrows
      totalSupply
      underlyingAddress
      underlyingName
      underlyingPrice
      underlyingSymbol
      reserveFactor
      underlyingPriceUSD
    }
  }
`;

export default GET_MONEY_MARKETS;
