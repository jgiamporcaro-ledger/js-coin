const crypto = require('crypto');
const { genesisBlock } = require('../params');

class Blockchain {
  constructor() {
    this.chain = [];
    this.currentTransaction = [];

    this.setNewBlock(genesisBlock.proof, genesisBlock.previousHash);
  }

  getChain() {
    return [...this.chain];
  }

  getCurrentTransaction() {
    return [...this.currentTransaction];
  }

  getLastBlock() {
    const block = this.chain[this.chain.length - 1];
    return Object.assign({}, block);
  }

  setNewBlock(proof, previousHash) {
    const block = {
      index: this.chain.length + 1,
      timeStamp: new Date(),
      transactions: [...this.currentTransaction],
      proof,
      previousHash,
    };

    this.currentTransaction = [];
    this.chain = [...this.chain, block];
  }

  setNewTransaction({ sender, recipient, amount }) {
    const transaction = {
      sender,
      recipient,
      amount,
    };

    this.currentTransaction = [...this.currentTransaction, transaction];
    return this.getLastBlock().index + 1;
  }

  // Utils folder ?
  hashBlock(block) {
    const blockString = JSON.stringify(block);
    return crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(blockString)
      .digest('hex');
  }

  // Utils folder ?
  validProof(lastProof, proof) {
    const guessHash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
      .update(`${lastProof}${proof}`)
      .digest('hex');
    return guessHash.substr(0, process.env.RESOLUTION_HASH.length);
  }

  proofOfWork(lastProof) {
    let proof = 0;
    let toggle = true;

    while (toggle) {
      if (!this.validProof(lastProof, proof)) proof += 1;
      else toggle = false;
    }

    return proof;
  }
}

module.exports = Blockchain;
