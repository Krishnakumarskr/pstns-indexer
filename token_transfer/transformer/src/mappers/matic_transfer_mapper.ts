import { ITransaction } from "@maticnetwork/chain-indexer-framework/interfaces/transaction";
import { IMapper } from "@maticnetwork/chain-indexer-framework/interfaces/mapper";
import { ABICoder } from "@maticnetwork/chain-indexer-framework/coder/abi_coder";
import { BloomFilter } from "@maticnetwork/chain-indexer-framework/filter";
import utils from "web3-utils";
import IMaticTransferTx from "../interfaces/matic_transfer_tx.js";

/**
 * Matic Transfer Mapper maps a given transaction to MATIC token transfer events if existing
 * in the transaction
 *
 * @author - Nitin Mittal, Polygon Technology
 */
export class MaticTransferMapper
  implements IMapper<ITransaction, IMaticTransferTx>
{
  private ERC20_TOKEN_ADDRESS =
    process.env.ERC20_TOKEN_ADDRESS?.toLowerCase() || "";

  /**
   * Maps the given transaction receipt object to IMaticTransfer Txs
   *
   * @param {ITransaction} transaction - The transaction to be mapped.
   *
   * @returns {IMaticTransferTx[]} - Returns an array of transfer transaction events.
   */
  map(transaction: ITransaction): IMaticTransferTx[] {
    const logsBloom = transaction.receipt.logsBloom;

    let transfers: IMaticTransferTx[] = [];

    if (this.isTransfer(logsBloom)) {
      let maticTransfer = this.mapTransferErc20(transaction);
      transfers = [...transfers, ...maticTransfer];
    }

    return transfers;
  }

  /**
   * Returns the mapped transaction to MATIC Transfers
   *
   * @param {ITransaction} transaction - The transaction details
   *
   * @returns {IMaticTransferTx[]} - matic transfer transaction object
   */
  private mapTransferErc20(transaction: ITransaction): IMaticTransferTx[] {
    let transfers: IMaticTransferTx[] = [];

    for (const log of transaction.receipt.logs) {
      if (
        log.topics.length &&
        // Check if the event was emitted by the MATIC Token Contract using the env variable
        log.address.toLowerCase() === this.ERC20_TOKEN_ADDRESS
      ) {
        transfers.push({
          transactionIndex: transaction.receipt.transactionIndex,
          transactionHash: transaction.hash,
          transactionInitiator: transaction.from.toLowerCase(),
          tokenAddress: log.address.toLowerCase(),
          amount: utils.toHex(ABICoder.decodeParameter("uint256", log.data)),
          senderAddress: ABICoder.decodeParameter("address", log.topics[1]),
          receiverAddress: ABICoder.decodeParameter("address", log.topics[2]),
        });
      }
    }

    return transfers;
  }

  /**
   * @private
   * Returns true if a transfer event exists in the logsBloom provided.
   *
   * @param {string} logsBloom - The logsBloom string to perform the check on.
   *
   * @returns {boolean} - true if transfer exists, false otherwise.
   */
  private isTransfer(logsBloom: string): boolean {
    return BloomFilter.isTopicInBloom(
      logsBloom,
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" // ERC20_ERC721_TRANSFER_TOPIC
    );
  }
}
