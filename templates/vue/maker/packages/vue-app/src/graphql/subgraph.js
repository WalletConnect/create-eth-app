import gql from "graphql-tag";

// See more example queries on https://thegraph.com/explorer/subgraph/protofire/maker-protocol
const GET_COLLATERAL_TYPES = gql`
  {
    collateralTypes(orderBy: addedAt) {
      name: id
      price {
        block
        value
      }
      debtCeiling
      totalDebt
      liquidationLotSize
      liquidationPenalty
      liquidationRatio
      stabilityFee
      auctionCount
      vaultCount
    }
  }
`;

export default GET_COLLATERAL_TYPES;
