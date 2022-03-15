import { Token } from "../types/schema";

export function addToken(address: string): void {
  let token: Token | null = Token.load(address);
  if (token != null) {
    return;
  }

  token = new Token(address);
  if (address == "0xa6dF0C88916f3e2831A329CE46566dDfBe9E74b7") {
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
