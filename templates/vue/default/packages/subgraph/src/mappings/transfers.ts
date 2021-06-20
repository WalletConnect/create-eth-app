import { Transfer as TransferEvent } from "../types/CeaErc20/erc20";
import { Transfer } from "../types/schema";
import { addToken } from "./tokens";

export function handleTransfer(event: TransferEvent): void {
  let transactionHash = event.transaction.hash.toHex();
  let transfer = new Transfer(transactionHash);
  transfer.from = event.params.from.toHex();
  transfer.to = event.params.to.toHex();
  transfer.value = event.params.value;
  transfer.save();
  addToken(event.transaction.to.toHex());
}
