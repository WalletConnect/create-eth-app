import { Token } from "../types/schema";

export function addToken(address: string): void {
  let token = Token.load(address);
  if (token != null) {
    return;
  }

  token = new Token(address);
  if (address == "0xc1c0472c0c80bccdc7f5d01a376bd97a734b8815") {
    token.decimals = 18;
    token.name = "CeaErc20";
    token.symbol = "CEAERC20";
  } else {
    token.decimals = 0;
    token.name = null;
    token.symbol = null;
  }

  token.save();
}
